//var  alldata = {};

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
}

function draw(){
  background(0,180,255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

// for(){
//   var date = result[i].day;
//   var hrv = result[i].hrv;
//   var entry = new DataEntry(date, hrv)
//   alldata[date] = entry;
// }