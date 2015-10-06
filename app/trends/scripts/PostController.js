angular
	.module('trends')
	.controller('PostController', function($scope, supersonic) {
  	$scope.posts = JSON.parse(localStorage.getItem("posts"));
  });
