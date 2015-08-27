App
		.controller('gymDetailsController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
							if($rootScope.empID==undefined)
								{
								 $rootScope.changeState('login');
								}
							function toggleChevron(e) {
							    $(e.target)
							        .prev('.panel-heading')
							        .find("i.indicator")
							        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
							}
							$('#accordion').on('hidden.bs.collapse', toggleChevron);
							$('#accordion').on('shown.bs.collapse', toggleChevron);			
							$scope.gymDetails=
								[
								 {
									 date:"22/07/2015",
									 time:"35 min",
									 caloriesBurnt:"350 lbs"
								 },
								 {
									 date:"22/07/2015",
									 time:"35 min",
									 caloriesBurnt:"350 lbs"
								 },
								 {
									 date:"22/07/2015",
									 time:"35 min",
									 caloriesBurnt:"350 lbs"
								 }								 
								 ];
							
							$scope.innerDetails=
								[
								  {
									  name:"GYM",
									  time:"35 min",
									  caloriesBurnt:"350 lbs"
								  },
								  {
									  name:"Bench Press",
									  time:"35 min",
									  caloriesBurnt:"350 lbs"
								  },
								  {
									  name:"Leg Buttock",
									  time:"35 min",
									  caloriesBurnt:"350 lbs"
								  }								  
								];
			
							
							$scope.selectedActivity="01"
							$scope.activityDetails=[];
							$scope.subActivityDetails=[];
							
				            $http.get(basePath + '/workouts?employee_id=017822').
				            success(function(data, status, headers, config) {
                                /* for(var i=0;i<data.length;i++)
                                	  {
                                	 alert(i);
                                	    var activityDate=data[i].data;
                                	    var activitiesData=data[i].data.activities;
                                	
                                	    var totalTimeTaken=activitiesData[i].startTime-activitiesData[i].endTime;
                                	    var  subActivities=[];
                                	    var weight=activitiesData[i].weight;
                                	    console.log('Activity:-'+JSON.stringify(activitiesData[i]));
                                	    if(activitiesData[i].subActivity.length==0)//activitiesData[i].subActivityAvailable=="true"
                                	     {
                                	    	subActivities=activitiesData[i].subActivity.subActivities;
                                	    	 console.log('subActivity:-'+JSON.stringify(subActivities));
                                	    	 for(var j=0;j<subActivities.length;j++)
                                	    		 {
                                	    		   var timeTaken=subActivities[j].startTime-subActivities[j].endTime;
                                	    		   var obj=
                                	    		   {
                                	    		 		  time:Date.parse(timeTaken),
                                	    		 		  name:subActivities[i].subActivityName,
                                	    		 		  caloriesBurnt:"10"
                                	    		   };
                                	    		  }
                                	    		 
                                	     }                                	      	                                    	  
                                	   }*/
                                 
                                 
                                 var activities_formatted=[];
                                 for(var i=0;i<data.length;i++)
                                	 {
                                	   var activityDate=data[i].data.date;
                                	   var activities=data[i].data.activities;
                                	 //  alert("i="+i);
                                	  for(var j=0;j<activities.length;j++)
                                		  {
                                   	   //alert("j="+j);
                                          var activityId=activities[j].activityId;
                                          var startTime=activities[j].startTime;
                                          var endTime=activities[j].endTime;
                                          var totalTime=endTime-startTime;
                                          var weight=activities[j].weight;
                                          var hasSubActivity=activities[j].subActivityAvailable;
                                          var subActivities=[];
                                          var subActivities_formatted=[];
                                		  if(activities[j].subActivity.subActivities!=undefined)
                                			  {
                                			// alert('subs present');
                                			  subActivities=activities[j].subActivity.subActivities;
                                		   for(var k=0;k<subActivities.length;k++)
                                			   {
                                	    	  // alert(subActivities.length);
                                			    // console.log(JSON.stringify(subActivities[k]));
                                			     var subActivityName=subActivities[k].subActivityName;
                                                 var startTime=subActivities[k].startTime;
                                                 var endTime=subActivities[k].endTime;
                                                 var timeSpent=endTime-startTime;
                                                 
                                                 var obj=
                                                	 {
                                                		 subActivityName:subActivityName,
                                                		 time:timeSpent*0.0001/6,
                                                		 caloriesBurnt:"40 lbs"
                                                		 
                                                	 };
                                                 subActivities_formatted.push(obj);
                                			   }
                                		   subActivities= subActivities_formatted;
                                		  }
                                		  var obj=
                                		  {
                                				  time:totalTime*0.0001/6,
                                				  subActivities:subActivities,
                                				  caloriesBurnt: 40*subActivities.length,
                                				  date:new Date(activityDate)
                                		  };
                                		  
                                		  activities_formatted.push(obj);
                                		  
                                		  }
                                	 }
                                 $scope.activityDetails=angular.copy(activities_formatted);
                                 //alert(JSON.stringify(activities_formatted));
                                 
                                 
                                 
                                 
                                 
				            }).
				            error(function(data, status, headers, config) {
				                // called asynchronously if an error occurs
				                // or server returns response with an error status.
				            });
							
							
							
							  $scope.toggleColor=function(index)
							  {
								  
					
								/*  $(".gymDetailsAccordion"+index).on('collapse in', function(){
									  $(".gymDetailsAccordion"+index).toggleClass("bg-white bg-gray"); 
									  alert('opened');
								    });
									    
								  $(".gymDetailsAccordion"+index).on('collapse', function(){
									  $(".gymDetailsAccordion"+index).toggleClass("bg-white bg-gray"); 
									  alert('closed');
								    });*/
								//  $("#gymDetailsHeader"+index).collapse('hide');
								 $("#gymDetailsHeader"+index).toggleClass("bg-white bg-gray");  
								 $("#gymDetailsHeader"+index).toggleClass("text-bold");  
								 $("#toggleIcon"+index).toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
							  };
							
								var init = function () {
									$rootScope.app.pageTitle="Activity Details";
								};
								init();
							  
							  
						} ]);