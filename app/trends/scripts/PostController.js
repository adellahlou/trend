angular
	.module('trends')
	.controller('PostController', function($scope, supersonic) {
  	$scope.data = JSON.parse(localStorage.getItem("data"));
  	$scope.twitter = $scope.data.twitter ? $scope.data.twitter.statuses : null;
  	$scope.ninegag = $scope.data.ninegag ? $scope.data.ninegag.result : null;
  	$scope.google = $scope.data.google ? $scope.data.google : null;
  	$scope.bing = $scope.data.bing ? $scope.data.bing : null;
  	$scope.ninegagclick = function (post) {
  		var view = new supersonic.ui.View(post.url);
		  supersonic.ui.layers.push(view);
  	}
  	$scope.twitterclick = function (post) {
  		if (post.entities.urls.length) {
  			var view = new supersonic.ui.View(post.entities.urls[0].url);
			  supersonic.ui.layers.push(view);
  		}
  	}
  	$scope.googleclick = function (post) {
  		var view = new supersonic.ui.View(post.link);
		  supersonic.ui.layers.push(view);
  	}
  });
