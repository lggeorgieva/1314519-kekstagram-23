function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

randomIntFromInterval(1, 100);

function truncate(str, lengthValue){

  return (str.length > lengthValue);
}

truncate('Bla', 1);

// Between 0 and max

function randomZeroMax(max){
  return Math.floor(Math.random() * (max + 1));
}

randomZeroMax(10);

// Between 1 and max

function randomOneMax(max){
  return Math.floor(Math.random() * max) + 1;}

randomOneMax(5);
