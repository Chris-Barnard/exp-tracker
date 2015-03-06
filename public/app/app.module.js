(function() {
	'use strict';

	angular.module('app',
		/*
		 * Shared components
		 */
		[ 'app.core'
		, 'app.layout'
		, 'app.modals'
		/*
		 * Feature Areas
		 */
		, 'app.expenses'
	]);
})();