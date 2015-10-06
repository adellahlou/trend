angular
	.module('trends')
	.controller('PostController', function($scope, supersonic) {
  	$scope.twitter = JSON.parse(localStorage.getItem("twitter"));
  	$scope.nineGag = JSON.parse(localStorage.getItem("nineGag"));
  });
