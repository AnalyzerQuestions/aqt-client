aqtApp.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/main", {
		templateUrl : 'views/main.html'

	}).when("/", {
		templateUrl : 'views/login.html',
		controller : 'loginController'

	}).when("/new", {
		templateUrl : 'views/new-question.html',
		controller: 'newQuestionController'

	}).otherwise({
		redirectTo : '/'
	});


	$locationProvider.html5Mode(true);

});
