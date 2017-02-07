angular.module("components").factory("tokenInterceptor", function($q, $location) {

    return {

        'response': function(config) {

            return config;
        }
    };

});
