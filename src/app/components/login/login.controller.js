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
        $("#somediv").load('https://stackexchange.com/oauth/dialog?client_id=7061&scope=no_expiry&redirect_uri=https://appif.herokuapp.com/#/main')
            .dialog({
                modal: true
            });

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
