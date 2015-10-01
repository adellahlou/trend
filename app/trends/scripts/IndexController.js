angular
  .module('trends', ['supersonic'])
  .controller('IndexController', function($scope, supersonic, $http) {
  	$scope.trends = null;
		$http.get("http://secret-mesa-1979.herokuapp.com/twitter/trends")
		.then(function(data){
			console.log(data);
			$scope.trends = data.data[0].trends;
    });
    $scope.news = ["Reddit","Twitter","Buzzfeed","9GAG","Facebook","New York Times", "Google","Yahoo"].map(function(item){return {"name":item, "selected": false}});
		$scope.addNews = function (src) {
			src.selected = !src.selected;
		}
		$scope.cancel = function () {
			$scope.focus = false;
		}
		$scope.submit = function () {
			supersonic.logger.info("hi");
		}
  });
