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
		ninegag: {
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
		if(typeof srcs === 'object'){

		} else if(typeof srcs ==='array')
	}

	function toggleSource(src){
		sites[site].selected = !sites[site].selected;
	}

	function getSources(){
		return sites;
	}

	function getSelectedSources(){
		var siteKeys = Object.getKeys(sites);
		var ret = [];
		for(key in siteKeys){
			if(sites[key].selected)
				ret.push(sites[key])''
		}

		return ret;
	}

	return {
		getSources: getSources,
		setSelectedSources : setSelectedSources,
		toggleSource : toggleSource
	};
}]);