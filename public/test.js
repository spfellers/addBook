/*globals angular */
/*eslint-env browser */

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

//refresh the page, make sure all contacts are loaded, empty the forms
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

//adding a contact to the list
$scope.addContact = function() {
  console.log("addcontact - $scope.contact = " + $scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log("addcontact - response = " + response);
    refresh();
  });
};


//removing a contact from the list, specifying id
$scope.remove = function(id) {
  console.log("$scope remove id = " + id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

//retrieving a contacts id to be compared with later.
$scope.edit = function(id) {
  console.log("edit id: " + id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

//updating a contact with given id
$scope.update = function() {
  console.log("update id : " + $scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  });
};

//removing text from forms
$scope.deselect = function() {
  $scope.contact = "";
};

}]);﻿
