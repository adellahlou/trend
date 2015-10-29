angular
.module('trends', ['supersonic'])
.controller('IndexController', function($scope, supersonic, $http) {
  	$scope.showSpinner = true;
  	var options = {side: "left" };
	supersonic.ui.drawers.init("trends#drawer", options);

	var profileView = new supersonic.ui.View("trends#profile");

  	$scope.openDrawer = function(){ 
	    supersonic.ui.drawers.open("left").then( function() {
        	// supersonic.logger.debug("Drawer was shown");
	    });
	};

	$scope.drawerSub = supersonic.data.channel('drawer').subscribe(function(message, reply) {
		message = message.split(':');
		var type = message[0],
			value = message[1];

		console.log(type);
		console.log(value);

		switch(type) { 
			case "home":
				supersonic.ui.drawers.close('left');
				break;
			case "search":
				break;
			case "profile":
				supersonic.ui.drawers.close('left');
				supersonic.ui.modal.show(profileView, {animate: true});
				break;
		}

		supersonic.ui.dialog.alert(message);
	});

	var baseUrl = "http://secret-mesa-1979.herokuapp.com";
  	// initialize the news sources with their properties for css and selection set at a default.
    $scope.news = [
		{
			display : 'Twitter',
			value : 'twitter',
			selected : false,
		},
		{
			display : 'Bing',
			value : 'bing',
			selected : false,
		},
		{
			display : '9gag',
			value : 'ninegag',
			selected : false,
		},
		{
			display : 'Reddit',
			value : 'reddit',
			selected : false,
		},
		{
			display : 'Google',
			value : 'google',
			selected : false,
		}
	];

  	// Will return to trends home-view.
	$scope.cancel = function () { $scope.focus = false; }

  	// initializing trends from twitter/trends
	$http.get(baseUrl + '/twitter/trends/23424977').then(function(data){
		$scope.showSpinner = false;
		$scope.trends = data.data[0].trends;
	})

	// function for adding news source to search function
	$scope.addNews = function(src){ src.selected = !src.selected; }

	// ev is a search term. Function will split on # if it exists if not append search to url.
	$scope.find = function (ev) {
		if (typeof ev == 'undefined' || !ev.length) {
			supersonic.ui.dialog.alert("Please enter a search");
		} 

		// PreferencesService.initialLogin('562476f714a9d126b4753835');

		$scope.showSpinner = true;
		var search = ev.replace('#', '');
		
		if ($scope.focus) 
			var request = {sites: getSelectedSources(), search: search};
		else 
			var request = {sites: "twitter,google,ninegag,bing,reddit", search: search};
			$scope.news.forEach(function(data){data.selected = true;});

		if (!request.sites.length) {
			$scope.showSpinner = false;
			supersonic.ui.dialog.alert("No sources selected");
		} else {
			searchSites(request, function(data){
				var posts = parseData(data.data);
				var data = [posts, $scope.news];
				localStorage.setItem("data", JSON.stringify(data));
				$scope.showSpinner = false;
				var view = new supersonic.ui.View("trends#posts");
				supersonic.ui.layers.push(view);
			});
		}
	}

	// pushes every selected source into a return array to query
	getSelectedSources = function () {
		ret = [];
		$scope.news.forEach(function(data){
			if (data.selected) {
				ret.push(data.value);
			}
		});
		return ret.join(',');
	}

	// send search request
	searchSites = function (request, cb) {
		if (!request === 0)
			return {};

		var searchUrl = baseUrl + '/search';

		$http.post(searchUrl, request)
			.then(cb);
	}

	// this generalizes source information for displaying cards
	parseData = function (data) {
		array = [];
		if (data.bing) {
			data.bing.forEach(function(data){
				data.source = "bing";
				data.visibility = true;
				array.push(data);
			});
		}
		if (data.google) {
			data.google.forEach(function(data){
				data.source = "google";
				data.visibility = true;
				array.push(data);
			});
		}
		if (data.ninegag) {
			data.ninegag.result.forEach(function(data){
				data.source = "ninegag";
				data.visibility = true;
				array.push(data);
			});
		} 
		if (data.twitter) {
			data.twitter.statuses.forEach(function(data){
				data.source = "twitter";
				data.visibility = true;
				data.date = data.created_at;
				array.push(data);
			});
		}
		if (data.reddit) {
			data.reddit.data.children.forEach(function(data){
				data.source = "reddit";
				data.visibility = true;
				data.date = Date(data.data.created);
				array.push(data);
			});
		}
		return array;
	}
});


// function initializeServices($http, supersonic){
// 	PreferencesService = (function(){
// 		var user = {};
// 		var baseUrl = "http://secret-mesa-1979.herokuapp.com";

// 		function createUser(cb){
// 			$http.post(baseUrl + '/users/')
// 				.then(function(data){
// 					user = data;
// 					cb();
// 				});
// 		}

// 		function loginAndGetPreferences(userid, cb){
// 			$http.get(baseUrl + '/users/' + userid)
// 				.then(cb);
// 		}


// 		function savePreferences(cb){
// 			$http.put(baseUrl + '/users/' + user.userid)
// 				.then(cb)
// 		}


// 		function initialLogin(userid, cb){
// 			loginAndGetPreferences(userid, function(data){
// 				if(data.status === 200){
// 					user = data.data;
// 					console.log(user);
// 				}
// 			}).then(cb);
// 		}	

// 		return {
// 			loginAndGetPreferences : loginAndGetPreferences,
// 			savePreferences : savePreferences,
// 			initialLogin : initialLogin
// 		};
// 	})();


// 	RequestsService = (function(){
// 		var baseUrl = "http://secret-mesa-1979.herokuapp.com";

// 		/**
// 		*
// 		*/
// 		function getTrends(request, cb){ 
// 			// defaults to global trends
// 			if (request){
// 				var trendUrl = baseUrl + (request.default ?  '/twitter/trends/23424977' : '/search');

// 				$http.get(trendUrl, request)
// 				.then(cb)
// 			}
// 		}//end getTrends


// 		/**
// 		*
// 		*/
// 		function searchSites(request, cb){
// 			if (!request === 0)
// 				return {};

// 			var searchUrl = baseUrl + '/search';

// 			$http.post(searchUrl, request)
// 				.then(cb);
// 		} // end searchSite

// 		return {
// 			searchSites : searchSites,
// 			getTrends : getTrends
// 		};
// 	})();



// 	SourcesService = (function(){
		 

// 		function getSelectedSources(){
// 			var siteKeys = Object.keys(sites);
// 			var ret = [];
// 			for(key in siteKeys){
// 				if(sites[key].selected)
// 					ret.push(sites[key].value);
// 			}

// 			return ret;
// 		}

// 		return {
// 			getSelectedSources : getSelectedSources,
// 			getSources: getSources,
// 			// setSelectedSources : setSelectedSources,
// 			toggleSource : toggleSource
// 		};
// 	})();	

// };









