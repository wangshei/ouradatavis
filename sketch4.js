function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
}

function draw(){
  background(0,180,90);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
