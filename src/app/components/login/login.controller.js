angular.module("aqtApp").controller("loginController", function($scope, $location){

	$scope.login = function(){
		$location.path('/main');
	}

});
