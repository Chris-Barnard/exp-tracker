(function() {
	'use strict';

	angular
		.module('app.modals')
		.controller('expEditModalController', ['$log', '$element', 'dataservice', 'expId', 'close', expEditModalController]);

	function expEditModalController($log, $element, dataservice, expId, close) {
		var vm = this;
		
		vm.activeExpense = {};
		vm.allowDelete = false;
		vm.closeModal = closeModal;
		vm.deleteActiveExpense = deleteActiveExpense;
		vm.editActiveExpense = editActiveExpense;
		vm.loadTags = dataservice.loadTags;
		
		activate();

		function activate () {
			dataservice.getOneExpense(expId)
				.success(function (expense) {
					vm.activeExpense = expense;
					vm.activeExpense.dateInput = moment(vm.activeExpense.dateIncurred).toDate();
					vm.allowDelete = false;
				})
		}

		function editActiveExpense () {
			vm.activeExpense.tags = [];
			// convert ngTags into legacy tags
			for (var i = 0; i < vm.activeExpense.ngTags.length; i++) {
				vm.activeExpense.tags.push(vm.activeExpense.ngTags[i].text)
			}
			vm.activeExpense.dateIncurred = moment(vm.activeExpense.dateInput).toDate();
			vm.activeExpense.amount = Number(vm.activeExpense.amount);
			dataservice.editOneExpense(vm.activeExpense)
				.success(function (data) {
					var result = {};
					
					result.data = data;
					result.status = 200;
					close(result, 500);
				})
		}

		function deleteActiveExpense () {
			dataservice.deleteOneExpense(vm.activeExpense._id)
				.success(function (data) {
					var result = {};
					
					result.data = data;
					result.status = 200;
					close(result, 500);
				})
		}

		function closeModal () {
			var result = {};
				
			result.data = null;
			result.status = 0;
			close(result, 500);
		}

	}
})();