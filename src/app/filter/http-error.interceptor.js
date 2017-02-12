angular.module("components").factory("errorResolverInterceptor", function($q) {
    var errorResolverInterceptor = {
        responseError: function(response) {
            if (response.status >= 500) {
                Materialize.toast("Ocorreu algum erro no servidor, tente mais tarde!", 3000);
            }
            return $q.reject(response);
        }
    };
    return errorResolverInterceptor;
});
