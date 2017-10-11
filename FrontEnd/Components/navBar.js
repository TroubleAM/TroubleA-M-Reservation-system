angular.module('app')
.controller('navBar', ($scope, $http) => {
  $scope.isLoggedIn = false;
  $scope.checkIsLoggedIn = function() {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    // $http({
    //   url:'/checkIsLoggedIn',
    //   method: 'GET',
    // }).then(function successCallback(res){
    //   $scope.isLoggedIn = res;
    //   console.log(res, $scope.isLoggedIn);
    // })
    $.ajax({
      url: '/checkIsLoggedIn',
      method: 'GET',
      async: false,
      success: function (data){
        $scope.isLoggedIn = (data === 'true') ? true : false;
        console.log('cccccccccccccccc', $scope.isLoggedIn);
      }
    })
  }
})
.component('navbar',{
  templateUrl: './views/navBar.html'
})
