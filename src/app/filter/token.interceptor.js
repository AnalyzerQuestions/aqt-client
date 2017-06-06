/**
 * @ngdoc Service
 * @name login tokenInterceptor
 *
 * @description
 * Interceptor to get access token of SO
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components")
    .factory("tokenInterceptor", function ($q, $location) {

        return {

            'response': function (config) {

                return config;
            }
        };

    });
