angular.module("common").component('sideNav', {

    templateUrl: './side-nav.component.html',

    controller: function($location, $http, aqtValue) {

        $(".button-collapse").sideNav({
            draggable: true
        });

        var userToken = localStorage.getItem("userToken");

        var vm = this;
        vm.user = {};

        if (userToken) {

            $http({
                method: 'GET',
                url: aqtValue.so.api + "/me",
                params: {
                    key: aqtValue.so.key,
                    access_token: userToken,
                    site: aqtValue.so.site,
                    filter: 'vqc7J'
                }
            }).success(function(data) {
                vm.user = data.items[0];

            }).error(function(data) {
                $location.path('/500');
            });

        } else {
            $location.path('/');
        }

        vm.signout = function() {
            localStorage.clear();
            $location.path('#/login');
        }
    }
});
