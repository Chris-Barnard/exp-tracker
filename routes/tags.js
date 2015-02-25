var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');

var tags = {
	getOne : function (req, res, next) {
		// uses param middleware
		res.json(req.expenses);
	}
	, getTagList : function (req, res, next) {
		makeLegacyTagList(function (taglistCompleted) {
			res.json(taglistCompleted);
		})
  	}
  	, getNgTagList : function (req, res, next) {
		var ngTagList = []
		  , ngTag = {}
		  , taglist = []
		  , textEntered = req.query.text

		// recursive function to add to ngTagList array
		function makeNgTagList (legacyTagList) {
			if (!legacyTagList.length) { return res.json(ngTagList) };
			var legacyTag = legacyTagList.pop()

			if (legacyTag.search(textEntered) >= 0) {
				ngTagList.push( { text : legacyTag } )
			};
			makeNgTagList(legacyTagList)
		}

		makeLegacyTagList(function (taglistCompleted) {
			taglistCompleted.reverse()
			makeNgTagList(taglistCompleted)
		})
  	}
}

// private function
var makeLegacyTagList = function (next) {
	var taglist = []
	Expense.find(function (err, expenses) {
		if (err) { return next(err); };

		expenses.forEach(function (element, index, array) {
			element.tags.forEach(function (element, index, array) {
				if (taglist.indexOf(element) < 0 && element != '') {
					taglist.push(element);
				};
			});
		});
		
		taglist.sort();
		return next(taglist);
	});
}

module.exports = tags