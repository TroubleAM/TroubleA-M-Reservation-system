//defined the module woh will have the controller for all the HTML page
angular.module('app')
.controller('AppCtrl', function($scope){
    $scope.doctors;
    $scope.currentDoctor;
    $scope.timeA;
    $scope.replies=[];
// load the doctors informations from the database 
    $scope.loadPage=function (){
      $.ajax({
        url:'/getDoctors',
        method:'GET',
        async: false,
        success:function(data){
          $scope.doctors = data;
          console.log('docs', $scope.doctors);
        }
      })
    };

    // Get doctor data and the rest doctors 
    $scope.getDoctorData = function(name) {
      console.log('555555555555555557', $scope.timeA);
      $.ajax({
        url:'/getDoctorData',
        method:'POST',
        async: false,
        dataType: 'json',
        data: {
          doctorName: name
        },
        success: function (data){
          $scope.currentDoctor = data;
          console.log('--------------->', $scope.currentDoctor);
        }
      });
      console.log('ssssssssssssssssssssssss');
    }
//it's for submit the paitent information and reserved appointment  
    $scope.reserveAppointment =function (time){
      console.log('1111111111111111', $scope.timeA)
      var petientName= $("#pName").val();
      var petientPhone= $("#pPhon").val();
      var petientCase=$("#pcase").val();
      $.ajax({
        url:'/reservedappointments',
        method:'PUT',
        dataType:'json',
        data:{
          username: $scope.currentDoctor.username,
          reservedAppointment:{
            patientName: petientName,
            patientPhone: petientPhone,
            patientCase :petientCase,
            availableAppointments: $scope.timeA,
            reply:''
          }
        },
        success:function(){
         console.log('------------> yaaaaaaaaaaaaaaaaay');
        }
      })
    };
    // when you click on a doctor this function will show the specific doctor  
    $scope.showDoctorAppointments = function (name){
      var currentDoctors = $scope.doctors;
      for (var i = 0; i < currentDoctors.length; i++) {
        if (currentDoctors[i].name === name)
        {
          currentDoctors[i].showAppointments = !currentDoctors[i].showAppointments;
        }else{
          currentDoctors[i].showAll = !currentDoctors[i].showAll;
        }
      }
    };
// change $scope.showReviewBox value when petient press addReview
// to show review div
    $scope.changeVar=function (){
      $scope.showReviewBox=!$scope.showReviewBox;
    }
//send review when petient press on submit the review
    $scope.sendReview=function (doctorName){
      var review= $('#review').val();
      $.ajax({
        url:'/sendReview',
        method:'POST',
        dataType:'json',
        data:{
          username:doctorName,
          review: review
        },
        success:function(data){
          console.log('success to send ', data)
        }
      })
    };
    // "reservedAppointments": [
    //     {
    //         "patientName": "ammmmmmmm",
    //         "patientPhone": "ammmmmmmm",
    //         "patientCase": "ammmmmmmm",
    //         "availableAppointments": {
    //             "time": "01:55",
    //             "date": "2017-10-10"
    //         },
    //         "reply": "go get some hbob"
    //     }
    // ]
    $scope.getReplies=function(name){
    //function which take the name from the client and post his replies 
      var doctors=$scope.doctors
      for(var i=0; i<doctors.length;i++){
        var point=doctors[i].reservedAppointments;
        for(var j=0;j<point.length ;j++){
          if(point[j].patientName===name){
              var reply={
                patientName: point[j].patientName,
                patientCase: point[j].patientCase,
                availableAppointments: point[j].availableAppointments,
                reply: point[j].reply,
                username: doctors[i].username
              };
              $scope.replies.push(reply);
          }
        }
      }
      console.log($scope.replies)
    }
 })
 .component('main', {
  controller:"AppCtrl",
   templateUrl: `./views/main.html`
 })
