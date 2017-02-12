/**
 * @ngdoc service
 * @name questiions SO Service
 *
 * @description
 * This is the questions from SO service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").factory("questionsSoService", function($http, aqtValue) {

    var _getQuestions = function(callback) {
        var userToken = localStorage.getItem("userToken");
        return $http({
            method: 'GET',
            url: aqtValue.so.api + "/me/questions",
            params: {
                key: aqtValue.so.key,
                access_token: userToken,
                site: aqtValue.so.site,
                filter: 'vqc7J'
            }
        }).then(function(data) {
            callback(data);
        });
    };

    return {
        getQuestions: _getQuestions
    }
});
