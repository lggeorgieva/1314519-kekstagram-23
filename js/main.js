
let scaleFactor = 100;  // global variable recording current scale factor
let effect = 'none';
const sliderElement = document.querySelector('.effect-level__slider');
function loadImage() {
  // get selected image file
  const file = document.querySelector('input[type=file]').files[0];

  //reset the effect to none
  effect = 'none';

  // reset scale factor to 100%
  scaleFactor = 100;
  document.querySelector('.scale__control--value').value = scaleFactor + '%';

  // display image at 100% scale and with no effects
  let img = document.getElementById('ImageSelected');
  img.src = 'photos/' + file.name;
  img.style.transform = 'scale(' + scaleFactor/100 + ')';
  img.classList = [];
  img.style.filter = null;
  // populate image to effects previews
  let previews = document.querySelectorAll('.effects__preview');
  for (p of previews) {
    p.style.backgroundImage = 'url(photos/' + file.name + ')';
  }

  // show overlay
  let overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


function closeImage() {
  // hide overlay
  document.body.classList.remove('modal-open');
  let overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.add('hidden');
}


function reduceScaleBy25() {
  if (scaleFactor >= 50) { scaleFactor -= 25; }
  document.querySelector('.scale__control--value').value = scaleFactor + '%';
  document.getElementById('ImageSelected').style.transform = 'scale(' + scaleFactor/100 + ')' ;
}


function increaseScaleBy25() {
  if (scaleFactor <= 75){ scaleFactor += 25; }
  document.querySelector('.scale__control--value').value = scaleFactor + '%';
  document.getElementById('ImageSelected').style.transform = 'scale(' + scaleFactor/100 + ')' ;
}


function setEffect(id) {
  effect =id.value;
  if(effect === 'none'){
    sliderElement.classList.add('hidden');
  }
  else{
    sliderElement.classList.remove('hidden');
  }
  let image = document.getElementById('ImageSelected');
  image.style.filter=null;
  image.classList=['effects__preview--' + effect];
}




noUiSlider.create(sliderElement, {
    range: {
        min: 0,
        max: 100,
    },
    start: 100,
});



sliderElement.noUiSlider.on('update', (values, handle) => {
  let image = document.getElementById('ImageSelected');
  let x = values[handle];
  document.querySelector('.effect-level__value').value =values[handle];
  switch(effect){
    case 'chrome':
      image.style.filter = 'grayscale(' + x/100 + ')'; break;
    case 'sepia':
      image.style.filter = 'sepia(' + x/100 + ')'; break;
    case 'marvin':
      image.style.filter = 'invert(' + x + '%)'; break;
    case 'phobos':
      image.style.filter = 'blur(' + x/300 + 'px)'; break;
    case 'heat':
      image.style.filter = 'brightness(' + x/100*3 + ')'; break;
    default:
  }
});


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
