angular
.module('trends')
.controller('PostController', function($scope, supersonic) {
	var data = JSON.parse(localStorage.getItem("data"));
	$scope.data = data[0];
	$scope.news = data[1];
	$scope.addNews = function(src){
		src.selected = !src.selected;
		$scope.data.forEach(function(data){
			if (src.value == data.source)
				data.visibility = src.selected;
		});
	}
	$scope.ninegagclick = function (post) {
		var view = new supersonic.ui.View(post.url);
		supersonic.ui.layers.push(view);
	}

	$scope.twitterclick = function (post) {
		if (post.entities.urls.length) {
			var view = new supersonic.ui.View(post.entities.urls[0].url);
		  supersonic.ui.layers.push(view);
		}
	};

	$scope.googleclick = function (post) {
		var view = new supersonic.ui.View(post.link);
	  supersonic.ui.layers.push(view);
	};

	$scope.orderByDate = function (post) {
		if (post.date) {
			var date = new Date(post.date);
			return date;
		}
	};
});
