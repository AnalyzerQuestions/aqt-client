aqtApp.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/abc", {
		templateUrl : '',
		controller : ''

	}).when("/", {
		templateUrl : 'views/main.html'

	}).otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(true);

});
