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
                var soPt = registrationSOPt(data.networkUsers);
                if (soPt) {
                    localStorage.setItem("userSO", {
                        accessToken: data.accessToken,
                        soPt: soPt
                    })
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

    function registrationSOPt(networkUsers) {
        networkUsers.forEach(function(network) {
            if (network.site_url === 'http://pt.stackoverflow.com') {
                return network;
            }
        });
        console.log('Sua conta não está associada ao SO  pt-BR');
    }

});
