angular
	.module('trends', [])
	.factory('SourcesService', [function(){


	//default values
	var sites = {
		twitter: {
			display : 'Twitter',
			value : 'twitter',
			selected : false,
		}, 
		ningag: {
			display : '9gag',
			value : 'ninegag',
			selected : false,
		}, 
		nyt : {
			display : 'NYT',
			value : 'nyt',
			selected : false,
		} , 
		bing : {
			display : 'Bing',
			value : 'bing',
			selected : false,
		}, 
		google : {
			display : 'Google',
			value : 'google',
			selected : false,
		}, 
		npr : {
			display : 'NPR',
			value : 'npr',
			selected : false,
		}
	};


	function setSelectedSources(srcs){

	}

	function toggleSource(src){
		sites[site].selected = !sites[site].selected;
	}
}]);