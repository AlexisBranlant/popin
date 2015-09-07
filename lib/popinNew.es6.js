
class Popin {

  constructor( options ) {
    this.defaultOptions = {
      className:'js-popin',
      overlayVisible : true,
      closeButton : true,
      overlayId : 'popinOverlay'
    }
    if(options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this.defaultOptions[key] = options[key];
        }
      }
    }
    /** overlay binding */
    this.overlay = document.getElementById(this.defaultOptions.overlayId);



    /** if content is past in params add content to body */
    if(this.defaultOptions.content){
      this.popin = document.createElement('div');
      this.popin.className = "popin";
      this.popin.innerHTML = this.defaultOptions.content
      document.body.appendChild(div);
    }

    /** button binding */
    this.defaultOptions.popinLink = document.querySelectorAll('.'+this.defaultOptions.className);

    [].forEach.call(this.defaultOptions.popinLink, (link, i) => {
      link.addEventListener('click',event => {
        event.preventDefault();
        event.stopPropagation();
        this.open();
      });
    });
    return this;
  }

  open() {
    console.log('open',this);
    this.overlay.classList.add('popin-overlay--visible');
    this.overlay.addEventListener('click', this.close,false);
  }

  close(){
    console.log('close');
    this.classList.remove('popin-overlay--visible');
    this.removeEventListener('click',this.close,false);
  }



  destroy(){
    console.log('destroy');
  }
};


export default Popin;