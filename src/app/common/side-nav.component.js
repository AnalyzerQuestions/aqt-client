angular.module("common").component('sideNav', {

    templateUrl: './side-nav.component.html',

    controller: function($location, $http, aqtValue) {

        $(".button-collapse").sideNav();

        var storage = localStorage.getItem("userSO");

        if (storage) {
            console.log(storage);

            $http({
                method: 'jsonp',
                url: aqtValue.so.api + "users/me",
                params: {
                    key: aqtValue.so.key,
                    access_token: storage.accessToken,
                    site: aqtValue.so.site,
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
