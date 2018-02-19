'use strict'
var cashregister = angular.module('cashregister', ['ui.router']);

cashregister.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/app/login');

    $stateProvider
    .state({
        name: 'login',
        url: '/app/login',
        component: 'login'
    })
    .state({
        name: 'homePage',
        url: '/app/home',
        component: 'homePage',
        protected: true
    });
})

cashregister.run(function($transitions) {
    $transitions.onBefore({}, function(transition) {
        // check if the state should be protected
        var userService = transition.injector().get('userService');
        if (transition.to().protected && !userService.hasUser()) {
          // redirect to the 'login' state
          return transition.router.stateService.target('login');
        }
    });
})