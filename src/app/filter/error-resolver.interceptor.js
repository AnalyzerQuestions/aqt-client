angular.module("components").factory("errorResolverInterceptor", function($q, $location) {
    var errorResolverInterceptor = {
        responseError: function(response) {
            if (response.status >= 500) {
                $location.path('/500');
            }

            if (response.status >= 400 && response.status < 500) {
                $location.path('/404');
            }
            return $q.reject(response);
        }
    };
    return errorResolverInterceptor;
});
