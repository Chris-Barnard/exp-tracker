(function() {
	'use strict';

	angular
		.module('app.expenses')
		.controller('Expenses', Expenses);

	function Expenses (dataservice) {
		var vm = this;
		vm.expenses = [];
		vm.title = 'Expense Tracker';

		activate();

		function activate () {
			return getExpenses()
		}

		function getAllExpenses () {
			return dataservice.getAllExpenses()
				.then(function (data) {
					vm.expenses = data;
					return vm.expenses;
				});
		}
	}
})();