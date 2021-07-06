const images =[];

function randomIntFromInterval(min, max) { // min and max included
  if (min < 0 || max < 0) {
    return 'min и max должны быть больше нуля!';
  }
  if (min > max) {
    [min, max] = [max, min];
    //max = [min, max = min][0];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const message =['Всё отлично!', 'В целом всё неплохо.', 'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const authors= ['Lilia', 'Patrick', 'Vivi', 'Olga', 'Daniel'];


function randomComment(idx){
  const comment = {
    id: idx,
    avatar: 'img/avatar-' + randomIntFromInterval(1, 6))  +  '.svg',
    message: message[randomIntFromInterval(0, message.length-1)],
    name: authors[randomIntFromInterval(0, authors.length-1)],
  };
  return comment;
}

for(let idx = 1; idx <= 25; idx++){
  const image = {
    id: idx,
    url: 'photos/' + idx +'.jpg',
    description: 'Lovely lake',
    likes: randomIntFromInterval(15, 200),
    comments: [randomComment(2*idx),randomComment(2*idx +1) ],
    name: authors[randomIntFromInterval(0, authors.length-1)],
  };
  images.push(image);
}
//console.log(images);
