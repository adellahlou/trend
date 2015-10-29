angular
.module('trends')
.controller('ProfileController', function($scope, supersonic) {
	$scope.init = function () {
		$scope.loadUser();
	}
	$scope.loadUser = function() {
		$scope.user = JSON.parse(localStorage.getItem('user'));

		if(!$scope.user)
			$scope.loadDefaultUser();
	}

	$scope.loadDefaultUser =  function() {
		$scope.user = {
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

	$scope.editTrendPreference = function(key){
		var options = {
		  title: "Please type some text and click on the desired color",
		  buttonLabels: ["Blue", "Red", "Yellow"],
		  defaultText: "Type here"
		};

		supersonic.ui.dialog.prompt("Colorize text", options).then(function(result) {
		  supersonic.logger.log("User clicked button number " + result.buttonIndex + " with text " + result.input);
		});
	}

	function updateUser(){
		;
	}
});