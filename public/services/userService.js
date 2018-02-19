'use strict'
var cashregister = angular.module('cashregister');

cashregister.factory('userService', UserService);

UserService.$inject = [];

function UserService() {
    var currentUser = null;

    var service = {
        getUser: getUser,
        setUser: setUser,
        hasUser: hasUser,
        removeUser: removeUser,
    }

    return service;

    function setUser(userInfo) {
        currentUser = userInfo;
    }

    function getUser() {
        return currentUser;
    }

    function hasUser() {
        return !!currentUser;
    }

    function removeUser() {
        currentUser = null;
    }

}