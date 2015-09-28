angular
  .module('trends')
  .controller('IndexController', function($scope, supersonic) {
    $scope.trends = null;
    $scope.news = ["Reddit","Twitter","Buzzfeed","9GAG","Facebook","New York Times", "Google","Yahoo"];
    $scope.news = $scope.news.map(function(item){return {"name":item, "selected": false}});
    supersonic.data.model('twitterGlobalTrends').findAll().then( function(trends) {
			$scope.$apply(function (){
				$scope.trends = trends
			});
		});
		$scope.addNews = function (src) {
			src.selected = !src.selected;
		}
		$scope.cancel = function () {
			supersonic.logger.info("hi");
			$scope.focus = false;
		}
  });
