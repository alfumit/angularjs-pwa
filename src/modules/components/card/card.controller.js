(function () {
	'use strict';
	angular.module('Card')
	.controller('cardController', cardController);
	
	function cardController() {
		let ctrl = this;
		ctrl.$onInit = () => {
			alert('Controller active');
		}
	}
})();
