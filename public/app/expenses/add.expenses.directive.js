(function() {
	'use strict';

	angular
		.module('app.expenses')
		.directive('etAddExpensesTab', addExpensesTab)

	function addExpensesTab () {
		var directive = {
			restrict : 'EA'
			, templateUrl : 'app/expenses/add.expenses.directive.html'
			, controller : AddExpensesTabController
			, controllerAs : 'vm'
			, bindToController : true
		};

		return directive;

		function AddExpensesTabController () {
			var vm = this;

		}
	}
})();