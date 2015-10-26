angular
	.module('trends')
	.controller('PostController', function($scope, supersonic) {
  	$scope.data = JSON.parse(localStorage.getItem("data"));
    supersonic.logger.info($scope.data);
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
    $scope.orderByDate = function (post) {
      if (post.date) {
        var date = new Date(post.date);
        return date;
      }
    }
  });
