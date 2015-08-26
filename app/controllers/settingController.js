App
		.controller(
				'settingController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
						
						$scope.div_show_bg=function(friend) {
								 //alert(JSON.stringify(friend));
								document.getElementById('xyz').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide_bg=function(){
								document.getElementById('xyz').style.display = "none";
								}
					    
									

							var init = function () {
								$rootScope.app.pageTitle="Account Settings";
							};
							init();									
						} ]);