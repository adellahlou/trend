angular
.module('trends', ['supersonic'])
.controller('IndexController', function($scope, supersonic, $http) {
  	$scope.showSpinner = false;
  	localStorage.removeItem('user');
	var profileView = new supersonic.ui.View("trends#profile");
	var prefs = PreferencesService();


	supersonic.ui.drawers.init("trends#drawer", {side: "left" });
  	$scope.openDrawer = function(){ 
	    supersonic.ui.drawers.open("left").then( function() {
	    });
	    prefs.logUser();
	};
	$scope.drawerSub = supersonic.data.channel('drawer').subscribe(function(message, reply) {
		
		message = message.split(':');
		var type = message[0],
			value = message[1];


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
			default:
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
			display : 'NPR',
			value : 'npr',
			selected : false,
		},
		{
			display : 'NYT',
			value : 'nyt',
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
	prefs.initialLogin(function(userdata){
		$scope.userdata = userdata; 
		supersonic.logger.debug(userdata);
	});
 //  	// initializing trends from twitter/trends
	// $http.get(baseUrl + '/twitter/trends/23424977').then(function(data){
	// 	$scope.showSpinner = false;
	// 	if(data.data)
	// 		$scope.trends = data.data[0].trends;
	// 	else 
	// 		$scope.trends = [];
	// })

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
			var request = {sites: "twitter,google,ninegag,bing", search: search};
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
		return array;
	}

	function PreferencesService(){
		var user = {};
		var bUrl = "http://secret-mesa-1979.herokuapp.com";

		function createUser(cb){
			$http.post(baseUrl + '/users/')
				.then(function(userdata){
					user = userdata;

					localStorage.setItem('user', JSON.stringify(userdata));
					cb(userdata);
				});
		}

		function loginAndGetPreferences(userid, cb){
			$http.get(bUrl + '/users/' + userid)
				.then(function(userdata){
					localStorage.setItem('user', JSON.stringify(userdata));
					user = userdata;
					cb(userdata);
				});
		}


		function savePreferences(cb){
			$http.put(baseUrl + '/users/' + user.userid)
				.then(cb)
		}


		function initialLogin(cb){
			user = localStorage.getItem('user');

			if(user == undefined){
				user = loadDefaultUser();
				cb(user);
				// createUser(function(userdata){
				// 	localStorage.setItem('user', userdata);
				// 	cb(userdata);
				// });
			}
			else {
				loginAndGetPreferences(luser.userid, cb);
			}
		}	

		function logUser(){
			console.log(user);
		}

		return {
			loginAndGetPreferences : loginAndGetPreferences,
			savePreferences : savePreferences,
			initialLogin : initialLogin,
			logUser : logUser
		};
	};
});

function loadDefaultUser() {
	return {
	    "_id": {
	        "$oid": "fake"
	    },
	    "userid": {
	        "$oid": "562476f714a9d126b4753835"
	    },
	    "age": 18,
	    "subscriptions": [],
	    "preferences": {
	        "trendPreferences": {
	            "trump": [
	                "ninegag"
	            ],
	            "pope": [
	                "bing",
	                "google",
	                "ninegag",
	                "twitter"
	            ]
	        },
	        "searchHistory": []
	    },
	    "lastLogin": {
	        "$date": "2015-10-24T04:34:13.333Z"
	    },
	    "createdOn": {
	        "$date": "2015-10-19T04:52:07.931Z"
	    },
	    "__v": 0
	}
}


// function initializeServices($http, supersonic){


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









