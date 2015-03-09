var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');

var paidto = {
	getPaidToList : getPaidToList
	, getOne : getOne
}

function getPaidToList (req, res, next) {
	var matchPaidToList = [];
	var textEntered = req.query.text;

	function matchPaidTo (paidToList) {
		if (!paidToList.length) { return res.json(matchPaidToList) };
		var curPaidTo = paidToList.pop();
		console.log(curPaidTo);
		console.log(curPaidTo.search(textEntered));
		if (curPaidTo.search(textEntered) >= 0) { 
			matchPaidToList.push(curPaidTo)
		};
		matchPaidTo(paidToList);
	}

	makePaidToList(function (err, paidToList) {
		matchPaidTo(paidToList);
	})
}

function getOne (req, res, next) {
	// uses param middleware
	res.json(req.expenses)
}

function makePaidToList (next) {
	var paidToList = [];

	Expense.find(function (err, expenses) {
		if (err) { return next(err) };

		expenses.forEach(function (element, index, array) {
			if (paidToList.indexOf(element.paidTo) < 0) { paidToList.push(element.paidTo)} ;
		});

		paidToList.sort();
		return next(null, paidToList);
	})
}

module.exports = paidto;