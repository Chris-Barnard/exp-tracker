(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('Navbar', Navbar);

	function Navbar () {
		var nav = this;
		var tab = 0;

		nav.setTab = setTab;
		nav.isSet = isSet; 

		activate();

		function activate () { }

		function setTab (newValue) {
			tab = newValue;
		}

		function isSet (tabNum) {
			return tab === tabNum;
		}
	}
})();