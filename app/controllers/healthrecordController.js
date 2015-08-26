App
		.controller(
				'healthrecordController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {

							$scope.div_show_bg=function(friend) {
								document.getElementById('xyz').style.display = "block";
								}
								
								//Function to Hide bg
								$scope.div_hide_bg=function(){
								document.getElementById('xyz').style.display = "none";
								}
							
							$scope.employeeData=
								{
									height:"5.8",
									weight:"70"
								}
						   var resetLimitValues=function()
						   {
							$scope.bloodDisplayLimit=6;
							$scope.sugarDisplayLimit=6;
							$scope.urineDisplayLimit=6;
							$scope.preassureDisplayLimit=6; 
							$('#viewMoreBloodbutton,#viewMoreSugarbutton,#viewMoreUrinebutton,#viewMorePreassurebutton').show();
							};
							resetLimitValues();
                            $scope.viewMore=function(reportID)
                            {
                            	 if(reportID=='viewMoreBloodbutton')
                            		 $scope.bloodDisplayLimit=1000;
                            	 if(reportID=='viewMoreSugarbutton')
                            		 $scope.sugarDisplayLimit=1000;      
                            	 if(reportID=='viewMoreUrinebutton')
                            		 $scope.urineDisplayLimit=1000;
                            	 if(reportID=='viewMorePreassurebutton')
                            		 $scope.preassureDisplayLimit=1000;                                    	 
                            	$('#'+reportID).hide();
                            };
							//For blood report
							$http.get('http://hospital-test.apigee.net/care-coordination/DiagnosticReport?report_type=blood').
							  success(function(data, status, headers, config) {
                                    var recived=data.contained;
                                    var formatted=[];

                                    for(var i=0;i<recived.length;i++)
                                    	{
                                    	var high="NA";
                                    	var low="NA";
                                    	if(typeof recived[i].referenceRange!="undefined")
                                    		{
                                    		if(typeof recived[i].referenceRange[0].low!="undefined")
                                    		  low=recived[i].referenceRange[0].low.value;
                                        
                                        	if(typeof recived[i].referenceRange[0].high!="undefined")
                                        		high=recived[i].referenceRange[0].high.value;
                                    		}

                                    	  var obj=
                                    		  {
                                    			  type:recived[i].name.text,
                                    			  count:recived[i].valueQuantity.value,
                                    			  unit:recived[i].valueQuantity.units,
                                    			  progressStatus:"success",
                                    			  progress:100,
                                    			  reference:
                                                            {
                                    				          low:low,
                                    				          high:high
                                                            }
                                    		  };
                                    	  //start logic for color
                                    	  if(high!="NA")
                                		  {
                                		    if(obj.count>high)
                                		    	obj.progressStatus="danger";
                                		  
                                		  }
                                	  if(low!="NA")
                                		{
                                		  if(obj.count<low)
                                			  {
                                			   obj.progressStatus="danger";
                                			  // return;
                                			   continue;
                                			  }
                                		 obj.progress=parseFloat(obj.count)/parseFloat(high)*0.01;                                    		                                  
                                		 obj.progressStatus="success";
                                		}
                                	  else
                                		  obj.progressStatus="danger";
                                    	  //end logic for color
                                    	 
                                    	  formatted.push(obj);
                                    	}
                                    
                                    $scope.bloodReport=angular.copy(formatted);
                                    $scope.bloodValue={date:"22/07/2014",reportId:"233049"};
                                   // alert(JSON.stringify( $scope.bloodReport));
							  }).
							  error(function(data, status, headers, config) {
							    // called asynchronously if an error occurs
							    // or server returns response with an error status.
							  });
							
							//For Lipid Report
							
							$http.get('http://hospital-test.apigee.net/care-coordination/DiagnosticReport?report_type=lipid').
							  success(function(data, status, headers, config) {
                                  var recived=data.contained;
                                  var formatted=[];
                                  
                                  for(var i=0;i<recived.length;i++)
                                  	{
                                  	var high="NA";
                                  	var low="NA";
                                  	if(typeof recived[i].referenceRange!="undefined")
                                  		{
                                  		if(typeof recived[i].referenceRange[0].low!="undefined")
                                  		  low=recived[i].referenceRange[0].low.value;
                                      
                                      	if(typeof recived[i].referenceRange[0].high!="undefined")
                                      		high=recived[i].referenceRange[0].high.value;
                                  		}
                                
                                  	var    obj=
                                  		  {
                                  			  type:recived[i].name.text,
                                  			  count:recived[i].valueQuantity.value,
                                  			  unit:recived[i].valueQuantity.units,
                                  			
                                  			  reference:
                                  			  {
                                  				low:0,
                                  				high:0
                                  				  
                                  			  },
                                  			  progress:0,
                                  			progressStatus:"danger",
                                  		  };
                                  	if(low!="NA" && high!="NA")
                                  		{
                                  		obj.low=low;
                                  		obj.high=high;
                                  		}
                                  	  formatted.push(obj);
                                  	}
                                  
                                  $scope.lipidReport=angular.copy(formatted);
                                  $scope.lipidValue={date:"22/07/2014",reportId:"233049"};
                                 // alert(JSON.stringify( $scope.bloodReport));
							  }).
							  error(function(data, status, headers, config) {
							    // called asynchronously if an error occurs
							    // or server returns response with an error status.
							  });
							
							var fetched=false;
							$http.get('http://hospital-test.apigee.net/care-coordination/DiagnosticReport?report_type=urine').
							  success(function(data, status, headers, config) {
                                  var recived=data.contained;
                                  var formatted=[];
                                  
                                  for(var i=0;i<recived.length;i++)
                                  	{
                                  	var high="ABSENT";
                                  	var low="ABSENT";
                                  	if(typeof recived[i].referenceRange!="undefined")
                                  		{
                                  		if(typeof recived[i].referenceRange[0].low!="undefined")
                                  		  low=recived[i].referenceRange[0].low.value;
                                      
                                      	if(typeof recived[i].referenceRange[0].high!="undefined")
                                      		high=recived[i].referenceRange[0].high.value;
                                  		}

                                  	  var obj=
                                  		  {
                                  			  type:recived[i].name.text,
                                  			  count:recived[i].valueQuantity.value,
                                  			  unit:recived[i].valueQuantity.units,
                                  			  reference:low+"-"+high
                                  		  };
                                  	  formatted.push(obj);
                                  	}
                                  
                                  $scope.urineReport=angular.copy(formatted);
                                  $scope.urineValue={date:"22/07/2014",reportId:"233049"};
                                  fetched=true;
                                 // alert(JSON.stringify( $scope.bloodReport));
							  }).
							  error(function(data, status, headers, config) {
							    // called asynchronously if an error occurs
							    // or server returns response with an error status.
							  });
							
							
							$scope.ClickToEditCtrl=function($scope) {

							};

							$scope.activities=function(){ 
									$rootScope.changeState('app.activities');
									}
							var init = function () {
								$rootScope.app.pageTitle="Health Information";
							};
							init();
							
							
							var toggleValues=["down","up"];
							var prevIndex=-1;
							var isOpen=false;
							$scope.toggleBloodReportValue=toggleValues[0];
						     var toggleBloodReportIndex=0;
							$scope.toggleSugarDetailsValue=toggleValues[0];
							 var toggleSugarDetailsIndex=0;
							$scope.toggleBloodPreassureValue=toggleValues[0];
							 var toggleBloodPreassureIndex=0;
							$scope.toggleUrineReportValue=toggleValues[0];		
							 var toggleUrineReportIndex=0;
							 
							 var flag0=false;
							 var flag1=false;
							 var flag2=false;
							 var flag3=false;
							 
							$scope.toggleIcon=function(index)
							 {
								
								
								 if(!fetched)
									  return;
								 changeColor(parseInt(index));
								   resetLimitValues();
								 switch( parseInt(index) )
								  {
								 case 0:
									 if(prevIndex!=index)
									  resetAll(prevIndex);									 
									 toggleBloodReportIndex=Math.abs(toggleBloodReportIndex-1);
									 $scope.toggleBloodReportValue=angular.copy(toggleValues[toggleBloodReportIndex]);	
									
									 break;
								 case 1:	
									 if(prevIndex!=index)
									  resetAll(prevIndex);									 
									 toggleSugarDetailsIndex=Math.abs(toggleSugarDetailsIndex-1);
									 $scope.toggleSugarDetailsValue=angular.copy(toggleValues[toggleSugarDetailsIndex]);
									
									 break;			
								 case 2:	
									 if(prevIndex!=index)
									  resetAll(prevIndex);									 
									 toggleBloodPreassureIndex=Math.abs(toggleBloodPreassureIndex-1);
									 $scope.toggleBloodPreassureValue=angular.copy(toggleValues[toggleBloodPreassureIndex]);
									
									 break;										 								   
							    case 3:	
							    	if(prevIndex!=index)
								     resetAll(prevIndex);							    	
							    	 toggleUrineReportIndex=Math.abs(toggleUrineReportIndex-1);
								     $scope.toggleUrineReportValue=angular.copy(toggleValues[toggleUrineReportIndex]);
								   
								     break;										 
							   }
								 prevIndex=index;
								
							 };
							
							 var changeColor=function(index)
							 {
								 
								 if(index==0)
									  {
									    flag0=!flag0;
									    flag1=flag2=flag3=false;
									  }
								 else if(index==1)
								  {
									    flag1=!flag1;
									    flag0=flag2=flag3=false;
									  }
								 else if(index==2)
								  {
									    flag2=!flag2;
									    flag0=flag1=flag3=false;
									  }		
								 else if(index==3)
								  {
									    flag3=!flag3;
									    flag0=flag1=flag2=false;
									  }		
								 
								 if(flag0)
									 {
									 $(".makeGray0").removeClass("bg-white"); 
									 $(".makeGray0").addClass("bg-gray");
									 }
								 else
									 {
									 $(".makeGray0").removeClass("bg-gray"); 
									 $(".makeGray0").addClass("bg-white");
									 }
								 
								 if(flag1)
								 {
								 $(".makeGray1").removeClass("bg-white"); 
								 $(".makeGray1").addClass("bg-gray");
								 }
							 else
								 {
								 $(".makeGray1").removeClass("bg-gray"); 
								 $(".makeGray1").addClass("bg-white");
								 }				
								 
								 if(flag2)
								 {
								 $(".makeGray2").removeClass("bg-white"); 
								 $(".makeGray2").addClass("bg-gray");
								 }
							 else
								 {
								 $(".makeGray2").removeClass("bg-gray"); 
								 $(".makeGray2").addClass("bg-white");
								 }		
								 
								 if(flag3)
								 {
								 $(".makeGray3").removeClass("bg-white"); 
								 $(".makeGray3").addClass("bg-gray");
								 }
							 else
								 {
								 $(".makeGray3").removeClass("bg-gray"); 
								 $(".makeGray3").addClass("bg-white");
								 }	
								 
							 }
							 var resetAll=function(prevIndex)
							 {		
								 if( isOpen)
									 return;
								 prevIndex=parseInt(prevIndex);
								 
								 
								 switch(prevIndex)
								  {
								 
								 case 0:
										$scope.toggleBloodReportValue=toggleValues[0];
									     var toggleBloodReportIndex=0;				
									 //   $(".makeGray"+prevIndex).toggleClass("bg-white bg-gray");
									 break;
								 case 1:	
										$scope.toggleSugarDetailsValue=toggleValues[0];
										 var toggleSugarDetailsIndex=0;
										// $(".makeGray"+prevIndex).toggleClass("bg-white bg-gray");
									 break;			
								 case 2:	
										$scope.toggleBloodPreassureValue=toggleValues[0];
										 var toggleBloodPreassureIndex=0;
									//	 $(".makeGray"+prevIndex).toggleClass("bg-white bg-gray");	
										 break;										 								   
							    case 3:	

									$scope.toggleUrineReportValue=toggleValues[0];		
									 var toggleUrineReportIndex=0;
								//	 $(".makeGray"+prevIndex).toggleClass("bg-white bg-gray");
									 break;										 
							   }



							 };
							/*code for toggle
							$scope.activeActivityIndex=0;
							$scope.activeActivityName=$scope.activityList[$scope.activeActivityIndex];
							
							
							$scope.toggleSelection=function(selectedIndex)
							  {
								  $("#activityItem"+$scope.activeActivityIndex).removeClass("active");
								  $scope.activeActivityIndex=selectedIndex;
								  $("#activityItem"+$scope.activeActivityIndex).addClass("active");
								  $scope.activeActivityName=$scope.activityList[$scope.activeActivityIndex];
								  $("#friendsGroupsActivities").removeClass("in");
								  $scope.toggleArrow();
							  };
							  
							  $scope.toggleArrow=function()
							  {
								  $("#friendsGroupsToggleArrow").toggleClass("glyphicon-chevron-up glyphicon-chevron-down");  
							  };

							//end code for toggle*/
							
							
							
													
						} ]);