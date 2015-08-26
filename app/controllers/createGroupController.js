App
		.controller(
				'createGroupController',
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
					      //alert("create groups"); 
							$scope.status1=false;
							$scope.status2=false;
							$scope.status3=false;
							$scope.status4=false;
							$scope.status5=false;
							$scope.status6=false;
							
							//Function To Display Popup
								 $scope.div_show=function() {
								document.getElementById('abc').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide=function(){
								document.getElementById('abc').style.display = "none";
								}
							
							 $scope.toggle_friend=function(index){ 
							
                                 index=parseInt(index);
							     switch(index)
								 {
									  case 1:
									    $scope.status1=!$scope.status1;
										break;
									  case 2:
									    $scope.status2=!$scope.status2;
										break;	
									  case 3:
									    $scope.status3=!$scope.status3;
										break;	
									case 4:									  
									    $scope.status4=!$scope.status4;
										break;
									  case 5:
									    $scope.status5=!$scope.status5;
										break;	
									  case 6:
									    $scope.status6=!$scope.status6;
										break;
								 }
		
									}
									
								 $scope.back=function()
							    	 {
							    	   $rootScope.changeState('app.friendsandgroups');
							    	 }
							var init = function () {
								$rootScope.app.pageTitle="Create Groups";
							};
							init();									
						} ]);