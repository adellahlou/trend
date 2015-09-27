angular
  .module('trends')
  .controller('IndexController', function($scope, supersonic) {
    $scope.trends = null;
    supersonic.data.model('twitterGlobalTrends').findAll().then( function(trends) {
			$scope.$apply(function (){
				$scope.trends = trends
			});
		});
  });
