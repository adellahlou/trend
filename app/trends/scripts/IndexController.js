angular
  .module('trends', ['supersonic'])
  .controller('IndexController', function($scope, supersonic, $http) {
  	// initializing trends from twitter/trends
		$http.get("http://secret-mesa-1979.herokuapp.com/twitter/trends")
			.then(function(data){
				$scope.trends = data.data[0].trends;
	    });
    // initialize the news sources with their properties for css and selection set at a default.
    $scope.news = ["Reddit","Twitter","Buzzfeed","9GAG","Facebook","Google","Yahoo","New York Times"].map(function(item){
    	if (item == "9GAG") {
    		return {"name": item, "css": "GAG", "selected": false}
    	} else if (item == "New York Times") {
    		return {"name": item, "css": "NYT", "selected": false}
    	}else {
	    	return {"name": item, "css": item, "selected": false}
	    }
    });
    // function for adding news source to search function
		$scope.addNews = function (src) {
			src.selected = !src.selected;
		}
		// ev is a search term. Function will split on # if it exists if not append search to url.
		$scope.find = function (ev) {
			var name = ev.split("#");
			if (name.length == 2){
				var url = "http://secret-mesa-1979.herokuapp.com/twitter/search/" + encodeURI(name[1]);
			} else {
				var url = "http://secret-mesa-1979.herokuapp.com/twitter/search/" + encodeURI(name[0]);
			}
			$http.get(url)
				.then(function(data){
					sendMessage(data);
				});
		}
		// Will return to trends home-view.
		$scope.cancel = function () {
			$scope.focus = false;
		}
		// function executed after data has been returned from find search.
		function sendMessage(data){
			var posts = data["data"]["statuses"].slice(0,10);			
			localStorage.setItem("posts", JSON.stringify(posts));
		  var view = new supersonic.ui.View("trends#posts");
		  supersonic.ui.layers.push(view);
		}
  });
