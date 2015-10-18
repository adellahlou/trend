angular
	.module('trends', [])
	.factory('RequestsService', ['$http', '$q', function($http, $q){

		var baseUrl = "http://secret-mesa-1979.herokuapp.com";

		/**
		*
		*/
		function getTrends(request, callback){ 
			// defaults to global trends
			var df = $q.defer();

			if (request){
				var trendUrl = baseUrl + (request.default ?  '/twitter/trends' : '/search');

				$http.get(trendUrl, request)
				.then(function(data){
					if(!data.error){
						localStorage.setItem('trends', JSON.stringify(data.data[0].trends));
						df.resolve(data.data[0].trends);
					} else {
						df.reject(data.error);
					}
				});
			}

			return df.promise;
		}//end getTrends


		/**
		*
		*/
		function searchSites(request){
			if (!request === 0)
				return {};

			var df = $q.defer();
			var searchUrl = baseUrl + '/search';

			$http.post(searchUrl, request)
				.then(function(data) {
					if(!data.error) {
						localStorage.setItem("data", JSON.stringify(data.data));
						df.resolve('success');
					} else {
						df.reject(data.error);
					}
				});

			return df.promise;
		} // end searchSite
}]);