angular
.module('trends')
.controller('DrawerController', function($scope, supersonic){

	$scope.tryPopup = function(){
		var options = {
		  title: "Please type some text and click on the desired color",
		  buttonLabels: ["Blue", "Red", "Yellow"],
		  defaultText: "Type here"
		};

		supersonic.ui.dialog.prompt("Colorize text", options).then(function(result) {
		  supersonic.logger.log("User clicked button number " + result.buttonIndex + " with text " + result.input);
		});
	};
});