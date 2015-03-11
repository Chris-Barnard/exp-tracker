var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');

var paidto = {
	getPaidToList : getPaidToList
	, getOne : getOne
	, getCommonTags : getCommonTags
}

function getPaidToList (req, res, next) {
	var matchPaidToList = [];
	var textEntered = req.query.text;

	function matchPaidTo (paidToList) {
		if (!paidToList.length) { return res.json(matchPaidToList) };
		var curPaidTo = paidToList.pop();
		matchText = textEntered.toLowerCase();
		if (curPaidTo.toLowerCase().indexOf(matchText) >= 0) { 
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
	res.json(req.expenses);
}

function makePaidToList (next) {
	var paidToList = [];

	Expense.find(function (err, expenses) {
		if (err) { return next(err) };

		expenses.forEach(function (expense, index, array) {
			if (paidToList.indexOf(expense.paidTo) < 0) { paidToList.push(expense.paidTo)} ;
		});

		paidToList.sort();
		return next(null, paidToList);
	})
}

function getCommonTags (req, res, next) {
	var resultTagList = [];
	var finalList = [];

	req.expenses.forEach(function (expense, index, array) {
		expense.tags.forEach(function (tag, index, array) {
			var resultTag = {};
			console.log('tag: ' + tag);
			for (var i = resultTagList.length - 1; i >= 0; i--) {
				if (resultTagList[i].name === tag) {
					console.log('tags match')
					// resultTag.name = tag;
					// resultTag.count = resultTagList[i].count + 1;
					resultTagList[i].count++;
					resultTag = resultTagList[i];
				}
				// } else {
				// 	resultTag.name = null;
				// 	resultTag.count = null;
				// }

				console.log('resultTag.name: ' + resultTag.name);
				console.log('resultTagList[' + i + '].name: ' + resultTagList[i].name);
			};
			if (!resultTag.name) {
				resultTag.name = tag;
				resultTag.count = 1;
			};
			if (resultTag.count === 1) {
				resultTagList.push(resultTag);
			}
			console.log(resultTagList);
		});
	});

	console.log('req.expenses.length: ' + req.expenses.length);

	console.log(resultTagList);

	resultTagList.forEach(function (resultTag, index, array) {
		// threshold for making the frequent tags list
		if (resultTag.count > (req.expenses.length * 0.5555555 )) { finalList.push(resultTag); }
		console.log(' compare resultTag.count VS req.expenses.length ');
		console.log('resultTag.count: ' + resultTag.count);
		console.log('req.expenses.length: ' + req.expenses.length);
	});

	res.json(finalList);
}

module.exports = paidto;