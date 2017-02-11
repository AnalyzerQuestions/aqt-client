angular.module("common").component('sideNav', {

    templateUrl: './side-nav.component.html',

    controller: function($location, $http, aqtValue) {

        $(".button-collapse").sideNav();

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
                    site: aqtValue.so.site
                },
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).success(function(data) {
                vm.user = data.items[0];

            }).error(function(data) {
                console.log('error user...', data);
            });

        } else {
            $location.path('/');
        }
    }
});
