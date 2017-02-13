/**
 * @ngdoc service
 * @name question Service
 *
 * @description
 * This is the question service.
 *
 * @author <a href="https://github.com/FranckAJ">Franck Aragão</a>
 **/
angular.module("components").factory("questionService", function($http, aqtValue) {

    var _getSuggestions = function(question, callback) {
        return $http.post(aqtValue.api + "analyzerOnly", question).then(function(response) {
            callback(response.data);
        });

    };

    var _postQuestion = function(question, callback) {

        return $http({
            method: 'POST',
            url: aqtValue.so.api + 'questions/add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                key: aqtValue.so.key,
                access_token: localStorage.getItem("userToken"),
                site: aqtValue.so.site,
                title: question.title,
                body: question.description,
                tags: question.tags
            }
        }).then(function(response) {
            callback(response);
        });
    };

    return {
        getSuggestions: _getSuggestions,
        postQuestion: _postQuestion
    }
});
