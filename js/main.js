
function loadImage() {
//  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  //alert(file.name);
  //document.querySelector('.img-upload__overlay').style.display= 'block';
  document.getElementById('ImageSelected').src='photos/' + file.name;

//document.getElementById('ImageSelected').classList.add('effects__preview--phobos');

  //document.getElementById('ImageSelected').style='transform: scale(0.75)';
  let overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.remove('hidden');
  //overlay.classList.add('modal-open');
  document.body.classList.add('modal-open');
  const preview = document.querySelectorAll('.effects__preview');
  document.body.style.backgroundImage = "url('photos/' + file.name)";
  //preview.style.backgroundImage= "url('img/' + file.name + ')";

  let previews = document.querySelectorAll('.effects__preview');
  for (p of previews) {
    p.style.backgroundImage = 'url(photos/' + file.name + ')';
  }
}

function setEffect(effect){
  alert(document.getElementById('ImageSelected').classList);
  document.getElementById('ImageSelected').classList=[];
  document.getElementById('ImageSelected').classList.add(effect);
}




function closeImage() {
  document.body.classList.remove('modal-open');
  let overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.add('hidden');
  //document.querySelector('.img-upload__overlay').style.display= 'none';
}


let scaleFactor = 100;

function reduceScaleBy25() {
  if (scaleFactor >= 50) {
    scaleFactor -= 25;
  }
  document.querySelector('.scale__control--value').value=scaleFactor + '%';
  document.getElementById('ImageSelected').style='transform: scale(' + scaleFactor/100 + ')' ;
}

function increaseScaleBy25() {
  if (scaleFactor <= 75){
    scaleFactor += 25;
  }
  document.querySelector('.scale__control--value').value=scaleFactor + '%';
  document.getElementById('ImageSelected').style='transform: scale(' + scaleFactor/100 + ')' ;
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
