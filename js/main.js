
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
  //const reader = new FileReader();

  //reader.addEventListener("load", function () {
    // convert image file to base64 string
    //preview.src = reader.result;
  //}, false);

  //if (file) {
  //  reader.readAsDataURL(file);
//  }
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
