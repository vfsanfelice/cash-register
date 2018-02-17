var cashregister = angular.module('cashregister', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/transaction')
        .success(function(data) {
            $scope.transactions = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error', + data);
        });


}