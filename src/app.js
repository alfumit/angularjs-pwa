(function () {
	angular.module('a-pwa', ['ui.router', 'oc.lazyLoad'])
	.controller('Main', Main);
	
	Main.$inject = ['$ocLazyLoad'];
	
	function Main($ocLazyLoad) {
		
		$ocLazyLoad('/modules/components/card/card.module.js');
		alert('hey');
	}
})();
