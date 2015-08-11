/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Popin = (function () {
	  function Popin(params) {
	    var _this2 = this;

	    _classCallCheck(this, Popin);

	    var defaultParams = {
	      overlay: true
	    };
	    if (params) {
	      for (var key in params) {
	        if (defaultParams.hasOwnProperty(key)) {
	          defaultOptions[key] = params[key];
	        }
	      }
	    }
	    this.popins = document.querySelectorAll(defaultParams && defaultParams.popin ? defaultParams.popin : '.js-popin');
	    this.isDevice = 'ontouchstart' in document.documentElement;
	    this.instanciedPopins = [];
	    this.instanciedPopinsOptions = [];
	    this.openedPopins = [];

	    /** create overlay when params.overlay is true */
	    if (defaultParams.overlay) {
	      var overlay = document.createElement('div');
	      overlay.id = 'popin-overlay';
	      overlay.className = 'popin-overlay';

	      document.body.appendChild(overlay);
	      this.overlay = document.getElementById('popin-overlay');
	      this.overlay.addEventListener('click', function (e) {
	        var popinOptions = _this2.instanciedPopinsOptions[_this2.openedPopins[_this2.openedPopins.length - 1]];
	        _this2.close(popinOptions);
	      }, false);
	    }
	  }

	  _createClass(Popin, [{
	    key: 'init',

	    /** init generic popins ans specifique if selector is past in arg */
	    value: function init(options) {
	      var _this3 = this;

	      var defaultOptions = {
	        overlayVisible: true,
	        closeButton: true
	      };
	      if (options) {
	        for (var key in options) {
	          if (options.hasOwnProperty(key)) {
	            defaultOptions[key] = options[key];
	          }
	        }
	      }
	      var _this = this;
	      if (defaultOptions.className) {
	        this[defaultOptions.className] = document.querySelectorAll('.' + defaultOptions.className);
	      }

	      [].forEach.call(this[defaultOptions.className] ? this[defaultOptions.className] : this.popins, function (popin, i) {
	        var elements = {
	          overlayVisible: defaultOptions.overlayVisible,
	          closeButton: defaultOptions.closeButton,
	          buttonSticky: defaultOptions.buttonSticky,
	          popinId: defaultOptions.content ? 'popin-' + _this3.instanciedPopins.length : popin.getAttribute('data-target'),
	          beforeOpen: defaultOptions.beforeOpen,
	          afterOpen: defaultOptions.afterOpen,
	          beforeClose: defaultOptions.beforeClose,
	          afterClose: defaultOptions.afterClose,
	          disableAfterClose: defaultOptions.disableAfterClose,
	          link: popin
	        };

	        /** if content is past in params add content to body */
	        if (defaultOptions.content) {
	          var div = document.createElement('div');
	          div.id = 'popin-' + _this3.instanciedPopins.length;
	          div.className = 'popin';
	          div.innerHTML = defaultOptions.content;
	          document.body.appendChild(div);
	        }

	        popin.setAttribute('data-popin-id', _this3.instanciedPopins.length);
	        popin.setAttribute('data-className', defaultOptions.className ? defaultOptions.className : 'js-popin');
	        _this3.instanciedPopins.push(elements.popinId);
	        _this3.instanciedPopinsOptions.push(elements);

	        popin.addEventListener('click', function (event) {
	          event.preventDefault();
	          event.stopPropagation();
	          var el = event.target;
	          _this3.open(event, el, _this3.instanciedPopinsOptions[el.getAttribute('data-popin-id')]);
	        }, false);
	      });
	    }
	  }, {
	    key: 'click',
	    value: function click() {}
	  }, {
	    key: 'open',

	    /** METHODE */
	    value: function open(e, currentPopin, options) {
	      var _this4 = this;

	      //if the popin is disable break;
	      if (currentPopin.getAttribute('data-disable')) {
	        return false;
	      }
	      //if there is a opened popin close it temporary
	      if (this.openedPopins.length > 0) {
	        document.getElementById(this.instanciedPopins[this.openedPopins.length - 1]).classList.add('popin--closeJs');
	      }
	      //execute callback before openning popin
	      if (options.beforeOpen && typeof options.beforeOpen == 'function') {
	        options.beforeOpen();
	      }

	      //popin Div
	      var popinDiv = document.getElementById(options.popinId);

	      //show overlay when options.overlay true => default : true
	      if (options.overlayVisible && this.openedPopins.length == 0) {
	        this.overlay.classList.add('popin-overlay--visible');
	      }

	      //add popin to table memory of opened popin
	      this.openedPopins.push(currentPopin.getAttribute('data-popin-id'));

	      //show the popin
	      var windowHeight = document.documentElement.clientHeight,
	          popinHeight = popinDiv.clientHeight,
	          popinOffset = this.getOffset(currentPopin),
	          popinTop = options.buttonSticky ? popinOffset.top + 'px' : document.body.scrollTop + 20 + 'px';

	      if (options.buttonSticky || popinHeight > windowHeight) {
	        //Popin is bigenouth screen height
	        popinDiv.style.top = popinTop;
	        popinDiv.classList.add('popin--openJs');
	      } else {
	        //popin fit in screen
	        popinDiv.classList.add('popin--open');
	      }

	      //bind closing event
	      if (options.closeButton) {
	        var closeBtn = popinDiv.querySelectorAll('.js-popin-linkClose');
	        [].forEach.call(closeBtn, function (button, i) {
	          button.addEventListener('click', function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	            //open the popin
	            _this4.close(options);
	          });
	        });
	      }

	      //execute callback after openning popin
	      if (options.afterOpen && typeof options.afterOpen == 'function') {
	        options.afterOpen();
	      }
	    }
	  }, {
	    key: 'getOffset',
	    value: function getOffset(el) {
	      var rect = el.getBoundingClientRect();

	      return {
	        top: rect.top + document.body.scrollTop,
	        left: rect.left + document.body.scrollLeft
	      };
	    }
	  }, {
	    key: 'close',
	    value: function close(options) {
	      if (!options) {
	        var options = {};
	      }
	      //execute callback before closing popin
	      if (options.beforeClose && typeof options.beforeClose == 'function') {
	        options.beforeClose();
	      }

	      //close the current popin
	      var currentPopin = this.openedPopins[this.openedPopins.length - 1];
	      var popinDiv = document.getElementById(this.instanciedPopins[currentPopin]);
	      popinDiv.classList.remove('popin--open', 'popin--openJs');
	      popinDiv.style.top = '';

	      this.openedPopins.splice(this.openedPopins.length - 1, 1);

	      //open last opened popin
	      if (this.openedPopins.length > 0) {
	        document.getElementById(this.instanciedPopins[this.openedPopins.length - 1]).classList.remove('popin--closeJs');
	      }

	      //hide overlay
	      if (this.openedPopins.length == 0) {
	        this.overlay.classList.remove('popin-overlay--visible');
	      }

	      //execute callback after closing popin
	      if (options.afterClose && typeof options.afterClose == 'function') {
	        options.afterClose();
	      }

	      //disable the popin
	      this.disable(currentPopin);
	    }
	  }, {
	    key: 'disable',
	    value: function disable(currentPopin) {
	      var popinOptions = this.instanciedPopinsOptions[currentPopin];
	      var link = document.querySelector('[data-popin-id="' + currentPopin + '"]');
	      if (popinOptions.disableAfterClose) {
	        link.setAttribute('data-disable', true);
	      }
	    }
	  }]);

	  return Popin;
	})();

	;

	exports['default'] = Popin;
	module.exports = exports['default'];

/***/ }
/******/ ]);