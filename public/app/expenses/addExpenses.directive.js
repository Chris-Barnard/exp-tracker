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
			// var showEditBox = false;

			vm.activeExpense = {};
			vm.addExpense = addExpense;
			vm.allowDelete = false;
			vm.expenses = [];
        	vm.getActiveExpense = getActiveExpense;
        	vm.getPaidToList = getPaidToList;
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
				vm.activeExpense.dateInput = vm.getTodaysDate();

				dataservice.getAllExpenses().success(function (data) {
					vm.expenses = data;
				})
			}

			function addExpense () {
				vm.activeExpense.dateEntered = Date.now();
				vm.activeExpense.amount = Number(vm.activeExpense.amount);
				vm.activeExpense.tags = [];

				// convert ngTags into legacy tags
				for (var i = 0; i < vm.activeExpense.ngTags.length; i++) {
					vm.activeExpense.tags.push(vm.activeExpense.ngTags[i].text);
				};
				
				vm.activeExpense.entrySource = 'web-app';
				// if it is a transactionType undefined then it is the default of 'pinnen'
				if (!vm.activeExpense.transactionType) { vm.activeExpense.transactionType = 'pinnen' };

				// it I used an existing expense as a template I don't want a duplicate id error
				vm.activeExpense._id = null;
				vm.activeExpense.dateIncurred = moment(vm.activeExpense.dateInput).toDate();
				dataservice.createNewExpense(vm.activeExpense).success(function (data) {
					if (data) { activate() };
				})
			}

			function onExpenseClick (expense) {
				if (vm.activeExpense._id === expense._id) {
					showDetail = false;
					vm.activeExpense = {};
					vm.activeExpense.dateInput = vm.getTodaysDate();
				} else {
					showDetail = true;
					vm.setActiveExpense(expense);
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

  			function getPaidToList (textEntered) {
  				return dataservice.getPaidToList(textEntered)
  					.then(function (response) {
  						$log.log(response);
  						var list = [];

  						for (var i = 0; i < response.data.length; i++) {
  							list.push(response.data[i]);
  						};

  						return list;
  					})
  			}
	        
		}
	}
})();
