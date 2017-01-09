angular.module("components").factory("loginService", function (aqtValue) {

  var _getSuggestions = function (question, callback) {
		return $http.post(aqtValue.api + "analyzerOnly", question).then(function(response){
      callback(response.data);
    });
	};

	return {
		getSuggestions: _getSuggestions
	};

});
