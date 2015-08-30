'use strict';

angular.module('myApp', [])
  .controller('FindController', function($scope, $http) {
    
    if($scope.search === undefined) {
      $scope.search = 'toshm@hotmail.com';
      fetch($scope.search);
    }
    
    /**
    * make api call to search user image
    */
    function fetch(email) {
      var promise = $http({method: 'GET', url: 'http://localhost:3001/api/search/?email=' + email});
      var res = {};
      promise.then(function(response) {
        res.success = true;
        res.data = response.data;
        $scope.details = res;
      }, function(error) {
        res.success = false;
        $scope.details = res;
      });

    }

    /**
    * basic email validation
    */
    function validateEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }

    /**
    * search button handler
    */ 
    $scope.select = function() {
      var email = $scope.search;
      if(!email) {
        $scope.search = 'email can\'t be null';
      } else if(validateEmail(email)) {
        fetch($scope.search);
      } else {
        $scope.search = 'please enter valid email address';
      }
    }

  });
