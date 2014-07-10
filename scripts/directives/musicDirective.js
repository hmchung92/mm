'use strict';
angular.module('musicDirective',[])

  .directive('musicHeader', function(){
    return{
      restrict: 'E',
      templateUrl: 'views/music-header.html',
      controller: function(){
      }
    };
  })

  .directive('musicFooter', function(){
    return{
      restrict: 'E',
      templateUrl: 'views/music-footer.html'
    };
  })

  .directive('musicPath', function(){
    return{
      restrict: 'E',
      templateUrl: 'views/music-path.html',
      controller: function($scope){
        $scope.navs = [];
      }
    };
  })

  .directive('musicSidebar', function(){
    return{
      restrict: 'E',
      templateUrl: 'views/music-sidebar.html'
    };
  })

  //  sidr side menu the directive
  .directive('sideMenu', function () {
    return {
      scope:    true,
      restrict: 'E',
      template:
        '<a href id="nav-colum" class="navbar-brand" ng-click="toggle()" >' +
          ' <span id="header-nav" class="glyphicon glyphicon-align-justify"></span>' +
        '</a>',
      link: function (){
        var sidrMenu = angular.element('#nav-colum');
        sidrMenu.sidr({
          displace: false
        });

        $(window).resize(function(){
          var sidebar = angular.element('#sidr');
          var w = $(window).width();
          if(w> 480 && sidebar.is(':hidden')){
            sidebar.removeAttr('style');
          }
        });
      }
    };
  })

  //  Music table the directive
  .directive('musicTable', function(){
    return{
      restrict: 'E',
      scope: {
        list: '=mmData'
      },
      controller: 'ModalDemoCtrl',
      templateUrl:'views/music-table.html',
      link: function(scope){
        var u = angular.element('.text-artist');
        var audioElement = angular.element('.mm-mp3');

        u.hide();

        scope.playMp3 = function(mp3){
          var audio ='<audio id="video" controls autoplay loop> '+
            '<source src="media/'+mp3+'.mp3" type="audio/mpeg">'+
            '<source src="media/'+mp3+'.ogg" type="audio/ogg">'+
            'Your browser does not support HTML5 video.'+
            '</audio>';

          if(audioElement.children().length>0){
            audioElement.children(0).replaceWith(audio);
          }
          else{
            audioElement.append(audio);
          }

        };
        scope.pauseMp3 = function(){
          audioElement.children(0).replaceWith('');
        };
      }
    };
  })

  .directive('musicSearch', function(){
    return{
      restrict:   'E',
      templateUrl: 'views/music-search.html',
      controller: function($scope){

        var btnCtrlRight  = angular.element('.btnCtrlRight'),
            btnSearch     = angular.element('.music-search');

        btnSearch.hide();

        var topArticle  = angular.element('.top-article');

        $scope.clickSearch = function(){
          btnCtrlRight.hide();
          btnSearch.slideDown();
        };

        $scope.clickRemove = function(){
          topArticle.show();
          btnCtrlRight.slideDown();
          btnSearch.hide();
//          searchTop.hide();
        };

      }
    };
  });