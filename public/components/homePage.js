'use strict'
var cashregister = angular.module('cashregister');

cashregister.component('homePage', {
    controller: HomePageController,
    controllerAs: 'hpc',
    template: 
    ['<h1>{{hpc.helloMessage}}</h1>',
    //Home page with counts
    '<h1 data-ng-click="hpc.loadPageOption(0)">Home Page</h1>',
    '<div class="tabs" data-ng-if="hpc.pageOption === 0"><table>',
    '<tr>',
    '<th>Total today</th>',
    '<th>Total on the last 30 days</th>',
    '</tr>',
    '<tr>',
    '<td>{{hpc.countToday}}</th>',
    '<td>{{hpc.countMonth}}</th>',
    '</tr>',
    '</table></div>',
    //Transaction List
    '<h1 data-ng-click="hpc.loadPageOption(1)">Transaction List</h1>',
    '<div data-ng-if="hpc.pageOption === 1">',
    '<table>',
    '<tr>',
    '<th>Transaction Name</th>',
    '<th>Transaction Amount</th>',
    '<th>Transaction Type</th>',
    '<th data-ng-if="hpc.isManager()">Edit Transaction</th>',
    '<th data-ng-if="hpc.isManager()">Delete Transaction</th>',
    '</tr>',
    '<tr data-ng-repeat="transaction in hpc.transactions">',
    '<td>{{transaction.description}}</th>',
    '<td>{{transaction.amount}}</th>',
    '<td>{{transaction.paymentType}}</th>',
    '<td data-ng-if="hpc.isManager()" data-ng-click="hpc.goToUpdateTransaction(transaction)">Click to update</th>',
    '<td data-ng-if="hpc.isManager()" data-ng-click="hpc.deleteTransaction(transaction._id)">Click to delete</th>',
    '</tr>',
    '</table>',
    '</div>',
    //Form to add and update transactions
    '<h1 data-ng-click="hpc.loadPageOption(2)">{{hpc.createOrEdit}} transaction</h1>',
    '<div data-ng-if="hpc.pageOption === 2">',
    '<form>',
    'Transaction Name: <input type="text" ng-model="hpc.newTransaction.description"><br>',
    'Amount: <input type="text" ng-model="hpc.newTransaction.amount"><br>',
    'Payment Type: <input type="text" ng-model="hpc.newTransaction.paymentType"><br>',
    '<button type="button" data-ng-if="!hpc.isEditing" data-ng-click="hpc.createTransaction(hpc.newTransaction)">Create new transaction</button>',
    '<button type="button" data-ng-if="hpc.isEditing" data-ng-click="hpc.updateTransaction(hpc.newTransaction)">Edit Transaction</button>',
    '</form>',
    '</div>',
    '<h1 data-ng-click="hpc.logoff()">Logoff</h1>',
    ].join('')
})

HomePageController.$inject = ['$scope', '$http', '$state', '$window', 'userService'];

function HomePageController($scope, $http, $state, $window, userService) {
    var vm = this;

    vm.$onInit = () => {
        vm.helloMessage = 'Welcome to your Cash Register, ' + userService.getUser().username;

        vm.pageOption = 0;
        vm.userIsManager = userService.getUser().userType;

        vm.newTransaction = {
            description: '',
            amount: 0,
            paymentType: '',
        };
        vm.createOrEdit = 'Create new';
        vm.isEditing = false;

        vm.isManager = isManager;
        vm.loadPageOption = loadPageOption;
        vm.getTransactions = getTransactions;
        vm.getCountLast30Days = getCountLast30Days;
        vm.getCountToday = getCountToday;
        vm.createTransaction = createTransaction;
        vm.deleteTransaction = deleteTransaction;
        vm.goToUpdateTransaction = goToUpdateTransaction;
        vm.updateTransaction = updateTransaction;
        vm.logoff = logoff;

        vm.countToday = vm.getCountToday();
        vm.countMonth = vm.getCountLast30Days();
        vm.transactions = vm.getTransactions();
    };

    function isManager() {
        return vm.userIsManager === 'Manager';
    }

    function loadPageOption(option) {
        vm.pageOption = option;
        vm.createOrEdit = 'Create new';
    }

    function getTransactions() {
        $http.get('/transaction')
            .then(function successFunction(data){
                vm.transactions = data.data;
            }, function errorFunction() {
                console.log('error');
            })
    }

    function getCountLast30Days() {
        $http.get('/month')
            .then(function successFunction(data){
                vm.countMonth = data.data[0].count;
            }, function errorFunction() {
                console.log('error');
            })
    }

    function getCountToday() {
        $http.get('/today')
            .then(function successFunction(data){
                vm.countToday = data.data[0].count;
            }, function errorFunction() {
                console.log('error');
            })
    }

    function createTransaction(transactionInfo) {
        $http.post('/transaction', transactionInfo)
            .then(function successFunction(data){
                vm.getTransactions();
                console.log('success');
            }, function errorFunction() {
                console.log('error');
            })
    }

    function deleteTransaction(transactiondID) {
        var confirmDialog = confirm("Are you sure you want to delete?");

        if (confirmDialog) {
            $http.delete('/transaction/' + transactiondID)
            .then(function successFunction(data){
                vm.getTransactions();
                console.log('Transaction deleted');
            }, function errorFunction() {
                console.log('error');
            })
        } else {
            return false;
        }
    }

    function goToUpdateTransaction(transactionInfo) {
        vm.pageOption = 2;
        vm.isEditing = true;
        vm.createOrEdit = 'Edit';
        vm.newTransaction = {
            description: transactionInfo.description,
            amount: transactionInfo.amount,
            paymentType: transactionInfo.paymentType
        };
    }

    function updateTransaction(transactionInfo) {
        $http.put('/transaction/' + transactionInfo._id, 
            {description: vm.newTransaction.description,
            amount: vm.newTransaction.amount,
            paymentType: vm.newTransaction.paymentType})
            .then(function successFunction(data) {
                vm.getTransactions();
                vm.pageOption = 1;
                $window.alert('Transaction updated!');
            }, function errorFunction(){
                console.log('error');
            }) 
    }

    // Logoff
    function logoff() {
        userService.removeUser();
        $state.go('login');
    }
}