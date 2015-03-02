(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  function Shell () {
    var shell = this;
    var tab = 0;

    shell.setTab = setTab;
    shell.isSet = isSet;

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
