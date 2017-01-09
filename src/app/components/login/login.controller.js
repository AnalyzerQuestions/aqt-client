angular.module("components").controller("loginController", function($scope, $location){

	$scope.login = function(){
		$location.path('/main');
	}

});
