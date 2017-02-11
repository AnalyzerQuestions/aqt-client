angular.module("common").component('sideNav', {

    templateUrl: './side-nav.component.html',

    controller: function($location, $http, aqtValue) {

        $(".button-collapse").sideNav();

        var userToken = localStorage.getItem("userToken");

        if (userToken) {

            $http({
                method: 'jsonp',
                url: aqtValue.so.api + "users/me",
                params: {
                    key: aqtValue.so.key,
                    access_token: userToken,
                    site: aqtValue.so.site
                }
            }).success(function(data) {
                console.log('success user...', data);
            }).error(function(data) {
                console.log('error user...', data);
            });

        } else {
            $location.path('/');
        }
    }
});
