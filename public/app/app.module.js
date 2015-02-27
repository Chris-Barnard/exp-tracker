(function() {
	'use strict';

	angular.module('app',
		/*
		 * Shared components
		 */
		[ 'app.core'
		, 'app.layout'

		/*
		 * Feature Areas
		 */
		, 'app.expenses'
	]);
})();