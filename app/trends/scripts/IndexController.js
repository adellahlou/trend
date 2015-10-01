angular
  .module('trends')
  .controller('IndexController', function($scope, supersonic) {
    $scope.trends = null;
    $scope.news = ["Reddit","Twitter","Buzzfeed","9GAG","Facebook","New York Times", "Google","Yahoo"];
    $scope.news = $scope.news.map(function(item){return {"name":item, "selected": false}});
    supersonic.data.model('twitterGlobalTrends').findAll().then( function(data) {
			$scope.$apply(function (){
				$scope.trends = data;
			});
		});

		$scope.addNews = function (src) {
			src.selected = !src.selected;
		}
		$scope.cancel = function () {
			$scope.focus = false;
		}
		$scope.submit = function () {
			supersonic.data.model('twitterSearch').findAll().then( function(data) {
				supersonic.logger.info(data);
			});
		}
  });
