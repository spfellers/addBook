var addBook = angular.module('addBook', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all address and show them
    $http.get('/api/address')
        .success(function(data) {
            $scope.address = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createAddress = function() {
        $http.post('/api/address', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.address = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteAddress = function(id) {
        $http.delete('/api/address/' + id)
            .success(function(data) {
                $scope.address = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
