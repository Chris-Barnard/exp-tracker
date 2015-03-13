(function() {
	'use strict';

	angular
		.module('app.expenses')
		.directive('etReviewTaggedExpensesTab', ['ModalService', 'dataservice', '$log', reviewTaggedExpensesTab]);

	function reviewTaggedExpensesTab () {
		var directive = {
			restrict : 'EA'
			, templateUrl : 'app/expenses/reviewTaggedExpenses.directive.html'
			, controller : ReviewTaggedExpensesTabController
			, controllerAs : 'vmTag'
			, bindToController : true
		};

		return directive;

		function ReviewTaggedExpensesTabController (ModalService, dataservice, $log) {
			var vmTag = this;

			vmTag.activate = activate;
			vmTag.editExpense = editExpense;
			vmTag.expenses = [];
			vmTag.setStatus = setStatus;
			vmTag.tagList = [];
			vmTag.totalExpenses = 0;

			activate();

			function activate () {
				vmTag.tagList = [];
				

				dataservice.getTagList()
					.success(function (data) {
						data.forEach(function (element, index, array) {
							var tag = {};
							tag.name = element;
							tag.status = false;
							tag.activeTag = false;
							vmTag.tagList.push(tag);
						})
					})
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
			};

			function setStatus (tagName, clickFlag) {
				vmTag.tagList.forEach(function (tag, index, array) {
					if (tag.name === tagName && tag.status === false) {
						tag.status = true;
						if (!clickFlag) { tag.activeTag = true }
					} else {
						if (tag.name === tagName && tag.status === true) {
							tag.status = false;
							if (!clickFlag) { tag.activeTag = false }
						}
					}
				});
				onTagSelect();
			};

			// Changes the tag status as well as it's activeTag parameter
			function loadTag (tagName) {
				vmTag.setStatus(tagName, false);
			};

			function onTagSelect () {
				vmTag.expenses = [];
				vmTag.totalExpenses = 0;
				var safeToAdd = true;
				// for each selected tag in vmTag.tagList we want to add the
				// relevant expenses
				vmTag.tagList.forEach(function (tag, index, array) {
					if (tag.status) {
						dataservice.getExpensesForTag(tag.name)
							.success(function (expenses) {
								if (!expenses) { activate(); };
								// if we have more than one expense we want to 
								// add each one
								if (expenses.length > 0) {
									expenses.forEach(function (expense, index, array) {
										// reset safeToAdd for new expense
										safeToAdd = true;

										// make sure it doesn't already exist in vmTag.expenses
										for (var i = vmTag.expenses.length - 1; i >= 0; i--) {
											if (vmTag.expenses[i]._id === expense._id) { safeToAdd = false }
										};
										if (safeToAdd) {
											vmTag.expenses.push(expense);
											vmTag.totalExpenses += expense.amount;
										}

									});
								}
							});
					}
				});
			};

		}
	};

})();