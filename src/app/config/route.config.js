aqtApp.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/main", {
		templateUrl : 'app/components/main/main.html'

	}).when("/", {
		templateUrl : 'app/components/login/login.html',
		controller : 'loginController'

	}).when("/new", {
		templateUrl : 'app/components/question/new-question.html',
		controller: 'newQuestionController'

	}).otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(true);

});
