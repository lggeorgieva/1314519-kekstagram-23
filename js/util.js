

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

export {randomIntFromInterval};
