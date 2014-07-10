'use strict';
angular.module('plunker', []);

var ModalInstanceCtrl;
ModalInstanceCtrl = function ($scope, $modalInstance, title, message, count) {

  $scope.title = title;
  $scope.message = message;
  $scope.itemNotFound = true;
  if (count > 1) {
    $scope.title = 'Delete multiple songs';
    $scope.message = 'Are you sure you want to delete selected songs?';
  }
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

var ModalDemoCtrl;
ModalDemoCtrl = function ($scope, $modal, $log, $timeout) {

  var vTitle = 'Delete a song';
  var vMessage = 'Are you sure you want to delete this song?';
  $scope.tableSelection = {};
  $scope.btnDelete = true;
  $scope.selectedAll = true;

//  Test check all
  $scope.setCheckAll = function(){
    angular.forEach($scope.list, function (item) {
      if (!item.done) {
        $scope.selectedAll = false;
      }
      else{
        $scope.btnDelete = false;
      }
    });
  };
  $scope.setCheckAll();

//  check box
  $scope.myCheck = function () {
    $timeout(function(){
      $scope.btnDelete = true;
      $scope.selectedAll = true;
      $scope.setCheckAll();
    });
  };

//  Check all
  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    $scope.btnDelete = !$scope.selectedAll;
    angular.forEach($scope.list, function (item) {
      item.done = $scope.selectedAll;
    });
  };

  // Remove selected rows
  $scope.removeSelectedRows = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/dialog.html',
      controller: ModalInstanceCtrl,
      size: 'lg',
      resolve: {
        title: function () {
          return vTitle;
        },
        message: function () {
          return vMessage;
        },
        count: function () {
          var iCount = 0;
          //if(iCount<2){
          for (var i = $scope.list.length; i--;) {
            if ($scope.list[i].done) {
              iCount++;
            }
          }
          return iCount;
        }
      }
    });

    modalInstance.result.then(function () {

      for (var i = $scope.list.length; i--;) {
        if ($scope.list[i].done) {
          $scope.list.splice(i, 1);
        }
      }

      $scope.btnDelete = true;
      $scope.selectedAll = false;

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  // Remove a row
  $scope.remove = function (item) {
    var modalInstance = $modal.open({
      templateUrl: 'views/dialog.html',
      controller: ModalInstanceCtrl,
      size: 'lg',
      resolve: {
        title: function () {
          return vTitle;
        },
        message: function () {
          return vMessage;
        },
        count: function () {
          return 1;
        }
      }
    });

    modalInstance.result.then(function () {

      var index = $scope.list.indexOf(item);
      $scope.list.splice(index, 1);
      $scope.btnDelete = true;
      for (var i = $scope.list.length; i--;) {
        if ($scope.list[i].done) {
          $scope.btnDelete = false;
          break;
        }
      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};



