App.controller('activityDetailsController', [
		'$scope',
		'$state',
		'$http',
		'$rootScope',
		function($scope, $state, $http, $rootScope) {

			alert("Physical Controller");

        $scope.details=[1,2,3];
        $scope.hideDetails=true;
        $scope.toggleDetails=function()
        {
        	alert('changing');
        	$scope.hideDetails=!$scope.hideDetails;
        };
        
		} ]);