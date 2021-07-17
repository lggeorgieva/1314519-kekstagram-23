// Frequently used DOM elements (names ending in Elts are a list of elements)
const sliderElt = document.querySelector('.effect-level__slider');
const scaleControlValueElt = document.querySelector('.scale__control--value');
const uploadPreviewImgElt = document.getElementById('LG-PreviewImage');
const overlayElt = document.querySelector('.img-upload__overlay');
const effectsPreviewElts = document.querySelectorAll('.effects__preview');
const effectLevelValueElt = document.querySelector('.effect-level__value');


// Mutable global variables 
let scaleFactor = 100;  // current scale factor (in percent)
let effect = 'none';    // current effect


// Creating the slider and some slider utility functions
noUiSlider.create(sliderElt, { range:{ min:0, max:100 }, start:100 });

function showSlider() {
  sliderElt.classList.remove('hidden');
  // TODO: reset slider value to 100
}

function hideSlider() {
  sliderElt.classList.add('hidden');
}


// loadImage() is called when an image is selected
function loadImage() {
  // get selected image file and display image
  const file = document.querySelector('input[type=file]').files[0];
  uploadPreviewImgElt.src = 'photos/' + file.name;

  // populate image to effects previews
  for (let p of effectsPreviewElts) {
    p.style.backgroundImage = 'url(photos/' + file.name + ')';
  }

  // reset scale factor to 100%
  scaleFactor = 100;
  scaleControlValueElt.value = scaleFactor + '%';
  uploadPreviewImgElt.style.transform = 'scale(' + scaleFactor/100 + ')';

  // reset the effect to none
  effect = 'none';
  uploadPreviewImgElt.classList = [];
  uploadPreviewImgElt.style.filter = null;
  hideSlider();

  // show overlay
  overlayElt.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


// closeImage() is called when the image preview is closed
function closeImage() {
  // hide overlay
  document.body.classList.remove('modal-open');
  overlayElt.classList.add('hidden');
}


// reduceScaleBy25() is called when the scale - button is clicked
function reduceScaleBy25() {
  if (scaleFactor >= 50) { scaleFactor -= 25; }
  scaleControlValueElt.value = scaleFactor + '%';
  uploadPreviewImgElt.style.transform = 'scale(' + scaleFactor/100 + ')' ;
}


// increaseScaleBy25() is called when the scale + button is clicked
function increaseScaleBy25() {
  if (scaleFactor <= 75){ scaleFactor += 25; }
  scaleControlValueElt.value = scaleFactor + '%';
  uploadPreviewImgElt.style.transform = 'scale(' + scaleFactor/100 + ')' ;
}


// setEffect() is called when an effect radio button is clicked;
// elt is the DOM element that was clicked
function setEffect(elt) {
  effect = elt.value;
  if (effect === 'none') { hideSlider(); } else { showSlider(); }
  uploadPreviewImgElt.style.filter = null;
  uploadPreviewImgElt.classList = ['effects__preview--' + effect];
}




sliderElt.noUiSlider.on('update', (values, handle) => {
  let x = values[handle];
  effectLevelValueElt.value =values[handle];
  switch(effect){
    case 'chrome':
      uploadPreviewImgElt.style.filter = 'grayscale(' + x/100 + ')'; break;
    case 'sepia':
      uploadPreviewImgElt.style.filter = 'sepia(' + x/100 + ')'; break;
    case 'marvin':
      uploadPreviewImgElt.style.filter = 'invert(' + x + '%)'; break;
    case 'phobos':
      uploadPreviewImgElt.style.filter = 'blur(' + x/300 + 'px)'; break;
    case 'heat':
      uploadPreviewImgElt.style.filter = 'brightness(' + x/100*3 + ')'; break;
    default:
  }
});


// Hashtags stuff - not yet tested

const uploadOverlay = uploadForm.querySelector('.upload-overlay');
const hashtagsField = uploadOverlay.querySelector('.upload-form-hashtags');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');


function onHashtagsFieldInvalid() {
  //Remove spaces
  var fieldValue = (hashtagsField.value || '').trim().replace(/\s{2,}/g, ' ');
  hashtagsField.value = fieldValue;

  // Validity Check
  if (fieldValue) {
    const hashtagsArray = fieldValue.split(' ');

    if (hashtagsArray.length > 5) {
      hashtagsField.setCustomValidity('No more than five');
    } else {
      // Create error message (null, if there is no error)
      let message = null;
      for (let i = 0; i < hashtagsArray.length && message === null; i++) {
        if (!(hashtagsArray[i].startsWith('#'))) {
          message = 'Start with the right symbol';
        } else if (hashtagsArray[i].split('#').length > 2) {
          message = 'Separate by spaces';
        } else if (hashtagsArray.indexOf(hashtagsArray[i]) !== i) {
          message = 'Use only once';
        } else if (hashtagsArray[i].length > 21) {
          message = 'Max length 20';
        }
      }

      // Indicate the error by undelining
      if (message) {
        hashtagsField.style.outline = '2px solid red';
        hashtagsField.setCustomValidity(message);
      } else {
        onHashtagsFieldValid();  // no such function exists! Yet!
      }
    }
  }
}


/*
const button = document.querySelector('.click-button');
const popup = document.querySelector('.content');

// Prevent default
button.onclick = function (evt) {
  evt.preventDefault();

  // show a class
  popup.classList.add('show');
};

nextButton.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(points.length / 2).forEach((point) => {
    createMarker(point);
  });
  nextButton.remove();
});*/
  //console.log(values[handle]);
