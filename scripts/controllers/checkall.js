'use strict';
(function(){
  angular.module('musicManager',[])

    .controller('checkboxController', function checkboxController($scope,$timeout) {

      $scope.mydata = [
        {
          'id': 1,
          'Name': 'Item one'
        },
        {
          'id': 2,
          'Name': 'Item two'
        },
        {
          'id': 3,
          'Name': 'Item three'
        },
        {
          'id': 3,
          'Name': 'Item three'
        }
      ];
      var u=0;
      $scope.count = u;

      $timeout(function(){

      });


      $scope.chung = function(){

//          $scope.mydata[index].done = !$scope.mydata[index].done;
        $timeout(function(){
          $scope.selectedAll = true;
          angular.forEach($scope.mydata, function (item) {

            if(!item.done)
            {
              $scope.selectedAll = false;
            }
          });
        });
      };

      $scope.checkAll = function () {
        $scope.selectedAll = !$scope.selectedAll;
        angular.forEach($scope.mydata, function (item) {
          item.done = $scope.selectedAll;
        });

      };


    })


  ;



})();