// Frequently used DOM elements (names ending in Elts are a list of elements)
const sliderElt = document.querySelector('.effect-level__slider');
const scaleControlValueElt = document.querySelector('.scale__control--value');
const uploadPreviewImgElt = document.getElementById('LG-PreviewImage');
const overlayElt = document.querySelector('.img-upload__overlay');
const effectsPreviewElts = document.querySelectorAll('.effects__preview');
const effectLevelValueElt = document.querySelector('.effect-level__value');
const hashtagsFieldElt = document.querySelector('.text__hashtags');
const uploadFormElt = document.querySelector('#upload-select-image');


// Mutable global variables
let scaleFactor = 100;  // current scale factor (in percent)
let effect = 'none';    // current effect


// Creating the slider and some slider utility functions
noUiSlider.create(sliderElt, { range:{ min:0, max:1 }, start:1 });

function showSlider() {
  sliderElt.classList.remove('hidden');
  sliderElt.noUiSlider.updateOptions({start:1});
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


// slider updates controlling various filter effects
sliderElt.noUiSlider.on('update', (values, handle) => {
  const x = values[handle];
  effectLevelValueElt.value = x;
  switch (effect) {
    case 'chrome':
      uploadPreviewImgElt.style.filter = 'grayscale(' + x + ')'; break;
    case 'sepia':
      uploadPreviewImgElt.style.filter = 'sepia(' + x + ')'; break;
    case 'marvin':
      uploadPreviewImgElt.style.filter = 'invert(' + x + ')'; break;
    case 'phobos':
      uploadPreviewImgElt.style.filter = 'blur(' + x*3 + 'px)'; break;
    case 'heat':
      uploadPreviewImgElt.style.filter = 'brightness(' + (x*2+1) + ')'; break;
    default:
  }
});


// Hashtags stuff - not yet tested

function onHashtagsFieldInvalid() {
  // Remove extra spaces and convert to lower case
  const fieldValue = hashtagsFieldElt.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();
  hashtagsFieldElt.value = fieldValue;

  // Empty string is okay
  if (fieldValue === '') { return true; }

  // Split on spaces
  const hashtagsArray = fieldValue.split(' ');

  // Validity check; create error message ('' if all is okay)
  let message = '';
  if (hashtagsArray.length > 5) {
    message = 'No more than five hashtags';
  }
  else {
    for (let i = 0; i < hashtagsArray.length; i++) {
      if (!hashtagsArray[i].startsWith('#')) {
        message = 'Start each hashtag with #'; break;
      }
      if (hashtagsArray[i].split('#').length > 2) {
        message = 'Separate hashtags by spaces'; break;
      }
      if (hashtagsArray.indexOf(hashtagsArray[i]) !== i) {
        message = 'Use each hashtag only once'; break;
      }
      if (hashtagsArray[i].length > 20) {
        message = 'Max length of each hashtag 20 characters'; break;
      }
      // TODO: Check that hashtags have >= 1 characters (excl or incl #?)
      // TODO: Check that hashtags only consist of letters and numbers
    }
  }

  // Show error message ('' shows nothing and submits)
  hashtagsFieldElt.setCustomValidity(message);

  // Return true or false
  if (message === '') {
    return true;
  }
  else {
    // Highlight form in red to indicate error
    hashtagsFieldElt.style.outline = '2px solid red';
    return message === '';
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
