(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var popin = require('./popin.es6.js');

exports['default'] = new popin();
module.exports = exports['default'];

},{"./popin.es6.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Popin = (function () {
  /**
   * Represents a book.
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */

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
        _this2.close();
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

      /** if content is past in params add content to body */
      if (defaultOptions.content) {
        var div = document.createElement('div');
        div.id = 'popin-' + this.instanciedPopins.length;
        div.className = 'popin';
        div.innerHTML = defaultOptions.content;
        document.body.appendChild(div);
      }

      [].forEach.call(this[defaultOptions.className] ? this[defaultOptions.className] : this.popins, function (popin, i) {
        var elements = {
          overlayVisible: defaultOptions.overlayVisible,
          closeButton: defaultOptions.closeButton,
          popinId: defaultOptions.content ? 'popin-' + _this3.instanciedPopins.length : popin.getAttribute('data-target')
        };
        popin.setAttribute('data-popin-id', _this3.instanciedPopins.length);
        _this3.instanciedPopins.push(elements.popinId);
        _this3.instanciedPopinsOptions.push(elements);
        popin.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          _this3.open(popin, _this3.instanciedPopinsOptions[event.target.getAttribute('data-popin-id')]);
        });
      });
    }
  }, {
    key: 'open',

    /** METHODE */
    value: function open(currentPopin, options) {
      var _this4 = this;

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
      var windowHeight = document.documentElement.clientHeight;
      var popinHeight = popinDiv.clientHeight;
      if (popinHeight > windowHeight) {
        //Popin is bigenouth screen height
        popinDiv.style.top = document.body.scrollTop + 20 + 'px';
        popinDiv.classList.add('popin--openJs');
      } else {
        //popin fit in screen
        popinDiv.classList.add('popin--open');
      }

      console.log(options);
      //bind closing event
      if (options.closeButton) {
        var closeBtn = popinDiv.querySelector('.js-popin-linkClose');
        closeBtn.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          //open the popin
          _this4.close(options);
        });
      }

      //execute callback after openning popin
      if (options.afterOpen && typeof options.afterOpen == 'function') {
        options.afterOpen();
      }
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
    }
  }]);

  return Popin;
})();

exports['default'] = Popin;
;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOi9Qcm9qZXRzL21vZHVsZXNBbHRpbWEvbm9kZV9tb2R1bGVzL3BvcGluL2xpYi9wb3Bpbkluc3RhbmNlLmpzIiwiYzovUHJvamV0cy9tb2R1bGVzQWx0aW1hL25vZGVfbW9kdWxlcy9wb3Bpbi9saWIvcG9waW4uZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7cUJBRXZCLElBQUksS0FBSyxFQUFFOzs7Ozs7Ozs7Ozs7OztJQ0ZMLEtBQUs7Ozs7Ozs7O0FBT2IsV0FQUSxLQUFLLENBT1gsTUFBTSxFQUFHOzs7MEJBUEgsS0FBSzs7QUFRdEIsUUFBSSxhQUFhLEdBQUc7QUFDbEIsYUFBTyxFQUFHLElBQUk7S0FDZixDQUFBO0FBQ0QsUUFBRyxNQUFNLEVBQUU7QUFDVCxXQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUN0QixZQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7T0FDRjtLQUNGO0FBQ0QsUUFBSSxDQUFDLE1BQU0sR0FBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQztBQUNuSCxRQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDO0FBQzNELFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDM0IsUUFBSSxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztBQUNsQyxRQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FB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LFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDNUUsY0FBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pELGNBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN4QixVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUl2RCxVQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztBQUM5QixnQkFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7T0FDL0c7OztBQUdELFVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ2hDLFlBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO09BQ3pEOzs7QUFHRCxVQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxPQUFPLENBQUMsVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUNoRSxlQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7T0FDdEI7S0FDRjs7O1NBeEtrQixLQUFLOzs7cUJBQUwsS0FBSztBQXlLekIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgcG9waW4gPSByZXF1aXJlKCcuL3BvcGluLmVzNi5qcycpO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgcG9waW4oKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BpbiB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgYm9vay5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZSAtIFRoZSB0aXRsZSBvZiB0aGUgYm9vay5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF1dGhvciAtIFRoZSBhdXRob3Igb2YgdGhlIGJvb2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciggcGFyYW1zICkge1xuICAgIHZhciBkZWZhdWx0UGFyYW1zID0ge1xuICAgICAgb3ZlcmxheSA6IHRydWVcbiAgICB9XG4gICAgaWYocGFyYW1zKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgICAgIGlmIChkZWZhdWx0UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBkZWZhdWx0T3B0aW9uc1trZXldID0gcGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3BpbnMgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkZWZhdWx0UGFyYW1zICYmIGRlZmF1bHRQYXJhbXMucG9waW4gPyBkZWZhdWx0UGFyYW1zLnBvcGluIDogJy5qcy1wb3BpbicpO1xuICAgIHRoaXMuaXNEZXZpY2UgPSAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy5pbnN0YW5jaWVkUG9waW5zID0gW107XG4gICAgdGhpcy5pbnN0YW5jaWVkUG9waW5zT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMub3BlbmVkUG9waW5zID0gW107XG5cbiAgICAvKiogY3JlYXRlIG92ZXJsYXkgd2hlbiBwYXJhbXMub3ZlcmxheSBpcyB0cnVlICovXG4gICAgaWYoZGVmYXVsdFBhcmFtcy5vdmVybGF5KXtcbiAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBvdmVybGF5LmlkID0gJ3BvcGluLW92ZXJsYXknO1xuICAgICAgb3ZlcmxheS5jbGFzc05hbWUgPSAncG9waW4tb3ZlcmxheSc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgICB0aGlzLm92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9waW4tb3ZlcmxheScpO1xuICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuICAvKiogaW5pdCBnZW5lcmljIHBvcGlucyBhbnMgc3BlY2lmaXF1ZSBpZiBzZWxlY3RvciBpcyBwYXN0IGluIGFyZyAqL1xuICBpbml0KG9wdGlvbnMpIHtcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBvdmVybGF5VmlzaWJsZSA6IHRydWUsXG4gICAgICBjbG9zZUJ1dHRvbiA6IHRydWVcbiAgICB9XG4gICAgaWYob3B0aW9ucykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGRlZmF1bHRPcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIF90aGlzICA9IHRoaXM7XG4gICAgaWYoZGVmYXVsdE9wdGlvbnMuY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzW2RlZmF1bHRPcHRpb25zLmNsYXNzTmFtZV0gID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicrZGVmYXVsdE9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvKiogaWYgY29udGVudCBpcyBwYXN0IGluIHBhcmFtcyBhZGQgY29udGVudCB0byBib2R5ICovXG4gICAgaWYoZGVmYXVsdE9wdGlvbnMuY29udGVudCl7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaWQgPSAncG9waW4tJyt0aGlzLmluc3RhbmNpZWRQb3BpbnMubGVuZ3RoO1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicG9waW5cIjtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBkZWZhdWx0T3B0aW9ucy5jb250ZW50XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG5cbiAgICBbXS5mb3JFYWNoLmNhbGwoKHRoaXNbZGVmYXVsdE9wdGlvbnMuY2xhc3NOYW1lXSkgPyB0aGlzW2RlZmF1bHRPcHRpb25zLmNsYXNzTmFtZV0gOiB0aGlzLnBvcGlucywgKHBvcGluLCBpKSA9PiB7XG4gICAgICB2YXIgZWxlbWVudHMgPSB7XG4gICAgICAgIG92ZXJsYXlWaXNpYmxlIDogZGVmYXVsdE9wdGlvbnMub3ZlcmxheVZpc2libGUsXG4gICAgICAgIGNsb3NlQnV0dG9uIDogZGVmYXVsdE9wdGlvbnMuY2xvc2VCdXR0b24sXG4gICAgICAgIHBvcGluSWQgOiAoZGVmYXVsdE9wdGlvbnMuY29udGVudCkgPyAncG9waW4tJyt0aGlzLmluc3RhbmNpZWRQb3BpbnMubGVuZ3RoIDogcG9waW4uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG4gICAgICB9O1xuICAgICAgcG9waW4uc2V0QXR0cmlidXRlKCdkYXRhLXBvcGluLWlkJyx0aGlzLmluc3RhbmNpZWRQb3BpbnMubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5zdGFuY2llZFBvcGlucy5wdXNoKGVsZW1lbnRzLnBvcGluSWQpO1xuICAgICAgdGhpcy5pbnN0YW5jaWVkUG9waW5zT3B0aW9ucy5wdXNoKGVsZW1lbnRzKTtcbiAgICAgIHBvcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLm9wZW4ocG9waW4sdGhpcy5pbnN0YW5jaWVkUG9waW5zT3B0aW9uc1tldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcGluLWlkJyldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qKiBNRVRIT0RFICovXG4gIG9wZW4oY3VycmVudFBvcGluLCBvcHRpb25zKSB7XG4gICAgLy9pZiB0aGVyZSBpcyBhIG9wZW5lZCBwb3BpbiBjbG9zZSBpdCB0ZW1wb3JhcnlcbiAgICBpZih0aGlzLm9wZW5lZFBvcGlucy5sZW5ndGggPiAwKXtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaW5zdGFuY2llZFBvcGluc1t0aGlzLm9wZW5lZFBvcGlucy5sZW5ndGgtMV0pLmNsYXNzTGlzdC5hZGQoJ3BvcGluLS1jbG9zZUpzJyk7XG4gICAgfVxuXG4gICAgLy9leGVjdXRlIGNhbGxiYWNrIGJlZm9yZSBvcGVubmluZyBwb3BpblxuICAgIGlmKG9wdGlvbnMuYmVmb3JlT3BlbiAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVPcGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgb3B0aW9ucy5iZWZvcmVPcGVuKCk7XG4gICAgfVxuXG4gICAgLy9wb3BpbiBEaXZcbiAgICB2YXIgcG9waW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRpb25zLnBvcGluSWQpO1xuXG4gICAgLy9zaG93IG92ZXJsYXkgd2hlbiBvcHRpb25zLm92ZXJsYXkgdHJ1ZSA9PiBkZWZhdWx0IDogdHJ1ZVxuICAgIGlmKG9wdGlvbnMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5vcGVuZWRQb3BpbnMubGVuZ3RoID09IDApe1xuICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3BvcGluLW92ZXJsYXktLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICAvL2FkZCBwb3BpbiB0byB0YWJsZSBtZW1vcnkgb2Ygb3BlbmVkIHBvcGluXG4gICAgdGhpcy5vcGVuZWRQb3BpbnMucHVzaChjdXJyZW50UG9waW4uZ2V0QXR0cmlidXRlKCdkYXRhLXBvcGluLWlkJykpO1xuXG4gICAgLy9zaG93IHRoZSBwb3BpblxuICAgIHZhciB3aW5kb3dIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHZhciBwb3BpbkhlaWdodCA9IHBvcGluRGl2LmNsaWVudEhlaWdodDtcbiAgICBpZihwb3BpbkhlaWdodCA+IHdpbmRvd0hlaWdodCkge1xuICAgICAgLy9Qb3BpbiBpcyBiaWdlbm91dGggc2NyZWVuIGhlaWdodFxuICAgICAgcG9waW5EaXYuc3R5bGUudG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgKyAyMCArICdweCc7XG4gICAgICBwb3BpbkRpdi5jbGFzc0xpc3QuYWRkKCdwb3Bpbi0tb3BlbkpzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vcG9waW4gZml0IGluIHNjcmVlblxuICAgICAgcG9waW5EaXYuY2xhc3NMaXN0LmFkZCgncG9waW4tLW9wZW4nKTtcbiAgICB9XG5cbmNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICAgIC8vYmluZCBjbG9zaW5nIGV2ZW50XG4gICAgaWYob3B0aW9ucy5jbG9zZUJ1dHRvbil7XG4gICAgICB2YXIgY2xvc2VCdG4gPSBwb3BpbkRpdi5xdWVyeVNlbGVjdG9yKCcuanMtcG9waW4tbGlua0Nsb3NlJyk7XG4gICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy9vcGVuIHRoZSBwb3BpblxuICAgICAgICB0aGlzLmNsb3NlKG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9leGVjdXRlIGNhbGxiYWNrIGFmdGVyIG9wZW5uaW5nIHBvcGluXG4gICAgaWYob3B0aW9ucy5hZnRlck9wZW4gJiYgdHlwZW9mIG9wdGlvbnMuYWZ0ZXJPcGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgb3B0aW9ucy5hZnRlck9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZShvcHRpb25zKSB7XG4gICAgaWYoIW9wdGlvbnMpIHtcbiAgICAgIHZhciBvcHRpb25zID0ge31cbiAgICB9XG4gICAgLy9leGVjdXRlIGNhbGxiYWNrIGJlZm9yZSBjbG9zaW5nIHBvcGluXG4gICAgaWYob3B0aW9ucy5iZWZvcmVDbG9zZSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVDbG9zZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ2xvc2UoKTtcbiAgICB9XG5cbiAgICAvL2Nsb3NlIHRoZSBjdXJyZW50IHBvcGluXG4gICAgdmFyIGN1cnJlbnRQb3BpbiA9IHRoaXMub3BlbmVkUG9waW5zW3RoaXMub3BlbmVkUG9waW5zLmxlbmd0aC0xXTtcbiAgICB2YXIgcG9waW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmluc3RhbmNpZWRQb3BpbnNbY3VycmVudFBvcGluXSk7XG4gICAgcG9waW5EaXYuY2xhc3NMaXN0LnJlbW92ZSgncG9waW4tLW9wZW4nLCdwb3Bpbi0tb3BlbkpzJyk7XG4gICAgcG9waW5EaXYuc3R5bGUudG9wID0gJyc7XG4gICAgdGhpcy5vcGVuZWRQb3BpbnMuc3BsaWNlKHRoaXMub3BlbmVkUG9waW5zLmxlbmd0aC0xLDEpO1xuXG5cbiAgICAvL29wZW4gbGFzdCBvcGVuZWQgcG9waW5cbiAgICBpZih0aGlzLm9wZW5lZFBvcGlucy5sZW5ndGggPiAwKXtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaW5zdGFuY2llZFBvcGluc1t0aGlzLm9wZW5lZFBvcGlucy5sZW5ndGgtMV0pLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcGluLS1jbG9zZUpzJyk7XG4gICAgfVxuXG4gICAgLy9oaWRlIG92ZXJsYXlcbiAgICBpZih0aGlzLm9wZW5lZFBvcGlucy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3BvcGluLW92ZXJsYXktLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICAvL2V4ZWN1dGUgY2FsbGJhY2sgYWZ0ZXIgY2xvc2luZyBwb3BpblxuICAgIGlmKG9wdGlvbnMuYWZ0ZXJDbG9zZSAmJiB0eXBlb2Ygb3B0aW9ucy5hZnRlckNsb3NlID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgb3B0aW9ucy5hZnRlckNsb3NlKCk7XG4gICAgfVxuICB9XG59O1xuXG4iXX0=
