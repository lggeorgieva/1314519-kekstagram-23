let scaleFactor = 100;  // global variable recording current scale factor


function loadImage() {
  // get selected image file
  const file = document.querySelector('input[type=file]').files[0];

  // reset scale factor to 100%
  scaleFactor = 100;
  document.querySelector('.scale__control--value').value = scaleFactor + '%';

  // display image at 100% scale and with no effects
  let img = document.getElementById('ImageSelected');
  img.src = 'photos/' + file.name;
  img.style.transform = 'scale(' + scaleFactor/100 + ')';
  img.classList = [];

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
  document.getElementById('ImageSelected').classList=['effects__preview--' + id.value];
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
