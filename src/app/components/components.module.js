/**
 * @ngdoc module
 * @name components
 *
 * @description
 * This is the common module.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/

angular.module('components', ['simplemde']);

angular.module("components").config(function($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
});
