(function() {
	'use strict';

	angular.module('app',
		/*
		 * Shared components
		 */
		[ 'app.core'
		, 'app.widgets'

		/*
		 * Feature Areas
		 */
		 , 'app.expenses'
	]);
})();