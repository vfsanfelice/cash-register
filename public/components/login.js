'use strict'
var cashregister = angular.module('cashregister');

cashregister.component('login', {
    controller: LoginController,
    controllerAs: 'lc',
    template: 
    ['<div class="login-page">',
        '<div class="form">',
        '<span class="span-error">{{lc.errorMessage}}</span>',
        '<form class="login-form" ng-submit="">',
            '<input type="text" placeholder="username" ng-model="lc.login.username"/>',
            '<input type="password" placeholder="password" ng-model="lc.login.password"/>',
            '<button type="button" data-ng-click="lc.doLogin(lc.login)">login</button>',
        '</form>',
        '</div>',
    '</div>',].join('')
})

LoginController.$inject = ['$scope', '$http', '$state', 'userService'];

function LoginController($scope, $http, $state, userService) {
    var vm = this;

    vm.$onInit = () => {
        vm.login = {
            username : '',
            password : '',
        };
        
        vm.invalidLogin = false;
        vm.errorMessage = '';

        vm.doLogin = doLogin;
    };

    function doLogin(userInfo) {
        $http.post('/login', userInfo)
            .then(function successFunction(data){
                userService.setUser(data.data);
                $state.go('homePage');
            }, function errorFunction() {
                vm.invalidLogin = true;
                vm.errorMessage = 'User not found';
            })
    }
}