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
			, createNewExpense : createNewExpense

			, getOneExpense : getOneExpense
			, editOneExpense : editOneExpense
			, deleteOneExpense : deleteOneExpense

			, getTagList : getTagList
			, loadTags : loadTags

			, getPaidToList : getPaidToList
			, getCommonTags : getCommonTags

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
		 * POST /expenses
		 */
		function createNewExpense (exp) {
			return $http.post(baseURL + '/expenses', exp)
		}

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
		 function getPaidToList (query) {
		 	return $http.get(baseURL + '/expenses/paidtolist?text=' + query);
		 }
		 function getCommonTags (paidToName) {
		 	return $http.get(baseURL + '/expenses/paidto/' + paidToName + '/getcommontags');
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
