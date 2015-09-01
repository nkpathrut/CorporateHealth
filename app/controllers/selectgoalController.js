App
		.controller(
				'selectgoalsController',
				[
						'$scope',
						'$state',
						'$http',
						'$rootScope',
						function($scope, $state, $http, $rootScope) {
						
							alert('selectgoalsController');
							/*$scope.loadClassy=function()
							{
							$('.loader3').ClassyLoader({
							    speed: 40,
							    fontFamily: 'Georgia',
							    fontColor: 'rgba(0,0,0,0.4)',
							    lineColor: 'rgba(255,0,0,0.4)',
							    lineWidth: 1,
							    height: 40,
							    fontSize : 10,
							    width: 40,
							    diameter : 30,
							    remainingLineColor: 'rgba(0,0,0,0.1)'
							});
							}*/
							
							var myGoals=[];
							var goalClasses=[false,false,false];
						//	var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
							var goal1=	
							   {
									name : 'Maintain BMI',
									target: 'Target BMI',
									targetValue: '23.56',
									targetDate : new Date(2015, 8, 27, 0, 0, 0, 0),
									progessValue : 70,
									progressColor: 'warning',										
									status: 'In Progress',
									close: true
								}
							var goal1_details=
								[{
									time: '120 mins',
									calories: '365 cal',
									distance: '3.5 km',
									image: 'cycling'
								 },
								 {
										time: '20 mins',
										calories: '363 cal',
										distance: '300 m',
										image : 'cricket'
									 }
								];
							goal1.details=goal1_details;
							
							var goal2=	
							   {
									name : 'Lose Weight',
									target: 'Target Weight',
									targetValue: '60 Kg',
									targetDate : new Date(2015, 8, 19, 0, 0, 0, 0),
									progessValue : 50,
									progressColor: 'green',
									status: 'In Progress'
								}
							var goal2_details=
								[{
									time: '120 mins',
									calories: '365 cal',
									distance: '3.5 km',
									image : 'cricket'
								 },
								 {
										time: '20 mins',
										calories: '363 cal',
										distance: '300 m',
										image : 'swimming'
									 }
								];
							goal2.details=goal2_details;
							
							var goal3=	
							   {
									name : 'Waist Hip ratio',
									target: 'Target WHR',
									targetValue: '60.95',
									progessValue : 38,
									progressColor: 'danger',
									targetDate : new Date(2015, 8, 19, 0, 0, 0, 0),
									status: 'In Progress'
								}
							var goal3_details=
								[{
									time: '120 mins',
									calories: '365 cal',
									distance: '3.5 km',
									image : 'cricket'
								 },
								 {
										time: '20 mins',
										calories: '363 cal',
										distance: '300 m',
										image : 'swimming'
									 }
								];
							goal3.details=goal3_details;
						
							myGoals.push(goal1);
							myGoals.push(goal2);
							myGoals.push(goal3);
							
							$scope.goalClasses=angular.copy(goalClasses);
							$scope.myGoals=angular.copy(myGoals);
						//	alert(JSON.stringify(myGoals));
							$scope.changeClass=function(gIndex)
							{
								gIndex=parseInt(gIndex);
								for(var i=0;i<$scope.goalClasses.length;i++)
									{
									  if(i==gIndex)
										  $scope.goalClasses[i]=!$scope.goalClasses[i];
									  else
										  $scope.goalClasses[i]=false;
									}
							}
															
						} ]);