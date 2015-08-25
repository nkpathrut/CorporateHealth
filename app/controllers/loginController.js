App
		.controller(
				'loginController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
						
						//Function To Display Popup
								 $scope.div_show=function() {
								document.getElementById('abc').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide=function(){
								document.getElementById('abc').style.display = "none";
								}
						
						
							$scope.account=
								{
									email:"",
									password:""
								}
							
							//alert("loginController Controller");
							
							$scope.login=function(){ 
								
							//alert("Testing for login");
								// Simple GET request example :
								if(!($scope.account.email!="" && $scope.account.password!=""))
									{$scope.authMsg="username/password cannot be blank";return;}
							//	alert('http://corporatehealth-test.apigee.net/v1/authentication?email_id='+$scope.account.email+'&password='+$scope.account.password);

								
								
							     $http.get('http://corporatehealth-test.apigee.net/v1/authentication?email_id='+$scope.account.email+'&password='+$scope.account.password).//loads providers
						         success(function(data, status, headers, config) {
						       	 // alert(JSON.stringify(data));
						        	// alert(JSON.stringify(data.body.entities));
									  $rootScope.$storage['userInfo'] = angular.toJson(data.entities[0]);
									  //alert(JSON.stringify(angular.fromJson( $rootScope.$storage['userInfo'])));
								
									  $rootScope.changeState('app.profile');
						          }).
						         error(function(data, status, headers, config) {
						        	 alert(JSON.stringify(data));
						        	 $scope.authMsg=data;
						         });
								
								
								
								
							};
							
							
							
						} ]);