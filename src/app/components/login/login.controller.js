angular.module("components").controller("loginController", function($location, aqtValue) {

    var vm = this;

    initSO();

    vm.login = function() {

        $(function() {
            SE.authenticate({
                success: function(data) {
                    console.log('Success :', data);
                    $location.path('/main');
                },
                error: function(data) {
                    console.log('Error: ', data);
                },
                networkUsers: true
            });
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
