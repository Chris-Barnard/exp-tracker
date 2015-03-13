(function() {
	'use strict';

	angular
		.module('app.expenses')
		.directive('etReviewMonthlyExpensesTab', ['ModalService', 'dataservice', '$log', reviewMonthlyExpensesTab]);

	function reviewMonthlyExpensesTab () {
		var directive = {
			restrict : 'EA'
			, templateUrl : 'app/expenses/reviewMonthlyExpenses.directive.html'
			, controller : ReviewMonthlyExpensesTabController
			, controllerAs : 'vmMonth'
			, bindToController : true
		};

		return directive;

		function ReviewMonthlyExpensesTabController (ModalService, dataservice, $log) {
			var vmMonth = this;
			// use 2 lines to set curMonth to the first day of the current month
			var curMonth = moment();
			curMonth = moment({y: curMonth.year(), M: curMonth.month(), d: 1});

			vmMonth.activate = activate;
			vmMonth.dateString = curMonth.format('YYYY-MM-DD');
			vmMonth.editExpense = editExpense;
			vmMonth.expenses = [];
			vmMonth.headerString = 'Current Month';
			vmMonth.loadMonth = loadMonth;

			activate();

			function activate () {
				vmMonth.expenses = [];
				vmMonth.totalExpenses = 0;

				dataservice.getExpensesForMonth(vmMonth.dateString)
					.success(function (expenses) {
						vmMonth.expenses = expenses;

						vmMonth.expenses.forEach(function (expense, index, array) {
							vmMonth.totalExpenses += expense.amount;
						})
					});
			};

			function loadMonth (monthString) {
				var displayMonth = moment(curMonth);

				if (monthString === 'Current') {
					vmMonth.dateString = displayMonth.format('YYYY-MM-DD');
					vmMonth.headerString = 'Current Month';

					activate();
				}
				if (monthString === 'Prior') {
					vmMonth.dateString = displayMonth.subtract(1,'month').format('YYYY-MM-DD');
					vmMonth.headerString = 'Prior Month';

					activate();
				}
			};

			function editExpense (id) {
				ModalService.showModal(
					{ templateUrl : "app/modals/expEditModal.html"
					, controller : "expEditModalController"
					, controllerAs : 'vm'
					, inputs : {
						expId : id
					}
				}).then(function (modal) {
					modal.element.modal();
					modal.close.then(function (result) {
						if (result.status) {
							activate();
						};
					})
				})
			}
		}
	}

})();