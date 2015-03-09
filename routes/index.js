var express = require('express');
var router = express.Router();

var webapp = require('./webapp.js')
var params = require('./params.js')
var expenses = require('./expenses.js')
var tags = require('./tags.js')
var paidto = require('./paidto.js')

// Page requests
router.get('/', webapp.indexPage)

// API Parameter Middlewares
router.param('expense', params.expense)
router.param('month', params.month)
router.param('tag', params.tag)
router.param('paidto', params.paidto)

// API Requests to /expenses root path
router.get('/expenses', expenses.getAll)
router.post('/expenses', expenses.create)

// API Request to month endpoint
router.get('/expenses/month/:month', expenses.getMonth)

// API Request to tags endpoints
router.get('/expenses/taglist', tags.getTagList)
router.get('/expenses/ngtaglist', tags.getNgTagList)
router.get('/expenses/tag/:tag', tags.getOne)

// API Request to paidto endpoint
router.get('/expenses/paidtolist', paidto.getPaidToList)
router.get('/expenses/paidto/:paidto', paidto.getOne)

// API Requests to specific resource
// Placed last so endpoints sharing pathname execute first
router.get('/expenses/:expense', expenses.getOne)
router.put('/expenses/:expense', expenses.update)
router.delete('/expenses/:expense', expenses.delete)

module.exports = router;
