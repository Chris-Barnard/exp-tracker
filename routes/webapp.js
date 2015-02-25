var express = require('express')
var router = express.Router();

var webapp = {
	indexPage : function (req, res, next) {
    res.render('index', { title : 'Expense Tracker' })
  }
}

module.exports = webapp