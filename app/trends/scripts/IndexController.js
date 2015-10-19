var PreferencesService, RequestsService, SourcesService;

angular
.module('trends', ['supersonic'])
.controller('IndexController', function($scope, supersonic, $http) {
  	initializeServices($http);

  	 // initialize the news sources with their properties for css and selection set at a default.
    $scope.news = SourcesService.getSources();

  	// Will return to trends home-view.
	$scope.cancel = function () { $scope.focus = false; }

  	// initializing trends from twitter/trends
	$http.get("http://secret-mesa-1979.herokuapp.com/twitter/trends")
		.then(function(data){
			$scope.trends = data.data[0].trends;
    });
	// RequestsService.getTrends(function(data){ 
	// 	$scope.trends = data.data[0].trends;
 //    });
   
	// function for adding news source to search function
	$scope.addNews = SourcesService.toggleSource;


	// ev is a search term. Function will split on # if it exists if not append search to url.
	$scope.find = function (ev) {
		if (typeof ev == 'undefined' || !ev.length) {
			supersonic.ui.dialog.alert("Please enter a search");
		} 

		$scope.showSpinner = true;
		var search = ev.replace('#', '');
		
		if ($scope.focus) 
			var request = {sites: SourcesService.getSelectedSources().join(','), search: search};
		else 
			var request = {sites: "twitter,google,ninegag,bing", search: search};

		if (!request.sites.length) {
			$scope.showSpinner = false;
			supersonic.ui.dialog.alert("No sources selected");
		} else {
			RequestsService.searchSites(request, function(data){
				localStorage.setItem("data", JSON.stringify(data.data));
				$scope.showSpinner = false;
				var view = new supersonic.ui.View("trends#posts");
			  supersonic.ui.layers.push(view);
			});
		}
	}
	
	
});


function initializeServices($http){
	PreferencesService = (function(){
		var settings = {};
		var user = {};
		var baseUrl = "http://secret-mesa-1979.herokuapp.com";

		function createUser(cb){
			$http.post(baseUrl + '/users/')
				.then(function(data){
					user = data;
					cb();
				});
		}

		function loginAndGetPreferences(userid, cb){
			$http.get(baseUrl + '/users/' + userid)
				.then(cb);
		}


		function savePreferences(cb){
			$http.put(baseUrl + '/users/' + user.userid)
				.then(cb)
		}


		function initialLogin(userid, cb){
			loginAndGetPreferences(userdid, function(data){
				console.log(data);
				settings = data;
				user = data;
			}).then(cb);
		}	

		return {
			loginAndGetPreferences : loginAndGetPreferences,
			savePreferences : savePreferences,
			initialLogin : initialLogin
		};
	})();


	RequestsService = (function(){
		var baseUrl = "http://secret-mesa-1979.herokuapp.com";

		/**
		*
		*/
		function getTrends(request, cb){ 
			// defaults to global trends
			if (request){
				var trendUrl = baseUrl + (request.default ?  '/twitter/trends' : '/search');

				$http.get(trendUrl, request)
				.then(cb)
			}
		}//end getTrends


		/**
		*
		*/
		function searchSites(request, cb){
			if (!request === 0)
				return {};

			var searchUrl = baseUrl + '/search';

			$http.post(searchUrl, request)
				.then(cb);
		} // end searchSite
	})();



	SourcesService = (function(){
		//default values
		var sites = {
			twitter: {
				display : 'Twitter',
				value : 'twitter',
				selected : false,
			}, 
			ninegag: {
				display : '9gag',
				value : 'ninegag',
				selected : false,
			}, 
			nyt : {
				display : 'NYT',
				value : 'nyt',
				selected : false,
			} , 
			bing : {
				display : 'Bing',
				value : 'bing',
				selected : false,
			}, 
			google : {
				display : 'Google',
				value : 'google',
				selected : false,
			}, 
			npr : {
				display : 'NPR',
				value : 'npr',
				selected : false,
			}
		};


		// function setSelectedSources(srcs){
		// 	if(typeof srcs === 'object'){

		// 	} else if(typeof srcs ==='array')
		// }

		function toggleSource(src){
			sites[src.value].selected = !sites[src.value].selected;
		}

		function getSources(){
			var siteKeys = Object.keys(sites);
			var ret = [];
			siteKeys.forEach(function(key){
				ret.push(sites[key]);
			})

			return ret;
		}

		function getSelectedSources(){
			var siteKeys = Object.keys(sites);
			var ret = [];
			for(key in siteKeys){
				if(sites[key].selected)
					ret.push(sites[key].value);
			}

			return ret;
		}

		return {
			getSelectedSources : getSelectedSources,
			getSources: getSources,
			// setSelectedSources : setSelectedSources,
			toggleSource : toggleSource
		};
	})();	

};









