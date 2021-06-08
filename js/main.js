function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


randomIntFromInterval(1, 100);

function truncate(str, n){
  return (str.length > n) ? true : false;
}

truncate("Bla", 1);







