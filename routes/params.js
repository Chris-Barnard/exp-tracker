var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var moment = require('moment')

var params = {
	expense : function (req, res, next, id) {
		var query = Expense.findById(id);

		query.exec(function (err, expense) {
			if (err) { return next(err); };
			if (!expense) { return next(new Error("cannot find expense")); };

			req.expense = expense;
			return next();
		});
  	}
  	, month : function (req, res, next, dateInputTxt) {
		var dateInput = moment(dateInputTxt);
		var dateStart = moment(
			{ y : dateInput.year()
			, M: dateInput.month()
			, d: 1 }
		);
		var dateEnd = moment(dateStart);
		dateEnd.add(1,'months');

		var query = Expense.find(
			{ "dateIncurred" : 
				{ "$gte" : dateStart.toDate()
				, "$lt" : dateEnd.toDate() } 
			}
		);

		query.exec(function (err, expenses) {
			if (err) { return next(err); };
			if (!expenses) { return next(new Error("No expenses in date range")) };

			req.expenses = expenses;
			return next();
		});
  	}
  	, tag : function (req, res, next, id) {
  		var query = Expense.find({ tags : id });

		query.exec(function (err, expenses) {
			if (err) { return next(err); };
			if (!expenses) { return next(new Error("cannot find tag")); };

			req.expenses = expenses;
			return next();
		});
  	}
  	, paidto : function (req, res, next, id) {
  		var query = Expense.find({ paidTo : id });
  		query.exec(function (err, expenses) {
  			if (err) { return next(err); };
  			if (!expenses) { return next(new Error("cannot find paidTo field")) };

  			req.expenses = expenses;
  			return next();
  		})
  	}
}

module.exports = params