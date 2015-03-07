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
        	vm.getTodaysDate = function getTodaysDate () { return moment(Date.now()).toDate(); };
			vm.getShowDetail = function getShowDetail () { return showDetail };
			vm.getShowEditBox = function getShowEditBox () { return showEditBox };
			vm.isActive = function isActive(expense) { return vm.activeExpense._id === expense._id };
			vm.loadTags = dataservice.loadTags;
			vm.onExpenseClick = onExpenseClick;
			vm.setActiveExpense = setActiveExpense;


			activate();

			function activate () {
				vm.activeExpense = {};
				showDetail = false;
				vm.allowDelete = false;
				vm.activeExpense.dateInput = getTodaysDate();

				dataservice.getAllExpenses().success(function (data) {
					vm.expenses = data;
				})
			}

			function addExpense () {
				vm.activeExpense.dateEntered = Date.now();
				vm.activeExpense.amount = Number(vm.activeExpense.amount);
				this.expense.tags = [];

				// convert ngTags into legacy tags
				for (var i = 0; i < vm.activeExpense.ngTags.length; i++) {
					vm.activeExpense.tags.push(vm.activeExpense.ngTags[i].text);
				};
				
				vm.activeExpense.entrySource = 'web-app';
				vm.activeExpense.dateIncurred = moment(vm.activeExpense.dateInput).toDate();
				dataservice.createNewExpense(vm.activeExpense).success(function (data) {
					if (data) { activate() };
				})
			}

			function onExpenseClick (expense) {
				if (vm.activeExpense._id === expense._id) {
					showDetail = false;
					vm.activeExpense = {};
					vm.activeExpense.dateInput = getTodaysDate();
				} else {
					showDetail = true;
					setActiveExpense(expense);
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
						if (result.status) {
							activate();
						};
					})
				})
  			}

  			function setActiveExpense (expenseToSet) {
  				vm.activeExpense = expenseToSet;
  				vm.activeExpense.dateInput = moment(expenseToSet.dateIncurred).toDate();

  			}
	        
		}
	}
})();
