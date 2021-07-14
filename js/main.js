
//alert("Hello!");
//document.getElementById('ImageOverDone').style.display= 'block';
//document.querySelector('.img-upload__overlay').style.display= 'block';

function loadImage() {
//  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  //alert(file.name);
  //document.querySelector('.img-upload__overlay').style.display= 'block';
  document.getElementById('ImageSelected').src='img/' + file.name;
  //document.getElementById('ImageSelected').style='transform: scale(0.75)';
  let overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.remove('hidden');
  //overlay.classList.add('modal-open');
  document.body.classList.add('modal-open');
  const preview = document.querySelectorAll('.effects__preview');
  document.body.style.backgroundImage = "url('img/' + file.name)";
  //preview.style.backgroundImage= "url('img/' + file.name + ')";

  let previews = document.querySelectorAll('.effects__preview');
  for (p of previews) {
    p.style.backgroundImage = 'url(img/' + file.name + ')';
  }
  //preview.style.backgroundImage= "img/logo-background-3.jpg";
  //alert(preview[0]);


  //const reader = new FileReader();

  //reader.addEventListener("load", function () {
    // convert image file to base64 string
    //preview.src = reader.result;
  //}, false);

  //if (file) {
  //  reader.readAsDataURL(file);
//  }

//var img = document.getElementById('your_div_id'),
//style = img.currentStyle || window.getComputedStyle(img, false),
//bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
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
