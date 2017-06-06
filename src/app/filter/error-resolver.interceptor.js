angular.module("components").factory("errorResolverInterceptor", function($q, $location) {

    var errorResolverInterceptor = {
        responseError: function(response) {
            if (response.status >= 500) {
                Materialize.toast("Ocorreu algum erro no servidor... tente novamente mais tarde!", 5000);
            }

            if (response.status >= 400 && response.status < 500) {
                Materialize.toast("Recurso não encontrado", 5000);
            }
            return $q.reject(response);
        }
    };
    return errorResolverInterceptor;
});
