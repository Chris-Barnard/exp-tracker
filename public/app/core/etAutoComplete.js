(function() {
	'use strict';

	angular
		.module('app.core')
		.directive('etAutoComplete', etAutoComplete);

	etAutoComplete.$inject = ['$scope'];

	function etAutoComplete (scope, iElement, iAttrs) {
		iElement.autocomplete(
			{ source : scope[iAttrs.uiItems]
			, select : function () {
				$timeout(function() {
					iElement.trigger('input');
				}, 0);
			}
		});
	}

})()