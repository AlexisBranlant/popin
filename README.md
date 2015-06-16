# popin
Create your custom popin.
You can use this module with `browserify` and `require('popin')`.

### How it works
The plugin will look for all element who have the *js-popin* class and bind it to open a div with an id equal to the *data-target* or a content past in params.

### Example :
```html
<a href="#" class="js-popin" data-target="popin-alpha">test popin</a>

<div id="popin-alpha" class="popin">
    <div class="popin-header">
      <a class="js-popin-linkClose popin-header-linkClose" href="#" title="">Fermer X</a>
    </div>
    <div class="popin-content">
      <!-- popin content goes here -->
    </div>
</div>
```

### Installation
You can use the minified file in **lib/popin.js** for production or if you use Browserify, you just have to `require('popin')` and `npm i`


### Setup
Simply create a new instance of the **Popin** object.

```js
var Popin = require('popin');

document.addEventListener('DOMContentLoaded', function () {
  var popinInstance = new Popin();
  popinInstance.init();//all popins will instancied with default params
}, false);

```
#### CSS
Copy the styles in `styles/popin.scss` in your css or import the file in your scss.


#### Defaults parameters
var defaultParams = {
  overlay : true
}

#### Use custom init params
```js
var popinInstance = new Popin({
  overlay:false //to desable overlay for all popins
});
```

#### Defaults options
var defaultOptions = {
    className : "js-popin", //css class
    overlayVisible : true, //show the overlay for the popin
    closeButton : true //the popin have close button
  }

#### Use custom init options
You can use a custom class to trigger your popin, in the initialisation you just need to pass an object like this :

```js
popinInstance.init({
  className:'customClass', //element in DOM to trigger click
  overlayVisible : false, //disable the overlay for the popin
  closeButton:false, //if you don't need close button
  content:'<div><div class="popin-header"></div>popin ajax</div>'//popin content not in default DOM loaded
});
```
```html
<a href="#" class="customClass" data-target="popin-beta">test popin</a>
```

## Support 
This module uses classList who isn't available on IE9 and below, if you have to play around just use a polyfill :smile:
