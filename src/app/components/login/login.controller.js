/**
 * @ngdoc controller
 * @name login controller
 *
 * @description
 * This is the login controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("loginController", function($location, $http, aqtValue) {

    var vm = this;

    //initSO();

    vm.login = function() {

        $http.jsonp(aqtValue.so.test).then(function(response) {
            console.log(response);
        });

        // SE.authenticate({
        //     success: function(data) {
        //         console.log('Success :', data);
        //         $location.path('/main');
        //     },
        //     error: function(data) {
        //         console.log('Error: ', data);
        //     },
        //     networkUsers: true
        // });
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
