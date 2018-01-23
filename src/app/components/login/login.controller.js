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

    /**
     *
     */
    SE.init({
        clientId: aqtValue.so.clientId,
        key: aqtValue.so.key,
        channelUrl: aqtValue.so.channelUrl,
        complete: function(data) {
            console.log("Regstrou na API... ", data);
        }
    });

    /**
     *
     */
    vm.login = function() {
        SE.authenticate({
            success: function(data) {
                console.log("Autenticou... ", data);
                var soPt;
                data.networkUsers.forEach(function(network) {
                    if (network.site_url == 'https://pt.stackoverflow.com') {
                        soPt = network;
                    }
                })
                if (soPt) {
                    localStorage.setItem("userToken", data.accessToken);
                    $location.path('/main');
                } else {
                    Materialize.toast("Sua Conta não esta associada ao stack overflow", 5000);
                }

                if (localStorage.getItem("userToken")) {
                    $location.path('/main');
                }
            },
            error: function(data) {
                Materialize.toast("Ocorreu algum problema do stack overflow, tente mais tarde", 5000);
            },
            scope: aqtValue.so.scopeList,
            networkUsers: true
        });

        if (localStorage.getItem("userToken")) {
            $location.path('/main');
        }
    }

});
