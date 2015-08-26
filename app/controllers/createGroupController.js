App
		.controller(
				'createGroupController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
						
							$scope.div_show=function(friend) {
								 //alert(JSON.stringify(friend));
								document.getElementById('abc').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide=function(){
								document.getElementById('abc').style.display = "none";
								}
							
							//Function To Display Popup
								 $scope.div_show=function(friend) {
								    $scope.selectedFriend=friend;
									document.getElementById('abc').style.display = "block";
								}
								
								//Function to Hide Popup
								$scope.div_hide=function(){
								document.getElementById('abc').style.display = "none";
								}
							
							
							
							$scope.selectAllFlag=false;
							$scope.toggleSelectAll=function()
							{
								$scope.selectAllFlag=!$scope.selectAllFlag;
								if($scope.selectAllFlag)
									{
									  for(var i=0;i<$scope.employees.length;i++)
										  $scope.employees[i].showAdd=false;								   
									}
								else
								{
									  for(var i=0;i<$scope.employees.length;i++)
										  $scope.employees[i].showAdd=true;								   
									}
								$scope.selectAllFlag=!$scope.selectAllFlag;
							}
							
							$scope.selectAllFriendsFlag=false;
							$scope.toggleSelectAllFriends=function()
							{
								//$scope.selectAllFriendsFlag=!$scope.selectAllFlag;
								if($scope.selectAllFriendsFlag)
									{
									  for(var i=0;i<$scope.friends.length;i++)
										  $scope.friends[i].showAdd=false;								   
									}
								else
								{
									  for(var i=0;i<$scope.friends.length;i++)
										  $scope.friends[i].showAdd=true;								   
									}
								$scope.selectAllFriendsFlag=!$scope.selectAllFriendsFlag;
							}							
							
							
							
							if($rootScope.empID==undefined)
								$rootScope.changeState('login');						
							 $scope.toggle_friend=function($index){ 
								 $scope.employees[$index].showAdd=!  $scope.employees[$index].showAdd;
                                   
							 } 
							 
							 $scope.toggle_friend_new=function($index){ 
								 $scope.friends[$index].showAdd=!  $scope.friends[$index].showAdd;
                                   
							 } 
							 
							 $scope.selectedActivity=-1;
								// Fetching Activities
								$http.get(basePath+'/activities').
								  success(function(data, status, headers, config) {
									  data=data.entities;
									  var formatted_activities=[];
									  for(var i=0;i<data.length;i++)
										{
										  var obj=
										  {
												  activityId:data[i].activityId,
												  activityName:data[i].activityName
										  };
										  formatted_activities.push(obj);
										}
                                   $scope.activities=angular.copy(formatted_activities);
								  }).
								  error(function(data, status, headers, config) {

								  });
								
								
								// Fetching Groups
					            $scope.groups = [];
					            $scope.selectedGroup=undefined;
					            $http.get(basePath + '/groups?employee_id='+$rootScope.empID).
					            success(function(data, status, headers, config) {
					                var groups_formatted = [];
					                for (var i = 0; i < data.entities.length; i++) {
					                    var obj = {
					                        groupName: data.entities[i].groupName,
					                        groupId:   data.entities[i].groupId
					                    };
					                    groups_formatted.push(obj);
					                }
					                $scope.groups = angular.copy(groups_formatted);
					            }).
					            error(function(data, status, headers, config) {
					                // called asynchronously if an error occurs
					                // or server returns response with an error status.
					            });			
					            
					            
					            
					            
					            //fetch friends
				             	// Simple GET request example :
				            	$http.get('http://corporatehealth-test.apigee.net/v1/employees/'+$rootScope.empID+'/friends').
				            	  then(function(response) {

				            		  response=response.data.entities[0].friends;
				            		  var friendsData=[];
				            		  var i=0,j=0;
				            		 for(i=0;i<response.length;i++)
				            			{
				            			 if(response[i]==null)
				            				 continue;
				            			 //alert(JSON.stringify(response[i]));
				            	          var employeeId= response[i].employeeId;
				            	          var employeeName= response[i].employeeName;
				            	          var activityName= response[i].activityName;
				            	          
				            	          
                                         var obj=
                                       	   {
                                       		  employeeId:employeeId,
                                       		  employeeName:employeeName,
                                       		  activityName:activityName,
                                       		  showAdd:false
                                       	   };                                   
                                         friendsData.push(obj);
				            			}
				            		 $scope.friends=angular.copy(friendsData);
                                       fetchEmployees();
				            	  }, function(response) {

				            	  }); 
				            	
					            function fetchEmployees(){
								$http.get(basePath+'/employees').
								  success(function(data, status, headers, config) {
									  data=data.entities;
									  var formatted_employees=[];
									  for(var i=0;i<data.length;i++)
										{
										  var obj=
										  {
												  employeeId:data[i].empID,
												  emailID:data[i].emailID,
												  mobile:data[i].contactNumbers.home,
												  tel:data[i].contactNumbers.mobile,
												  employeeName:data[i].empName.firstName+" "+data[i].empName.lastName,
												  
												  showAdd:false
										  };
										  formatted_employees.push(obj);
										}
                                 //$scope.employees=angular.copy(formatted_employees);
                                 var employees=formatted_employees;

                          
                                 $rootScope.empID=String($rootScope.empID);                                
                                 for(var i=0;i<employees.length;i++)
                               	  {
                               	    for(var j=0;j<$scope.friends.length;j++)
                               	    	{                                
                               	    	 if((employees[i].employeeId==$scope.friends[j].employeeId)   )
                               	    		 {
                             	    		   $scope.friends[j].emailID=employees[i].emailID;                               	    		  
                               	    		   employees.splice(i, 1);
                               	    		   --i;
                               	    		   break;
                               	    		 }
                               	    	}
                               	  }
                                 
                                 for(var k=0;k<employees.length;k++)
                               	  if(employees[k].employeeId==$rootScope.empID)
                               		{
                               		  employees.splice(k, 1);
                               		}
     
                                 $scope.employees=angular.copy(employees);
								  }).
								  error(function(data, status, headers, config) {
								  });
					            }
					            
					            
					            //function for adding group
					            $scope.addGroup=function()
					            {
					            	alert('dfdfdf');
					            	if($scope.selectedActivity==-1)
					            		return;
					            	var members=[];
					            	for(var i=0;i<$scope.employees.length;i++)
					                 {
					            		if($scope.employees[i].showAdd==true)
					            			{
					            			 members.push($scope.employees[i]);
					            			 delete  $scope.employees[i].showAdd;
					            			 if($scope.employees[i].activityName!=null)
					            			 delete  $scope.employees[i].activityName;
					            			}
					                 }
                                    
					            	
					            	for(var i=0;i<$scope.friends.length;i++)
					                 {
					            		if($scope.friends[i].showAdd==true)
					            			{
					            			 members.push($scope.friends[i]);
					            			  delete  $scope.friends[i].showAdd;
					            			 if($scope.friends[i].activityName!=null)
					            			  delete  $scope.friends[i].activityName;
					            			}					            		
					                 }					            						            
					            	members={members:members};
					            	alert($scope.selectedGroup);
			            			var groupObj={
				            				  "groupName" : $scope.selectedGroup,
				            				  "emailID" : $rootScope.emailId,
				            				  "groupActivity" :$scope.selectedActivity,
				            				  "members" :members
				            				 };
				            				 
			            			alert(JSON.stringify(groupObj));
					            	//alert(JSON.stringify(friends));
					            	var req = {
					            			 method: 'PUT',
					            			 url: basePath+'/groups?employee_id='+$rootScope.empID,
					            			 headers: {
					            				 'Access-Control-Allow-Origin': '*',
					            				 'Access-Control-Allow-Headers': 'Content-Type',
					            				 //'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',					            				
					            				 'Content-Type': 'application/json'					            					 
					            			 },
					            			 data: groupObj
					            			}
					            	// Sending Data To Server :
					            	$http(req).
					            	  then(function(response) {
                                            alert('added successfully');
					            	  }, function(response) {
	                                           alert(JSON.stringify(response));
					            	  });
					            };
					            
								  $scope.back=function()
							    	 {
							    	   $rootScope.changeState('app.friendsandgroups');
							    	 }
							
							var init = function () {
								$rootScope.app.pageTitle="Add Friends";
							};
							init();	
						} ]);