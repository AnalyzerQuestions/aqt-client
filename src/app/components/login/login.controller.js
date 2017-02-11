/**
 * @ngdoc controller
 * @name login controller
 *
 * @description
 * This is the login controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("loginController", function($location, aqtValue) {

    var vm = this;

    SE.init({
        clientId: aqtValue.so.clientId,
        key: aqtValue.so.key,
        channelUrl: aqtValue.so.channelUrl,
        complete: function(data) {
            console.log('Init SO...');
        }
    });

    vm.login = function() {
        SE.authenticate({
            success: function(data) {
                var soPt;
                networkUsers.forEach(function(network) {
                    if (network.site_url == "http://pt.stackoverflow.com") {
                        soPt = network;
                    }
                })
                if (soPt) {
                    localStorage.setItem("userSO", {
                        accessToken: data.accessToken,
                        soPt: soPt
                    })
                } else {
                    console.log('Sua conta não está associada ao SO');
                }
                console.log('auth sucess...', data);
            },
            error: function(data) {
                console.log('auth error...', data);
            },
            scope: aqtValue.so.scopeList,
            networkUsers: true
        });
    }

});
