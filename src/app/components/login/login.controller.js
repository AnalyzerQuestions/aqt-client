/**
 * @ngdoc controller
 * @name login controller
 *
 * @description
 * This is the login controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("loginController", function($scope, $location, $http, aqtValue) {

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
                localStorage.setItem("userToken", data.accessToken);
                console.log('auth sucess...', data);
            },
            error: function(data) {
                console.log('auth error...', data);
            },
            scope: ['read_inbox'],
            networkUsers: true
        });

    }
});
