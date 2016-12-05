/*globals angular */
/*eslint-env browser */

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function() {
	$http.get("/contactlist").success(function(response) {
		$scope.contactlist = response;
		$scope.contact = "";
		console.log("Response = " + response);
	}).error(function(response) {
		console.log('Error: ' + response);
	});
};

refresh();

$scope.addContact = function() {
  //console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
	console.log("HELLO I AM IN ADDCONTACT");
    //console.log(response);
    refresh();
  });
};



$scope.remove = function(id) {
  //console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};
/*
$scope.edit = function(id) {
  //console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  
*/
$scope.update = function() {
  //console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.contact = "";
};

}]);﻿
