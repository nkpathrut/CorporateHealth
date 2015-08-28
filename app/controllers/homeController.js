App
		.controller(
				'homeController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
						
						$(function() {
									$('#homeController').slimScroll({
										height:($rootScope.window_height-51),
										width:$rootScope.window_width
									});
								});
								
					        /* $(function() {
					             $( "#accordion-1" ).accordion();
					          });*/
							
							//alert("healthController Controller");
							
							$scope.div_show_bg=function(friend) {
								document.getElementById('xyz').style.display = "block";
								}
								
								//Function to Hide bg
								$scope.div_hide_bg=function(){
								document.getElementById('xyz').style.display = "none";
								}
							
							$scope.home=function(){ 
									//$rootScope.changeState('app.activities');
									}
									
							var init = function () {
								$rootScope.app.pageTitle="Home";
							};
							init();									
						} ]);