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

    initSO();

    vm.login = function() {

        $(function() {
            SE.authenticate({
                success: function(data) {
                    console.log('Success :', data);
                },
                error: function(data) {
                    console.log('Error: ', data);
                },
                networkUsers: true,
                scope: aqtValue.so.scopeList
            });

        });
        $location.path('/main');
    }

    function initSO() {
        $(function() {
            SE.init({
                clientId: aqtValue.so.clientId,
                key: aqtValue.so.key,
                channelUrl: aqtValue.so.channelUrl,
                complete: function(data) {
                    console.log('Init: ', data);
                }
            });
        });
    };

});
