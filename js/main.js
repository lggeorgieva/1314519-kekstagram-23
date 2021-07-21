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

const Code = {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
      };

const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';
const LOAD_URL   = 'https://23.javascript.pages.academy/kekstagram/data';
const SERVER_TIME = 10000;


// success/unsuccess request handling ---------------------------------------

let xhr = new XMLHttpRequest();

let setup = function (onLoad, onError) {
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === Code.OK) {
      onLoad(xhr.response);
    } else if (xhr.status === Code.BAD_REQUEST) {
      onError('Bad request: ' + xhr.status);
    } else if (xhr.status === Code.NOT_FOUND) {
      onError('Nothing was found: ' + xhr.status);
    } else if (xhr.status === Code.INTERNAL_SERVER_ERROR) {
      onError('Internal server error: ' + xhr.status);
    }
  });
}

xhr.addEventListener('error', function () {
  onError('Error connecting');
});

xhr.addEventListener('timeout', function () {
  onError('We were not able to carry out the request in ' + xhr.timeout + 'ms.');
  xhr.timeout = SERVER_TIME;  // TODO: Should these two lines be swapped?
  return xhr;
});

// Testing fetch() API when clicking submit
//const submitElt = document.querySelector("#upload-submit");
//submitElt.addEventListener('click', (event) => {
//   event.preventDefault();
//   fetch(LOAD_URL, { method:'GET', credentials:'same-origin' })
//   .then((response) => { console.log(response.status + ' ' + response.ok); return response.json(); })
//   .then((json) => { console.log(json); closeImage(); } )
//   .catch(console.log);
//});

const formSubmitElt = document.querySelector("#upload-select-image");
formSubmitElt.addEventListener('submit', (event) => {
   event.preventDefault();
   while(!isHashtagFieldValid()){}
   fetch(UPLOAD_URL, {
         method: 'POST',
         credentials:'same-origin',
         body: new FormData(formSubmitElt)})
   .then((response) => {
     if(!response.ok){
       throw new Error(response.status);
     }

     const successElt = document.querySelector('#success').cloneNode(true);
     alert(successElt);
     document.body.insertAdjacentElement('beforeend', successElt);
     alert('Here it is');closeImage();
   })
   .catch((error) => {console.log(error);});
 });



let ALL_PHOTOS = 25;
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
    return photos;
  }
  generatePhotos();

  function createPhotoElements() {

    for (var i = 0; i < photos.length; i++) {
      var newPhoto = pictureTemplate.cloneNode(true);
      newPhoto.querySelector('img').src = photos[i].url;
      newPhoto.querySelector('.picture__comments').textContent = photos[i].comments.length;
      newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
      fragment.appendChild(newPhoto);

    }
    pictureBlock.appendChild(fragment);
  };
  createPhotoElements();

  // The big photo

  var bigPicture = document.querySelector('.big-picture');

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
  }

//  setNewComment(11);
  getBigPhoto(11);

  //Open the big image by clicking at the small one.
  var miniPhotos = document.querySelectorAll('.picture');


  for (var i = 0; i < photos.length; i++) {
    miniPhotos[i].addEventListener('click', function (evt) {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('img').src = evt.target.src;

    })
  }

  //Close the big image.

  let closeBigPhoto = document.querySelector('#picture-cancel');

  closeBigPhoto.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

//Form
/*  let uploadForm = document.querySelector('.img-upload__form');

      uploadForm.addEventListener('submit', function (evt) {

          let data = new FormData(uploadForm);

          evt.preventDefault();

          function onLoad() {
              document.querySelector('.img-upload__overlay').classList.add('hidden');

          }
}




/*function load(onLoad, onError) {
  let xhr = setup(onLoad, onError);
  xhr.open('GET', LOAD_URL);
  xhr.send();
};

function upload(data, onLoad, onError) {
  let xhr = setup(onLoad, onError);
  xhr.open('POST', UPLOAD_URL);
  xhr.send(data);
};

window.backend = {
  load: load,
  upload: upload
};


let COMMENTS_COUNT_STEP = 5;
let socialComments = document.querySelector('.social__comments');
let loader = document.querySelector('.comments-loader');
let counter = {
  amount: 0};

  function commentsCounter() {
    this.amount += COMMENTS_COUNT_STEP;
  };
  function resetCounter() {
    this.amount = 0;
    loader.classList.add('hidden');
    loader.removeEventListener('click', onLoadMoreClick);
  }

  let renderComments = function (arr) {
  let fragment = document.createDocumentFragment();
  let commentsBlock = document.querySelector('.social__comments');
  let commentTemplate = commentsBlock.querySelector('.social__comment');
  arr.forEach(function (item) {
    let commentElement = commentTemplate.cloneNode(true);
    let commentAvatar = commentElement.querySelector('.social__picture');
    commentAvatar.src = item.avatar;
    commentAvatar.alt = item.name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';
    commentElement.querySelector('.social__text').textContent = item.message;
    fragment.appendChild(commentElement);
  });
  return fragment;
};


// show number of displayed comments ----------------------------------------
let renderCommentsCount = function (result, arr) {
  let commentsCountBlock = document.querySelector('.social__comment-count');
  let commentsCount = document.createElement('span');
  commentsCount.classList.add('comments-count');
  commentsCount.textContent = result + ' из ' + arr.length + ' комментариев';
  commentsCountBlock.textContent = '';
  commentsCountBlock.appendChild(commentsCount);
};

// get next comments to display with step of five comments ------------------
let getNextComments = function (arr) {
  let result;
  counter.doCount();
  renderCommentsCount(counter.amount, arr);
  result = arr.slice((counter.amount - COMMENTS_COUNT_STEP), counter.amount);
  if (counter.amount >= arr.length) {
    renderCommentsCount(arr.length, arr);
    counter.resetCount();
  }
  return result;
};

function showGallery() {
  let photosList = document.querySelector('.pictures');
  let galleryOverlay = document.querySelector('.gallery-overlay');
  let galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');


}

  function onGalleryOverlayEscPress(evt) {
    window.util.isEscEvent(evt, onGalleryOverlayClose);
  }

  //open the gallery
  function onGalleryOverlayOpen() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  }
/*
  // data load from server ----------------------------------------------------
  hashtagsFieldElt load = function (onLoad, onError) {
    let xhr = setup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };
/*
  // data upload to server ----------------------------------------------------
  let upload = function (data, onLoad, onError) {
    let xhr = setup(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };



  let comments;

  // comments counter ---------------------------------------------------------
  let counter = {
    amount: 0,
    doCount: function () {
      this.amount += COMMENTS_COUNT_STEP;
    },
    resetCount: function () {
      this.amount = 0;
      loader.classList.add('hidden');
      loader.removeEventListener('click', onLoadMoreClick);
    }
  };

  // add cooments to popup with big photo --------------------------------------
    let renderComments = function (arr) {
    let fragment = document.createDocumentFragment();
    let commentsBlock = document.querySelector('.social__comments');
    let commentTemplate = commentsBlock.querySelector('.social__comment');
    arr.forEach(function (item) {
      let commentElement = commentTemplate.cloneNode(true);
      let commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = item.avatar;
      commentAvatar.alt = item.name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      commentElement.querySelector('.social__text').textContent = item.message;
      fragment.appendChild(commentElement);
    });
    return fragment;
  };

  // show number of displayed comments ----------------------------------------
  let renderCommentsCount = function (result, arr) {
    let commentsCountBlock = document.querySelector('.social__comment-count');
    let commentsCount = document.createElement('span');
    commentsCount.classList.add('comments-count');
    commentsCount.textContent = result + ' из ' + arr.length + ' комментариев';
    commentsCountBlock.textContent = '';
    commentsCountBlock.appendChild(commentsCount);
  };

  // get next comments to display with step of five comments ------------------
  let getNextComments = function (arr) {
    let result;
    counter.doCount();
    renderCommentsCount(counter.amount, arr);
    result = arr.slice((counter.amount - COMMENTS_COUNT_STEP), counter.amount);
    if (counter.amount >= arr.length) {
      renderCommentsCount(arr.length, arr);
      counter.resetCount();
    }
    return result;
  };

  // get first five comments to display ---------------------------------------
  let getInitialComments = function (arr) {
    let result;
    comments = arr;
    if (arr.length <= COMMENTS_COUNT_STEP) {
      result = arr;
      renderCommentsCount(result, arr);
      loader.classList.add('hidden');
    }
    result = getNextComments(arr);
    return result;
  };

  // adds initial number of comments ------------------------------------------
  let initComments = function (arr) {
    return renderComments(getInitialComments(arr));
  };

  // set listener to comment loader button ------------------------------------
  let onLoadMoreClick = function () {
    socComments.appendChild(renderComments(getNextComments(comments)));
  };

  window.comments = {
    onLoadMoreClick: onLoadMoreClick,
    init: initComments,
    counter: counter
  };
}
/*let SERVER_URL = 'https://1510.dump.academy/kekstagram';
let SERVER_URL = 'https://js.dump.academy/kekstagram';

function setup(onLoad, onError) {
    let xhr = new XMLHttpRequest();


function showGallery() {
  let photosList = document.querySelector('.pictures');
  let galleryOverlay = document.querySelector('.gallery-overlay');
  let galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');


}

 // close the gallery by pressing esc


/*  function onGalleryOverlayEscPress(evt) {
    window.util.isEscEvent(evt, onGalleryOverlayClose);
  }

  //open the gallery
  function onGalleryOverlayOpen() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  }

  // close the gallery
  function onGalleryOverlayClose() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  }

  // photo clicks during capture
  photosList.addEventListener('click', function (evt) {
    evt.preventDefault(); // clicking does not reload the page
    window.preview(evt.target, galleryOverlay, onGalleryOverlayOpen);
  });

  // press enter when the photo is in focus
  photosList.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault(); // so that click does not reload
      window.preview(evt.target, galleryOverlay, onGalleryOverlayOpen);
    });
  };

  // Handler on pressing ENTER when the cross in the gallery is in focus
  galleryOverlayClose.addEventListener('click', onGalleryOverlayClose);


  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onGalleryOverlayClose);
  });
})();

/*Debounce provided

*(function () {
  let DEBOUNCE_INTERVAL = 300;
  let lastTimeout;

  // Переданный callback вызывается с задержкой
  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
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
