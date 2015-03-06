(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', dataservice);

	dataservice.$inject = ['$http'];

	function dataservice($http) {
		var baseURL = 'http://localhost:3000';
		var service = {
			getAllExpenses : getAllExpenses

			, getOneExpense : getOneExpense
			, editOneExpense : editOneExpense
			, deleteOneExpense : deleteOneExpense

			, getTagList : getTagList
			, loadTags : loadTags

			, getExpensesForTag : getExpensesForTag
			, getExpensesForMonth : getExpensesForMonth
		};

		return service;
		/*
		 * GET all expenses
		 */
		function getAllExpenses () {
			return $http.get(baseURL + '/expenses');
		};

		/*
		 * Requests for specific resource
		 */
		function getOneExpense (id) {
			return $http.get(baseURL + '/expenses/' + id);
		};

		function editOneExpense (exp) {
			return $http.put(baseURL + '/expenses/' + exp._id, exp);
		};

		function deleteOneExpense (id) {
			return $http.delete(baseURL + '/expenses/' + id);
		};

		/*
		 * GET the taglist resources
		 */
		function getTagList () {
			return $http.get(baseURL + '/expenses/taglist');
		};
		function loadTags (query) {
			return $http.get('/expenses/ngtaglist?text=' + query);
		}

		/*
		 * GET to custom query endpoints
		 */
		function getExpensesForTag (tagName) {
			return $http.get(baseURL + '/expenses/tag/' + tagName);
		};

		function getExpensesForMonth (monthTxt) {
			return $http.get(baseURL + '/expenses/month/' + monthTxt);
		};
	}

})();
