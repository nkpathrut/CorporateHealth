App
		.controller(
				'homeController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {

                            if($rootScope.empID==undefined)
                            	$rootScope.changeState('login');
                           // alert(basePath+'/employees/'+$rootScope.empID+'/myschedule');
                            $scope.todaySchedule=[];
                            $scope.upcomingSchedule=[];
				            $http.get(basePath+'/employees/'+$rootScope.empID+'/myschedule').
				            success(function(data, status, headers, config) {
                                 data=data.entities[0].mySchedule;
                                 var future_activities=[];
                                 for(var i=0;i<data.length;i++)
                                	{
                                	 future_activities.push(data[i]);
                                	 data[i].date=new Date();
                                	  //data[i].date=data[i].date.setDate( data[i].date.getDate() + 1);
                                	 future_activities.date=new Date();
                                	 future_activities.date= future_activities[i].date.setDate( future_activities[i].date.getDate() + 1);
                                	}
                                 $scope.todaySchedule=angular.copy(data);
                                 $scope.upcomingSchedule=angular.copy(future_activities);
                                 alert(JSON.stringify(data));
                                 
                                 
				            }).
				            error(function(data, status, headers, config) {
				            	alert(JSON.stringify(data));
				                // called asynchronously if an error occurs
				                // or server returns response with an error status.
				            });
							
							
							
							
							
							
							
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