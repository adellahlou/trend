angular
  .module('trends', ['supersonic'])
  .controller('IndexController', ['$scope', 'PreferencesService', 'RequestsService' function($scope, supersonic, PreferencesService, RequestsService) {

	  	//load user preferences and settings
	  	$scope.promises = {};
	  	intializeUsers();
	  	initializeTrends();


	    // function for adding news source to search function
		$scope.addNews = SourcesService.toggleSource;

		// Will return to trends home-view.
		$scope.cancel = function () {
			$scope.focus = false;
		}




	  	function intializeUsers(){
	  		$scope.promises.user = PreferencesService.loginAndGetPreferences({user: test123})
	  		.then(function(user){
	  			$scope.user = user;
	  			initializeTrends();
	  		}, function(error){
	  			alert(error);
	  		});
	  	}
	  	

	  	function initializeTrends(){
	  		// initializing trends 
		  	RequestsService.getTrends($scope.user.preferences.trendPreferences)
		  		.then(function(data){
		  			$scope.trends = data; 
		  		}, function(error){
			  		alert(error);		
		  		});
	  	}

			
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

  }]); // end controller
	







/*
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
*/


