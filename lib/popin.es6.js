class Popin {
  constructor( params ) {
    var defaultParams = {
      overlay : true
    }
    if(params) {
      for (var key in params) {
        if (defaultParams.hasOwnProperty(key)) {
          defaultOptions[key] = params[key];
        }
      }
    }
    this.popins  = document.querySelectorAll(defaultParams && defaultParams.popin ? defaultParams.popin : '.js-popin');
    this.isDevice = 'ontouchstart' in document.documentElement;
    this.instanciedPopins = [];
    this.instanciedPopinsOptions = [];
    this.openedPopins = [];

    /** create overlay when params.overlay is true */
    if(defaultParams.overlay){
      var overlay = document.createElement('div');
      overlay.id = 'popin-overlay';
      overlay.className = 'popin-overlay';

      document.body.appendChild(overlay);
      this.overlay = document.getElementById('popin-overlay');
      this.overlay.addEventListener('click', (e) => {
        var popinOptions = this.instanciedPopinsOptions[this.openedPopins[this.openedPopins.length-1]];
        this.close(popinOptions);
      }, false);
    }
  }

  /** init generic popins ans specifique if selector is past in arg */
  init(options) {
    var defaultOptions = {
      overlayVisible : true,
      closeButton : true
    }
    if(options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          defaultOptions[key] = options[key];
        }
      }
    }
    var _this  = this;
    if(defaultOptions.className) {
      this[defaultOptions.className]  = document.querySelectorAll('.'+defaultOptions.className);
    }


    [].forEach.call((this[defaultOptions.className]) ? this[defaultOptions.className] : this.popins, (popin, i) => {
      var elements = {
        overlayVisible : defaultOptions.overlayVisible,
        closeButton : defaultOptions.closeButton,
        buttonSticky : defaultOptions.buttonSticky,
        popinId : (defaultOptions.content) ? 'popin-'+this.instanciedPopins.length : popin.getAttribute('data-target'),
        beforeOpen : defaultOptions.beforeOpen,
        afterOpen : defaultOptions.afterOpen,
        beforeClose : defaultOptions.beforeClose,
        afterClose : defaultOptions.afterClose,
        disableAfterClose : defaultOptions.disableAfterClose,
        link : popin
      };

      /** if content is past in params add content to body */
      if(defaultOptions.content){
          var div = document.createElement('div');
          div.id = 'popin-'+this.instanciedPopins.length;
          div.className = "popin";
          div.innerHTML = defaultOptions.content
          document.body.appendChild(div);
      }

      popin.setAttribute('data-popin-id',this.instanciedPopins.length);
      popin.setAttribute('data-className',defaultOptions.className ? defaultOptions.className :'js-popin' );
      this.instanciedPopins.push(elements.popinId);
      this.instanciedPopinsOptions.push(elements);

      popin.addEventListener('click',event => {
        event.preventDefault();
        event.stopPropagation();
        var el  = event.target;
        this.open(event,el ,this.instanciedPopinsOptions[ el.getAttribute('data-popin-id')]);
      } ,false);

    });


  }


  click(){

  }

  /** METHODE */
  open(e, currentPopin, options) {
    //if the popin is disable break;
    if(currentPopin.getAttribute('data-disable')) {
      return false;
    }
    //if there is a opened popin close it temporary
    if(this.openedPopins.length > 0){
      document.getElementById(this.instanciedPopins[this.openedPopins.length-1]).classList.add('popin--closeJs');
    }
    //execute callback before openning popin
    if(options.beforeOpen && typeof options.beforeOpen == "function") {
      options.beforeOpen();
    }

    //popin Div
    var popinDiv = document.getElementById(options.popinId);

    //show overlay when options.overlay true => default : true
    if(options.overlayVisible && this.openedPopins.length == 0){
      this.overlay.classList.add('popin-overlay--visible');
    }

    //add popin to table memory of opened popin
    this.openedPopins.push(currentPopin.getAttribute('data-popin-id'));

    //show the popin
    var windowHeight = document.documentElement.clientHeight,
        popinHeight = popinDiv.clientHeight,
        popinOffset = this.getOffset(currentPopin),
        popinTop = (options.buttonSticky) ? popinOffset.top + 'px' : document.body.scrollTop + 20 + 'px';

    if(options.buttonSticky || popinHeight > windowHeight) {
      //Popin is bigenouth screen height
      popinDiv.style.top = popinTop;
      popinDiv.classList.add('popin--openJs');
    } else {
      //popin fit in screen
      popinDiv.classList.add('popin--open');
    }

    //bind closing event
    if(options.closeButton){
      var closeBtn = popinDiv.querySelectorAll('.js-popin-linkClose');
      [].forEach.call(closeBtn, (button, i) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          //open the popin
          this.close(options);
        });
      });
    }

    //execute callback after openning popin
    if(options.afterOpen && typeof options.afterOpen == "function") {
      options.afterOpen();
    }
  }

  getOffset(el) {
    var rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
    };

  }

  close(options) {
    if(!options) {
      var options = {}
    }
    //execute callback before closing popin
    if(options.beforeClose && typeof options.beforeClose == "function") {
      options.beforeClose();
    }

    //close the current popin
    var currentPopin = this.openedPopins[this.openedPopins.length-1];
    var popinDiv = document.getElementById(this.instanciedPopins[currentPopin]);
    popinDiv.classList.remove('popin--open','popin--openJs');
    popinDiv.style.top = '';

    this.openedPopins.splice(this.openedPopins.length-1,1);


    //open last opened popin
    if(this.openedPopins.length > 0){
      document.getElementById(this.instanciedPopins[this.openedPopins.length-1]).classList.remove('popin--closeJs');
    }

    //hide overlay
    if(this.openedPopins.length == 0) {
      this.overlay.classList.remove('popin-overlay--visible');
    }

    //execute callback after closing popin
    if(options.afterClose && typeof options.afterClose == "function") {
      options.afterClose();
    }

    //disable the popin
    this.disable(currentPopin);
  }

  disable(currentPopin) {
    var popinOptions = this.instanciedPopinsOptions[currentPopin];
    var link = document.querySelector('[data-popin-id="'+currentPopin+'"]');
    if(popinOptions.disableAfterClose){
      link.setAttribute('data-disable', true)
    }
  }
};


export default Popin;