'use strict';

angular.module('myApp', [])
  .controller('FindController', function($scope, $http){
    //var pendingTask;

    if($scope.search === undefined){
      $scope.search = 'toshm@hotmail.com';
      fetch($scope.search);
    }

    //$scope.change = function(){
     // if(pendingTask){
      //  clearTimeout(pendingTask);
      //}
      //pendingTask = setTimeout(fetch, 800);
    //};

    function fetch(email){
      var promise = $http({method: 'GET', url: 'http://localhost:3001/api/users/' + email});
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

    //$scope.update = function(movie){
    //  $scope.search = movie.Title;
     // $scope.change();
    //};

    $scope.select = function(){
      fetch($scope.search);
      //this.setSelectionRange(0, this.value.length);
    }
  });
