App
    .controller(
        'activitiesController', [
            '$scope',
            '$state',
            '$http',
            '$rootScope',
            function($scope, $state, $http, $rootScope) {

                $scope.div_show_bg = function(friend) {
                    document.getElementById('xyz').style.display = "block";
                }

                //Function to Hide bg
                $scope.div_hide_bg = function() {
                    document.getElementById('xyz').style.display = "none";
                }

                if ($rootScope.empID == undefined) {
                    $rootScope.changeState('login');
                }


                $scope.toggleFav = function(index, element) {
                    if (element.iconClass == "icon-star") {
                        element.iconClass == angular.copy("fa fa-star");
                        var clickedObject = $scope.physicalActivities[index];
                        var obj = {
                            "empId": $rootScope.empID,
                            "actionNeeded": "add",
                            "activity": {
                                "activityId": clickedObject.activityId,
                                "activityName": clickedObject.activityName
                            }
                        };
                        var req = {
                                method: 'PUT',
                                url: basePath + '/activities?employee_id=' + $rootScope.empID,
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Headers': 'Content-Type',
                                    'Content-Type': 'application/json'
                                },
                                data: obj
                            }
                            // Sending Data To Server :
                        $http(req).
                        then(function(response) {
                            location.reload();
                        }, function(response) {
                            alert(JSON.stringify('Error:-' + response));
                        });

                    } else if (element.iconClass == "fa fa-star") {
                        element.iconClass = "icon-star"
                        var clickedObject = $scope.physicalActivities[index];
                        var obj = {
                            "empId": $rootScope.empID,
                            "actionNeeded": "delete",

                            "activity": {
                                "activityId": clickedObject.activityId,
                                "activityName": clickedObject.activityName
                            }
                        };
                        var req = {
                                method: 'PUT',
                                url: basePath + '/activities?employee_id=' + $rootScope.empID,
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Headers': 'Content-Type',
                                    'Content-Type': 'application/json'
                                },
                                data: obj
                            }
                            // Sending Data To Server :
                        $http(req).
                        then(function(response) {
                            location.reload();
                        }, function(response) {
                            alert(JSON.stringify('Error:-' + response));
                        });


                    }
                    //	angular.element(event.target).toggleClass("icon-star fa-star");

                }

                var init = function() {
                    $rootScope.app.pageTitle = "Physical Activities";
                };
                init();

                $scope.physicalActivities = [];
                var fetchActivities = function() {

                    // Simple GET request example :
                    $http.get(basePath + '/activities').
                    success(function(data, status, headers, config) {
                        var activities_formatted = [];
                        for (var i = 0; i < data.entities.length; i++) {
                            if (data.entities[i].activityName == "Table Tennis")
                                data.entities[i].imgName = "Table%20Tennis";
                            else
                                data.entities[i].imgName = data.entities[i].activityName;
                            var obj = {
                                activityName: data.entities[i].activityName,
                                imgName: data.entities[i].imgName,
                                text: "Add to favourite",
                                activityId: data.entities[i].activityId,
                                iconClass: "icon-star"
                            };
                            activities_formatted.push(obj);
                        }



                        for (j = 0; j < $scope.favourites.length; j++)
                            for (k = 0; k < activities_formatted.length; k++)
                                if ($scope.favourites[j].activityId == activities_formatted[k].activityId) {
                                    activities_formatted[k].iconClass = "fa fa-star";
                                    activities_formatted[k].text = "Remove as favourite";
                                    //   alert(JSON.stringify(activities_formatted[k]));
                                    break;
                                }

                        $scope.physicalActivities = angular.copy(activities_formatted);

                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

                }


                $http.get(basePath + '/activities?employee_id=' + $rootScope.empID).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var favourites_formatted = [];
                    for (var i = 0; i < data.entities[0].favourites.length; i++) {
                        //alert(JSON.stringify(data.entities[0].favourites[i]));
                        if (data.entities[0].favourites[i].activityName == "Table Tennis")
                            data.entities[0].favourites[i].imgName = "Table%20Tennis";
                        else
                            data.entities[0].favourites[i].imgName = data.entities[0].favourites[i].activityName;

                        var obj = {
                            activityId: data.entities[0].favourites[i].activityId,
                            activityName: data.entities[0].favourites[i].activityName,
                            imgName: data.entities[0].favourites[i].imgName
                        };
                        favourites_formatted.push(obj);
                    }
                    $scope.favourites = angular.copy(favourites_formatted);

                    fetchActivities();

                }).
                error(function(data, status, headers, config) {
                    alert('favourites fetch failed.');
                });


            }
        ]);