'use strict'
var cashregister = angular.module('cashregister');

cashregister.component('homePage', {
    controller: HomePageController,
    controllerAs: 'hpc',
    template: 
    ['<h1>Responsive CSS Tabs</h1>',
    '<button type="button" data-ng-click="hpc.logoff()">Logoff</button>',
    ].join('')
})

HomePageController.$inject = ['$scope', '$http', '$state', 'userService'];

function HomePageController($scope, $http, $state, userService) {
    var vm = this;

    vm.$onInit = () => {
        vm.helloMessage = 'Bem vindo ' + userService.getUser().username;

        vm.logoff = logoff;
    };

    //PLACEHOLDER
    function doLogin(userInfo) {
        $http.post('/login', userInfo)
            .then(function successFunction(data){
                $rootScope.loggedUser = data.data;
            }, function errorFunction() {
                vm.invalidLogin = true;
            })
    }

    //Get all transactions and print the variable on ng-repeat
    function getTransactions() {
        $http.get('/transaction', userInfo)
            .then(function successFunction(data){
                $rootScope.loggedUser = data.data;
            }, function errorFunction() {
                vm.invalidLogin = true;
            })
    }

    // Logoff
    function logoff() {
        userService.removeUser();
        $state.go('login');
    }
}