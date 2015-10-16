angular
	.module('trends', [])
	.factory('PreferencesService', ['$http', '$q', function($http, $q){

		var settings = {};
		var baseUrl = "http://secret-mesa-1979.herokuapp.com";


		function loginAndGetPreferences(user, pass){
			var deferred = $q.defer();

			$http.get(baseUrl + '/user/login')
				.then(function(data){
					if(!data.error){
						deferred.resolve(data)
					} else
						deferred.reject(data.error);
				});

			return deferred.promise;
		}


		function savePreferences(){
			var deferred = $q.defer();

			$http.get(baseUrl + '/user/save?' + settings.user.token)
				.then(function(response){
					if(!response.error)
						deferred.resolve(response);
					else
						deferred.reject(response.error);
				});

			return deferred.promise;
		}

		return {
			loginAndGetPreferences : loginAndGetPreferences,
			savePreferences : savePreferences
		};
}]);
