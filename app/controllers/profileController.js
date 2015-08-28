App
		.controller(
				'profileController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
								
								$(function() {
									$('#ProfileController').slimScroll({
										height:($rootScope.window_height-140),
										width:$rootScope.window_width
									});
								});
								
								$scope.div_show_bg=function(friend) {
								 //alert(JSON.stringify(friend));
								document.getElementById('xyz').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide_bg=function(){
								document.getElementById('xyz').style.display = "none";
								}
								
							//alert("Profile Controller");
						      var userInfo = angular.fromJson($rootScope.$storage['userInfo']);
						      if(userInfo==undefined)
						    	  $rootScope.changeState('login');

								var ageCalculator=function(birthDate)
								{
								      var birthday=new Date(birthDate);	 
									  var ageDifMs = Date.now() - birthday.getTime();
									  var ageDate = new Date(ageDifMs); // miliseconds from epoch
									  return Math.abs(ageDate.getUTCFullYear() - 1970);
								};

						      //start variable init
							    $scope.id=userInfo.empID;
							    $rootScope.empID=angular.copy(userInfo.empID);
							    $rootScope.height=angular.copy(userInfo.height);
							    $rootScope.weight=angular.copy(userInfo.weight);
							    $rootScope.empName=angular.copy(userInfo.empName.firstName+" "+userInfo.empName.lastName);
								$scope.name=userInfo.empName.firstName+" "+userInfo.empName.lastName;
								$scope.age = ageCalculator(userInfo.dataOfBirth);
								$scope.gender = userInfo.gender;
								$scope.designation = userInfo.designation;
								$scope.office_no = userInfo.contactNumbers.office;
								$scope.mobile_no = userInfo.contactNumbers.mobile;
								$scope.home_no =userInfo.contactNumbers.home;
								$scope.location= userInfo.workLocation;
							//	$scope.address= "2nd Floor A & B Wing, Kendriya Sa dan, Akurdi, Opposite To Akurdi Railway Station, Akurdi";
								$scope.address=userInfo.Address[1].home.appartementNo+" "+
							    userInfo.Address[1].home.street+" "+
								userInfo.Address[1].home.city+" "+
								               userInfo.Address[1].home.state+" "+
								               userInfo.Address[1].home.pincode+" ";
								$scope.email=userInfo.emailID;		
						      //end variable init
						      
						      

						      
							$scope.health=function(){ 
							 // $rootScope.app.pageTitle="Health Record";	 
							$rootScope.changeState('app.healthrecord');
							};
							
							$scope.logout=function(){ 
							$rootScope.changeState('login');
							};
							
							
							var ageCalculator=function(birthDate)
							{
							      var birthday=new Date(birthDate);	 
								  var ageDifMs = Date.now() - birthday.getTime();
								  var ageDate = new Date(ageDifMs); // miliseconds from epoch
								  return Math.abs(ageDate.getUTCFullYear() - 1970);
							};
							
							
							var init = function () {
								$rootScope.app.pageTitle="My Profile";
							};
							init();
							
						} ]);