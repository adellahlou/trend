angular
.module('trends', ['supersonic'])
.controller('DrawerController',function($scope, supersonic){

	$scope.testFunc = function(){
  		console.log($scope);
  		console.log($scope.RequestsService);
  	};
	// $scope.SourcesService = null;
  	$scope.RequestsService = null;
  	$scope.PreferencesService = null;

  	// supersonic.bind($scope, 'SourcesService');
  	supersonic.bind($scope, 'RequestsService');
  	supersonic.bind($scope, 'PreferencesService');

  	supsersonic.logger.debug('instantiated DrawerController');

  	
	// var settingsModal = new supersonic.ui.View('trends#profile');
});