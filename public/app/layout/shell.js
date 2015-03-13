(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  function Shell () {
    var shell = this;
    var tab = 0;
    var subTab = 1;

    shell.setTab = setTab;
    shell.isSet = isSet;
    shell.setSubTab = setSubTab;
    shell.isSetSubTab = isSetSubTab;

    activate();

    function activate () { }

		function setTab (newValue) {
			tab = newValue;
		}

		function isSet (tabNum) {
			return tab === tabNum;
		}

    function isSetSubTab (subTabNum) {
      return subTab === subTabNum;
    }

    function setSubTab (subTabNum) {
      subTab = subTabNum;
    }

  }
})();
