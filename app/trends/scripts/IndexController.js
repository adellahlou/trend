angular
  .module('trends', ['supersonic'])
  .controller('IndexController', function($scope, supersonic, $http) {
  	// initializing trends from twitter/trends
		$http.get("http://secret-mesa-1979.herokuapp.com/twitter/trends")
			.then(function(data){
				$scope.trends = data.data[0].trends;
	    });
    // initialize the news sources with their properties for css and selection set at a default.
    $scope.news = ["Twitter","9GAG"].map(function(item){
    	if (item == "9GAG") {
    		return {"name": item, "css": "GAG", "selected": false}
    	} else if (item == "New York Times") {
    		return {"name": item, "css": "NYT", "selected": false}
    	}else {
	    	return {"name": item, "css": item, "selected": false}
	    }
    });
    // ["Reddit","Twitter","Buzzfeed","9GAG","Facebook","Google","Yahoo","New York Times"]
    // function for adding news source to search function
		$scope.addNews = function (src) {
			src.selected = !src.selected;
		}
		// ev is a search term. Function will split on # if it exists if not append search to url.
		$scope.find = function (ev) {
			var name = ev.split("#");
			if (name.length == 2){
				var search = encodeURI(name[1]);
			} else {
				var search = encodeURI(name[0]);
			}
			var url = "http://secret-mesa-1979.herokuapp.com/twitter/search/" + search;
			$http.get(url)
				.then(function(data){
					var posts = data["data"]["statuses"].slice(0,10);			
					localStorage.setItem("twitter", JSON.stringify(posts));
					nineGag(search);
				});
		}
		// Will return to trends home-view.
		$scope.cancel = function () {
			$scope.focus = false;
		}
		// Get results from google end point of api
		function nineGag(search){
			var url = "http://secret-mesa-1979.herokuapp.com/nineGag/search/" + search;
			$http.get(url)
				.then(function(data){
					var posts = data["data"]["result"];
					localStorage.setItem("nineGag", JSON.stringify(posts));
				  var view = new supersonic.ui.View("trends#posts");
				  supersonic.ui.layers.push(view);
				});
		}
  });
