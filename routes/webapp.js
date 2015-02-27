var express = require('express')
var router = express.Router();

var webapp = {
	indexPage : function (req, res, next) {
    res.render('index2', { title : 'Expense Tracker v0.5' })
  }
}

module.exports = webapp