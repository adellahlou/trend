angular
  .module('trends', ['supersonic'])
  .controller('IndexController', function($scope, supersonic, $http) {
  	// initializing trends from twitter/trends
		$http.get("http://secret-mesa-1979.herokuapp.com/twitter/trends")
			.then(function(data){
				$scope.trends = data.data[0].trends;
	    });
    // initialize the news sources with their properties for css and selection set at a default.
    $scope.news = ["Twitter","9GAG","Bing","Google"].map(function(item){
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
			if (typeof ev == 'undefined' || !ev.length) {
				supersonic.ui.dialog.alert("Please enter a search");
			} else {
				$scope.showSpinner = true;
				var name = ev.split("#");
				if (name.length == 2){
					var search = encodeURI(name[1]);
				} else {
					var search = encodeURI(name[0]);
				}
				var url = "http://secret-mesa-1979.herokuapp.com/search";
				if ($scope.focus) {
					var request = {sites: "", search: search};
					$scope.news.forEach(function(item){
						if (item.name == "Twitter" && item.selected){
							request.sites += "twitter,";
						} else if (item.name == "Google" && item.selected){
							request.sites += "google,";
						} else if (item.name == "9GAG" && item.selected){
							request.sites += "ninegag,";
						} else if (item.name == "Bing" && item.selected){
							request.sites += "bing,";
						}
					});
					request.sites = request.sites.length ? request.sites.slice(0,request.sites.length - 1) : request.sites;
				} else {
					var request = {sites: "twitter,google,ninegag,bing", search: search};
				}
				if (!request.sites.length) {
					$scope.showSpinner = false;
					supersonic.ui.dialog.alert("No sources selected");
				} else {
					$http.post(url, request)
					.then(function(data){
						localStorage.setItem("data", JSON.stringify(data.data));
						$scope.showSpinner = false;
						var view = new supersonic.ui.View("trends#posts");
					  supersonic.ui.layers.push(view);
					});
				}
			}
		}
		// Will return to trends home-view.
		$scope.cancel = function () {
			$scope.focus = false;
		}
  });
