var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');


var expenses = {
	getAll : function (req, res, next) {
		Expense.find(function (err, expenses) {
			if (err) { return next(err); };
			
			res.json(expenses);
		});
  	}
  	, getOne : function (req, res, next) {
  		// makes use of the param middleware
  		res.json(req.expense);
  	}
  	, getMonth : function (req, res, next) {
  		// makes use of the param middleware
  		res.json(req.expenses);
  	}
  	, create : function (req, res, next) {
  		var expense = new Expense(req.body);

  		// need to add in some input validation


		expense.save(function (err, expense) {
			if (err) { return next(err); };

			res.json(expense);
		});
  	}
  	, update : function (req, res, next) {

  		// need to add in some input validation


  		Expense.findByIdAndUpdate(req.expense.id, req.body, function (err, expense) {
			if (err) { return next(err); };
			if (!expense) { return next(new Error("Could not find expense record to update")); };

			res.json(expense);
		});
  	}
  	, delete : function (req, res, next) {
  		Expense.findByIdAndRemove(req.expense.id, function (err, expense) {
			if (err) { return next(err); };
			if (!expense) { return next(new Error("Could not find expense record to delete")); };

			res.json(expense);
  		});
  	}
}

module.exports = expenses