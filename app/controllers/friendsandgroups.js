App
    .controller('friendsAndGroupsController', [
        '$scope',
        '$state',
        '$http',
        '$rootScope',
        function($scope, $state, $http, $rootScope) {
        	if($rootScope.empID==undefined)
        	 {
        		$rootScope.changeState('login');
        	 }
            $scope.activityList = ["Gym", "Walking", "Cycling", "Badminton", "Table Tennis", "Swimming"];
            $scope.activeActivityIndex = 0;
            $scope.activeActivityName = $scope.activityList[$scope.activeActivityIndex];


            $scope.toggleSelection = function(selectedIndex) 
            {
                $("#activityItem" + $scope.activeActivityIndex).removeClass("active");
                $scope.activeActivityIndex = selectedIndex;
                $("#activityItem" + $scope.activeActivityIndex).addClass("active");
                $scope.activeActivityName = $scope.activityList[$scope.activeActivityIndex];
                $("#friendsGroupsActivities").removeClass("in");
                $scope.toggleArrow();
            };

            $scope.toggleArrow = function() {
                $("#friendsGroupsToggleArrow").toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
            };
            $scope.groups = [];
            $http.get(basePath + '/groups?employee_id='+$rootScope.empID).
            success(function(data, status, headers, config) {
                var groups_formatted = [];
                for (var i = 0; i < data.entities.length; i++) {
                    var obj = {
                        name: data.entities[i].groupName
                    };
                    groups_formatted.push(obj);
                }
                $scope.groups = angular.copy(groups_formatted);
                // alert(JSON.stringify( $scope.bloodReport));
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

$scope.clickedAccordion="";
$scope.onAccordionClick=function(accordionID)
 {
	$scope.clickedAccordion=accordionID;
 };

            function toggleChevron(e) {
            //	alert($scope.clickedAccordion);
            	$('#'+$scope.clickedAccordion).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
               /* $(e.target)
                    .prev('.mypanel-heading')
                    .find("i.indicator")
                    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');*/
            	
            }
            $('#accordion1').on('hidden.bs.collapse', toggleChevron);
            $('#accordion1').on('shown.bs.collapse', toggleChevron);

            $('#accordion2').on('hidden.bs.collapse', toggleChevron);
            $('#accordion2').on('shown.bs.collapse', toggleChevron);

            
            	// Simple GET request example :
            	$http.get('http://corporatehealth-test.apigee.net/v1/groups?employee_id='+$rootScope.empID).
            	  then(function(response) {
            		 // alert(JSON.stringify(response.data.entities));
            		  $scope.groups=angular.copy(response.data.entities);
            	    // this callback will be called asynchronously
            	    // when the response is available
            	  }, function(response) {
            	    // called asynchronously if an error occurs
            	    // or server returns response with an error status.
            	  });
            	$scope.friends=[];
            	$http.get('http://corporatehealth-test.apigee.net/v1/employees/'+$rootScope.empID+'/friends').
            	  then(function(response) {
            		  response=response.data.entities[0].friends;
            		  var friendsData=[];
            		  var i=0,j=0;
            		 for(i=0;i<response.length;i++)
            			{
						  if(response[i]==null)
						  continue;
            	          var employeeId= response[i].employeeId;
            	          var employeeName= response[i].employeeName;
            	          var activityName= response[i].activityName;
            	          
            	         for(j=0;j<friendsData.length;j++)
            	        	 {
            	        	   if(friendsData[j].activityName==activityName)
            	        		    {
            	        		      friendsData[j].friendsList.push(employeeName);
            	        		      break;
            	        		    }
            	        	 }
            	         if(j==friendsData.length)
            	        	 {
            	        	  var obj=
            	        	  {
            	        			  activityName:activityName,
            	        			  friendsList:[employeeName]
            	        	  };
            	        	  
            	        	  friendsData.push(obj);
            	        	 }
            			}
            		 $scope.friends=angular.copy(friendsData);

            	  }, function(response) {

            	  });   
				  
				  	$scope.addFriends=function(){ 
									$rootScope.changeState('app.addfriends');
									}
					$scope.createGroup=function(){ 
					$rootScope.changeState('app.creategroup');
					}
				  
				  var init = function () {
								$rootScope.app.pageTitle="Friends and Groups";
							};
							init();
				  

        }
    ]);