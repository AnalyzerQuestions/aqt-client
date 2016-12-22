aqtApp.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/main", {
		templateUrl : 'views/main.html'

	}).when("/", {
		templateUrl : 'views/login.html',
		controller : 'loginController'

	}).otherwise({
		redirectTo : '/'
	});


	$locationProvider.html5Mode(true);

});
