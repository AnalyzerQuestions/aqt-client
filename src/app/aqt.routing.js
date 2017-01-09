angular.module("aqtApp").config(function($routeProvider) {

	$routeProvider.when("/main", {
		templateUrl : './main.html'

	}).when("/blank", {
			templateUrl : './blank.htm'

	}).when("/", {
		templateUrl : './login.html',
		controller : 'loginController as loginCtrl'

	}).when("/new", {
		templateUrl : './new-question.html',
		controller: 'newQuestionController as nqCtrl'

	}).otherwise({
		redirectTo : '/'
	});

});
