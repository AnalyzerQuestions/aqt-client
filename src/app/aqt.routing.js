angular.module("aqtApp").config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/main", {
		templateUrl : './main.html'

	}).when("/", {
		templateUrl : './login.html',
		controller : 'loginController'

	}).when("/new", {
		templateUrl : './new-question.html',
		controller: 'newQuestionController'

	}).otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(true);

});
