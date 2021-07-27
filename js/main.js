// Frequently used DOM elements (names ending in Elts are a list of elements)
const sliderElt = document.querySelector('.effect-level__slider');
const scaleControlValueElt = document.querySelector('.scale__control--value');
const uploadPreviewImgElt = document.getElementById('LG-PreviewImage');
const overlayElt = document.querySelector('.img-upload__overlay');
const effectsPreviewElts = document.querySelectorAll('.effects__preview');
const effectLevelValueElt = document.querySelector('.effect-level__value');
const hashtagsFieldElt = document.querySelector('.text__hashtags');
const uploadFormElt = document.querySelector('#upload-select-image');
const galleryFiltersButtonsElt = document.querySelector('.img-filters');
const galleryFiltersButtonsDefaultElt = document.querySelector('#filter-default');
const galleryFiltersButtonsRandomElt = document.querySelector('#filter-random');
const galleryFiltersButtonsDiscussedElt =document.querySelector('#filter-discussed');
// Mutable global variables
let scaleFactor = 100;  // current scale factor (in percent)
let effect = 'none';    // current effect


// Creating the slider and some slider utility functions
noUiSlider.create(sliderElt, { range:{ min:0, max:1 }, start:1 });

function showSlider() {
  sliderElt.classList.remove('hidden');
  sliderElt.noUiSlider.updateOptions({start:1});
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


// Hashtags stuff - not quite complete
// TODO: rename function, document, possibly return list of hashtags
function isHashtagFieldValid() {
  // Remove extra spaces and convert to lower case
  hashtagsFieldElt.setCustomValidity('');
  const fieldValue = hashtagsFieldElt.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();
  hashtagsFieldElt.value = fieldValue;

  // Empty string is okay
  if (fieldValue === '') {
    return true;
  }

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
      if (hashtagsArray[i].length === 1) {
        message='Hashtags must have more than one character'; break;
      }
      if (hashtagsArray[i].search(/[^A-Za-z#_\d]/i) !== -1) {
        message = 'Hashtags consist of letters and numbers only'; break;
      }
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
    return false;
  }
}


// --- server stuff -------------------------------------------------------



const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';
const LOAD_URL   = 'https://23.javascript.pages.academy/kekstagram/data';
const SERVER_TIME = 10000;


const submitFormElt = document.querySelector("#upload-select-image");
const submitButtonElt = document.querySelector("#upload-submit");
const successTemplateElt = document.querySelector('#success');
const errorTemplateElt= document.querySelector('#error');
submitButtonElt.addEventListener('click', (event) => {
  event.preventDefault();
  if (!isHashtagFieldValid()) { return; }

  //console.log(new FormData(submitFormElt));
  let formData = new FormData(submitFormElt);
  formData.set('filename', file.name);
  for(let[name, value] of formData){alert(name + ' ' + value);}
  alert("I work");
  fetch(UPLOAD_URL,
        { method: 'POST',
          credentials: 'same-origin',
          body: formData })
  .then((response) => {
    if (!response.ok) { throw new Error(response.status); }
    let successElt = successTemplateElt.content.cloneNode(true);
    document.body.appendChild(successElt);
    closeImage();
  })
  .catch((error) => {
    let errorElt = errorTemplateElt.content.cloneNode(true);
    errorElt.querySelector('#errormessage').innerHTML=error;
    document.body.appendChild(errorElt);
    closeImage();
  });
});



const ALL_PHOTOS = 25;
let commentsArray = [];
let photos = [];
let comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  let description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  let pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  let pictureBlock = document.querySelector('.pictures');
  let fragment = document.createDocumentFragment();
  let commentTemplate = document.querySelector('#picture__comments');//.content.querySelector('li');
  let commentBlock = document.querySelector('.social__comments');

  // Random integer between min and max
  function randInt(min, max) {
    var like = Math.floor(Math.random() * (max - min + 1)) + min;
    return like;
  };


  function genComents() {
    if (randInt(1, 2) === 2) {
      commentsArray = [
        comments[randInt(0, comments.length - 1)],
        comments[randInt(0, comments.length - 1)]
      ]
    } else {
      commentsArray = [
        comments[randInt(0, comments.length - 1)]
      ]
    }
    return commentsArray;
  }

  //Generate All photos

function generatePhotos() {
    for (var i = 1; i <= ALL_PHOTOS; i++) {
      photos[i - 1] = {
        url: 'photos/' + i + '.jpg',
        likes: randInt(15, 200),
        comments: genComents(),
        description: description[randInt(0, description.length - 1)]
      }
    }
    //return photos;
  }
generatePhotos();

function createPhotoElements(photos) {
    for (var i = 0; i < photos.length; i++) {
      var newPhoto = pictureTemplate.cloneNode(true);
      newPhoto.querySelector('img').src = photos[i].url;
      newPhoto.querySelector('.picture__comments').textContent = photos[i].comments.length;
      newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
      fragment.appendChild(newPhoto);

    }
    pictureBlock.appendChild(fragment);
    galleryFiltersButtonsElt.classList.remove('img-filters--inactive');
  };
  //createPhotoElements(photos.sort((a,b) => b.comments.length-a.comments.length));

  // The big photo

 const bigPicture = document.querySelector('.big-picture');

/*
function getBigPhoto(nu) {
    bigPicture.querySelector('.big-picture__img img').src = photos[nu].url;
    bigPicture.querySelector('.likes-count').textContent = photos[nu].likes;
    bigPicture.querySelector('.comments-count').textContent = photos[nu].comments.length;
    bigPicture.querySelector('.social__caption').textContent = photos[nu].description;
    commentBlock.appendChild(fragment);
  }
function setNewComment(nu) {
    for (var i = 0; i < photos[nu].comments.length; i++) {
      var newComment = commentTemplate.cloneNode(true);
      newComment.querySelector('img').src = 'img/avatar-' + randInt(1, 6) + '.svg';
      newComment.querySelector('.social__text').textContent = photos[nu].comments[i];
      fragment.appendChild(newComment);
    }
  }*/

//  setNewComment(11);
//getBigPhoto(11);

  //Open the big image by clicking at the small one.



function makeGalleryClickable(photos){
    const miniPhotos = document.querySelectorAll('.picture');
    for (let i = 0; i < photos.length; i++) {
        miniPhotos[i].addEventListener('click', function (evt) {
            bigPicture.classList.remove('hidden');
            bigPicture.querySelector('img').src = evt.target.src;
        })
    }
}

//makeGalleryClickable();

  //Close the big image.

let closeBigPhoto = document.querySelector('#picture-cancel');

closeBigPhoto.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
});

function showPicturesByServerOrder(){
    createPhotoElements(photos);
    makeGalleryClickable(photos);
}

showPicturesByServerOrder();


function showPicturesByCommentOrder(){
  alert("Start");
   photosCopy =[];
   for(let i =0; i< photos.length; i++){
     photosCopy[i] = photos[i];
   }
   photosCopy.sort((a,b) => b.comments.length-a.comments.length);
   createPhotoElements(photosCopy);
   makeGalleryClickable(photosCopy);
}

galleryFiltersButtonsDefaultElt.addEventListener('click', showPicturesByServerOrder);
galleryFiltersButtonsDiscussedElt.addEventListener('click', showPicturesByCommentOrder);
