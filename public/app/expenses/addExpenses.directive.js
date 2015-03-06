(function() {
	'use strict';

	angular
		.module('app.expenses')
		.directive('etAddExpensesTab', ['ModalService', 'dataservice', '$log', addExpensesTab])

	function addExpensesTab () {
		var directive = {
			restrict : 'EA'
			, templateUrl : 'app/expenses/addExpenses.directive.html'
			, controller : AddExpensesTabController
			, controllerAs : 'vm'
			, bindToController : true
		};

		return directive;

		function AddExpensesTabController (ModalService, dataservice, $log) {
			var vm = this;
			var showDetail = false;
			var showEditBox = false;

			vm.activeExpense = {};
			vm.addExpense = addExpense;
			vm.allowDelete = false;
			vm.expenses = [];

        	vm.getActiveExpense = getActiveExpense;
			vm.getShowDetail = function getShowDetail () { return showDetail };
			vm.getShowEditBox = function getShowEditBox () { return showEditBox };
			vm.isActive = function isActive(expense) { return vm.activeExpense._id === expense._id };
			// vm.loadTags = dataservice.loadTags;
			vm.onExpenseClick = onExpenseClick;


			activate();

			function activate () {
				vm.activeExpense = {};
				showDetail = false;
				vm.allowDelete = false;

				dataservice.getAllExpenses().success(function (data) {
					vm.expenses = data;
				})
			}

			function addExpense () {  }

			function onExpenseClick (expense) {
				if (vm.activeExpense._id === expense._id) {
					showDetail = false;
					vm.activeExpense = {};
				} else {
					showDetail = true;
					vm.activeExpense = expense;
				}
			}

			function getActiveExpense (id) {
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
						activate();
					})
				})
  			}

	        
		}
	}
})();
