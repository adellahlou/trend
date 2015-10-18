angular
  .module('trends', ['supersonic'])
  .controller('IndexController', ['$scope', 'PreferencesService', 'RequestsService' function($scope, supersonic, PreferencesService, RequestsService) {
	  	//load user preferences and settings
	  	$scope.promises = {};
	  	intializeUsers();

	    // function for adding news source to search function
		$scope.addNews = SourcesService.toggleSource;

		// Will return to trends home-view.
		$scope.cancel = function () { $scope.focus = false; };
		$scope.find = getNews;

		/**
		*	Logs the user in, puts user into scope, loads the source preferences and trend
		*/
	  	function intializeUser(){
	  		$scope.promises.user = PreferencesService.loginAndGetPreferences({userId: 123456789 });
	  		$scope.promises.user.then(function(user){
	  			$scope.user = user;
				SourcesService.setSelectedSources($scope.user.preferences.defaultSources);
			    $scope.newsSources = SourcesService.getSources();
	    	  	getTrends();
			}, function(error) { 
				supersonic.ui.dialog.alert(error); 
			});
	  	}
	  	
	  	/**
	  	*	Gets trends according to the users current preferences
	  	*/
	  	function getTrends(){
		  	$scope.promises.trends = RequestsService.getTrends($scope.user.preferences.trendPreferences)
		  	$scope.promises.trends
		  		.then(function(data){ $scope.trends = data; }, 
		  			  function(error){ supersonic.ui.dialog.alert(error);});
	  	}
		
	  	/**
	  	* @param ev {String}  is the content of the search bar
		*/
		function getNews(ev) {
			if (typeof ev == 'undefined' || !ev.length) {
				supersonic.ui.dialog.alert("Please enter a search");
				return;
			}

			//show spinner for async and clean search term
			$scope.showSpinner = true;
			var search = encodeURI(ev.replace('#', ''));

			//check if we are on the search
			if ($scope.focus) {
				var request = {sites: SourcesService.getActiveSources().join(','), search: search};
				//TODO: ASK PHILIP WHAT THIS DOES
				request.sites = request.sites.length ? request.sites.slice(0,request.sites.length - 1) : request.sites;
				
				if (request.sites.length !== 0) {
					var p = RequestsService.searchSites(url, request);

					p.then(function(data) {
						$scope.showSpinner = false;
						var view = new supersonic.ui.View("trends#posts");
					  	supersonic.ui.layers.push(view);
					}, function(error){ supersonic.ui.dialog.alert(error);});
				} else {
					$scope.showSpinner = false;
					supersonic.ui.dialog.alert("No sources selected");
				}
			}
		}//end getNews

  }]); // end controller