import './util.js';

const message =['Всё отлично!', 'В целом всё неплохо.', 'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const authors= ['Lilia', 'Patrick', 'Vivi', 'Olga', 'Daniel'];

const images =[];
for(let idx = 1; idx <= 25; idx++){
  const image = {
    id: idx,
    url: 'photos/{{i}}.jpg'.replace('{{i}}', idx),
    description: 'Lovely lake',
    likes: randomIntFromInterval(15, 200),
    comments: message[randomIntFromInterval(0, message.length-1)],
    name: authors[randomIntFromInterval(0, authors.length-1)],
  };
  images.push(image);
}
