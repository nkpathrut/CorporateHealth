App
		.controller(
				'homeController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
					        /* $(function() {
					             $( "#accordion-1" ).accordion();
					          });*/
							
							//alert("healthController Controller");
							
							$scope.home=function(){ 
									//$rootScope.changeState('app.activities');
									}
									
							var init = function () {
								$rootScope.app.pageTitle="Home";
							};
							init();									
						} ]);