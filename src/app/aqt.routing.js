angular.module("aqtApp").config(function($routeProvider) {

	$routeProvider.when("/main", {
		templateUrl : './main.html'

	}).when("/", {
		templateUrl : './login.html',
		controller : 'loginController'

	}).when("/new", {
		templateUrl : './new-question.html',
		controller: 'newQuestionController as nqCtrl'

	}).otherwise({
		redirectTo : '/'
	});
	
});
