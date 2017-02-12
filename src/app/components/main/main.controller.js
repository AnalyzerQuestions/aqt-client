/**
 * @ngdoc controller
 * @name Main controller
 *
 * @description
 * This is the main controller.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").controller("mainController", function($scope, $http) {

    var vm = this;
    var userToken = localStorage.getItem("userToken");
    vm.questions = {};

    $http({
        method: 'GET',
        url: aqtValue.so.api + "/me/questions",
        params: {
            key: aqtValue.so.key,
            access_token: userToken,
            site: aqtValue.so.site,
            filter: 'vqc7J'
        }
    }).success(function(data) {
        vm.questions = data.items;

    }).error(function(data) {
        console.log('error questions...', data);
    });


});
