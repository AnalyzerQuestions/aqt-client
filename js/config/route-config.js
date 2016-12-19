aqtApp.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/abc", {
		templateUrl : '',
		controller : ''

	}).when("/", {
		templateUrl : 'views/step.html'

	}).otherwise({
		redirectTo : '/'
	});

});
