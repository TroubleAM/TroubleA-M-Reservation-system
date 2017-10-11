angular.module('app', [])
.controller('indexCtrl', ($scope, $http) => {
  $scope.isLoggedIn = true;
})
.component('index', {
  template: `
    <navbar/>
  `
})
