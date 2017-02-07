window.SE =
    (function(navigator,
        document,
        window,
        encodeURIComponent,
        Math,
        undefined) {
        "use strict";

        var seUrl, clientId, loginUrl, proxyUrl, fetchUserUrl, requestKey, buildNumber = '@@~~BuildNumber~~@@';

        function rand() {
            return Math.floor(Math.random() * 1000000);
        }

        function oldIE() {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                var x = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);
                if (x) {
                    return x[1] <= 8.0;
                }
            }

            return false;
        }

        // Options are:
        //   - clientId: for app registration
        //   - channelUrl: a blank page for cross-domain communication in the absense of postMessage
        //   - complete: a function() that is called after initialization is complete
        //   - key: request key
        function init(options) {
            var cid = options.clientId,
                proxy = options.channelUrl,
                complete = options.complete,
                proto = window.location.protocol.substring(0, window.location.protocol.length - 1),
                domain = (window.location.protocol + '//' + window.location.host).toLowerCase();

            requestKey = options.key;

            if (!cid) {
                throw "`clientId` must be passed in options to init";
            }
            if (!proxy) {
                throw "`channelUrl` must be passed in options to init";
            }
            if (!complete) {
                throw "a `complete` function must be passed in options to init";
            }
            if (!requestKey) {
                throw "`key` must be passed in options to init";
            }

            if (options.dev) {
                seUrl = 'https://dev.stackexchange.com';
                fetchUserUrl = 'https://dev.api.stackexchange.com/2.0/me/associated';
            } else {
                seUrl = 'https://stackexchange.com';
                fetchUserUrl = 'https://api.stackexchange.com/2.0/me/associated';
            }

            clientId = cid;

            proxyUrl = proxy;

            if (proxyUrl.toLowerCase().indexOf(domain) !== 0) {
                throw "`channelUrl` must be under the current domain (" + domain + "), found (" + proxyUrl + ")";
            }

            loginUrl = seUrl + '/oauth/dialog?redirect_uri=' + encodeURIComponent((seUrl + '/oauth/login_success?assisted=' + cid + '&protocol=' + proto + '&proxy=' + encodeURIComponent(proxyUrl)));

            setTimeout(function() {
                complete({
                    version: buildNumber
                });
            }, 1);
        }

        function fetchUsers(token, expires, success, error) {
            var script,
                callbackName = 'sec' + rand(),
                src = fetchUserUrl,
                callbackFunction =
                function(data) {
                    try {
                        delete window[callbackName];
                    } catch (e) {
                        window[callbackName] = undefined;
                    }

                    script.parentNode.removeChild(script);

                    if (data.error_id) {
                        error({
                            errorName: data.error_name,
                            errorMessage: data.error_message
                        });
                        return;
                    }

                    success({
                        accessToken: token,
                        expirationDate: expires,
                        networkUsers: data.items
                    });
                };

            while (window[callbackName] || document.getElementById(callbackName)) {
                callbackName = 'sec' + rand();
            }

            window[callbackName] = callbackFunction;

            src += '?access_token=' + encodeURIComponent(token);
            src += '&pagesize=100';
            src += '&key=' + encodeURIComponent(requestKey);
            src += '&callback=' + encodeURIComponent(callbackName);
            src += '&filter=!6RfQBFKB58ckl';

            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.id = callbackName;

            document.getElementsByTagName('head')[0].appendChild(script);
        }

        // Options contains
        //   success: function(data)
        //     - data will have
        //       * accessToken
        //       * expirationDate
        //       * networkUsers
        //   error: function(data)
        //     - data will have
        //       * errorName
        //       * errorMessage
        //   scope: an array of scopes to request
        //   networkUsers: bool, if true returns associated users in success
        function authenticate(options) {
            if (!options) {
                throw "must pass an options object to authenticate";
            }

            var poll,
                opened,
                handler,
                pollHandle,
                success = options.success,
                scopeOpt = options.scope,
                scope = '',
                state = rand(),
                url = loginUrl + '&client_id=' + clientId + '&state=' + state,
                error = options.error || function() {},
                mapSuccess =
                function(token, expiresRaw) {
                    var expires;
                    if (expiresRaw) {
                        expires = new Date(new Date().getTime() + expiresRaw * 1000);
                    }

                    if (options.networkUsers) {
                        fetchUsers(token, expires, success, error);
                    } else {
                        success({
                            accessToken: token,
                            expirationDate: expires
                        });
                    }
                };

            if (!success) {
                throw "must pass a `success` function in options to authenticate";
            }
            if (scopeOpt && Object.prototype.toString.call(scopeOpt) !== '[object Array]') {
                throw "`scope` must be an Array in options to authenticate";
            }

            if (scopeOpt) {
                scope = scopeOpt.join(' ');
            }

            if (scope.length > 0) {
                url += '&scope=' + encodeURIComponent(scope);
            }

            handler =
                function(e) {
                    if (e.origin !== seUrl || e.source !== opened) {
                        return;
                    }

                    var i,
                        pieces,
                        parts = e.data.substring(1).split('&'),
                        map = {};

                    for (i = 0; i < parts.length; i++) {
                        pieces = parts[i].split('=');
                        map[pieces[0]] = pieces[1];
                    }

                    if (+map.state !== state) {
                        return;
                    }

                    if (window.detachEvent) {
                        window.detachEvent("onmessage", handler);
                    } else {
                        window.removeEventListener("message", handler, false);
                    }

                    console.log('----------------------------> ', map);
                    opened.close();

                    if (map.access_token) {
                        mapSuccess(map.access_token, map.expires);
                        return;
                    }

                    error({
                        errorName: map.error,
                        errorMessage: map.error_description
                    });
                };

            if (window.postMessage && !oldIE()) {
                if (window.attachEvent) {
                    window.attachEvent("onmessage", handler);
                } else {
                    window.addEventListener("message", handler, false);
                }
            } else {
                poll =
                    function() {
                        if (!opened) {
                            return;
                        }

                        if (opened.closed) {
                            clearInterval(pollHandle);
                            return;
                        }

                        var msgFrame = opened.frames['se-api-frame'];
                        if (msgFrame) {
                            clearInterval(pollHandle);

                            handler({
                                origin: seUrl,
                                source: opened,
                                data: msgFrame.location.hash
                            });
                        }
                    };

                pollHandle = setInterval(poll, 50);
            }

            opened = window.open(url, "_blank", "width=660, height=480");
        }

        return {
            authenticate: authenticate,
            init: init
        };
    }(navigator, document, window, window.encodeURIComponent, Math));
