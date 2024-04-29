
var sleepsummarydate = [];
var activitysummarydate = [];

var weightsummarydate = [];
var readinesssummarydate = [];

var earliest = Infinity;
var latest = 0;

let numLabels;
let labelSpacing;

var dateTimestamps;

var latestTimeStamp;
var earliestTimeStamp;

let xbottom;
let xtop;
let ybottom;
let ytop;

document.addEventListener('DOMContentLoaded', () => {
  // Load data from local storage
  function loadData() {
      const defaultData = {score: [], light: [], rem: [], deep: [], total: [], onset_latency: [], summary_date: [], efficiency: [], insights: [] };
      sleep = JSON.parse(localStorage.getItem('sleepData')) || defaultData;
      activity = JSON.parse(localStorage.getItem('activityData')) || {score: [], summary_date: [], cal_active: [], steps: [], insights: [] };
      weight = JSON.parse(localStorage.getItem('weightData')) || { weight_lbs: [], day_weight: [] };
      readiness = JSON.parse(localStorage.getItem('readinessData')) || { summary_date: [], score: [], insights: [] };
  }

  // Function to update the DOM with insights
  function displayInsights() {
      updateInsights('sleep', sleep.insights);
      updateInsights('activity', activity.insights);
      updateInsights('readiness', readiness.insights);
  }

  // Initialize the application
  loadData();
  steps = activity.steps;
  total = sleep.total;
  summary_date = sleep.summary_date;
  //activityscore = activity.score;
  activitysummarydate = activity.summary_date;

  weight_lbs = weight.weight_lbs;
  weightsummarydate = weight.day_weight;


  //readinessscore = readiness.score;
  readinesssummarydate = readiness.summary_date;
  
  numLabels = 5; // Number of date labels to show

  dateTimestamps = sleepsummarydate.map((dateString) => {
    var parts = dateString.split("/");
    var year = parseInt(parts[2]) + 2000; // Assuming the year is represented as two digits
    var month = parseInt(parts[0]) - 1; // Months are 0-indexed in JavaScript
    var day = parseInt(parts[1]);
    return new Date(year, month, day).getTime(); // Convert to timestamp
  });
  
  // console.log(dateTimestamps);
  

labelSpacing = Math.ceil(sleepsummarydate.length / numLabels); // Calculate spacing between date labelslet xPositions = [];
// Calculate earliest and latest timestamps
latestTimeStamp = Math.max(...dateTimestamps);
earliestTimeStamp = Math.min(...dateTimestamps);
// console.log(latestTimeStamp);
// console.log(earliestTimeStamp);


xPositions = dateTimestamps.map((timestamp) => {
  // Scale the timestamp value to the new range
  return 65 + (timestamp - earliestTimeStamp) * (xbottom-xtop) / (latestTimeStamp - earliestTimeStamp);
});

// console.log(xPositions);

longest = 0;
bar_width = (xbottom-xtop)/(total.length);
                for(var i = 0; i <= total.length; i++){
                  var t = total[i];
                  if (t>longest){
                    longest = t;
                    //console.log(longest + "is longest");
                  }
                }
                lightest = 1000;
                heaviest = 0;
                        for(var i = 0; i <= weight_lbs.length; i++){
                          var t = weight_lbs[i];
                          if (t>heaviest){
                            heaviest = t;
                            //console.log(heaviest + "is heaviest");
                          }
                          if (t<lightest){
                            lightest = t;
                            //console.log(lightest + "is lightest");
                          }
                        }


                        maxStepValue = 0;
                        for(var i = 0; i <= steps.length; i++){
                          var t = steps[i];
                          if (t>maxStepValue){
                            maxStepValue = t;
                            //console.log(heaviest + "is heaviest");
                          }  }
                          


})



let divWidth;
let divHeight;
let graphheight;
function setup(){
  divWidth = document.getElementById('overview-graph').clientWidth;
  divHeight = document.getElementById('overview-graph').clientHeight;
  // console.log(divWidth + ", " + divHeight);

  var canvas = createCanvas(divWidth, divHeight);
  canvas.parent("overview-graph");
  frameRate(60);

  
}


                
      
function draw() {
  
  weight_lbs = weight.weight_lbs;
  day_weight = weight.day_weight;

  steps = activity.steps;
  total = sleep.total;
  sleepsummarydate = sleep.summary_date;

  activityscore = activity.score;
  activitysummarydate = activity.summary_date;

  weightscore = weight.weight_lbs;
  weightsummarydate = weight.day_weight;


  readinessscore = readiness.score;
  readinesssummarydate = readiness.summary_date;

  divWidth = document.getElementById('overview-graph').clientWidth;
  divHeight = document.getElementById('overview-graph').clientHeight;
  fill(255);

  rect(0,0,divWidth, divHeight);

    textAlign(CENTER, CENTER);
    textSize(13);
  
    xtop = divWidth*0.1;
    ytop = divHeight*0.08;
    xbottom = divWidth*0.95;
    ybottom = divHeight*0.85;
    graphheight = ybottom-ytop;

    // Once data is processed, draw the graph
    background(255);
    stroke(0);
    fill(0);
  
  
    // Draw hash marks and labels on the y-axis
    for (let i = 0; i <= 10; i++) {
      let y = map(i / 10, 0, 1, ybottom, ytop); // Calculate y-coordinate for each hash mark
      line(xtop, ytop, xtop, ybottom); // Draw the hash mark
      textAlign(RIGHT, CENTER);
      noStroke();
      text(i *10+"%-", xtop, y); // Label the hash mark
    }
    bar_width = (xbottom - xtop) / summary_date.length;


  // Draw date labels horizontally without rotation
  textAlign(LEFT, CENTER);
  for (var i = 0; i<summary_date.length; i++){
    if (i%2==0){
     push();
     translate(xtop + i * bar_width+5, ybottom+5);
     rotate(HALF_PI/2); // default is radiants
     text(summary_date[i],0,0);
     //console.log(summary_date[i]);
     pop(); // go back to the original codition so we can isolate different things)
 
     }

   }

  stroke(0);
  fill(0);




  weight_lbs = weight.weight_lbs;
  day_weight = weight.day_weight;

  cal_active = activity.cal_active
  for (var i = 0; i < sleepsummarydate.length; i++) {
    strokeWeight(1)
    stroke(255)
    fill(224,227,255);

     barHeight = total[i] / ((longest-0)/graphheight);
      let yPos = ybottom - barHeight;
      let xPos = xtop + 5 + i * bar_width+1;
      rect(xPos, yPos, bar_width, barHeight);


  strokeWeight(2)
  stroke(165,164,201)
  //console.log(cal_active[i])

  let steps_x1 = xtop + 5+ bar_width*[i];
    let steps_y1 = (-steps[i]/maxStepValue)*graphheight+ybottom
    //let steps_y1 = map(steps[i], 0, maxsteps, height, 0);//map from height to 0
    //let steps_y2 = map(steps[i + 1], 0, maxsteps, height, 0);//map from height to 0
    let steps_y2 = -(steps[i+1]/maxStepValue)*graphheight+ybottom
    let steps_x2 = xtop + 5+ bar_width*[i+1];

    line(steps_x1, steps_y1, steps_x2, steps_y2);
circle(steps_x1, steps_y1,2)
  stroke(29,27,119)
  let weight_x1 = xtop + 5+ bar_width*[i];
  let weight_y1 = (-(weight_lbs[i]-lightest)/(heaviest-lightest))*graphheight+ybottom;
  let weight_x2 = xtop + 5+ bar_width*[i+1];
  let weight_y2 = (-(weight_lbs[i+1]-lightest)/(heaviest-lightest))*graphheight+ybottom;
  //console.log(weight_y1, weight_y2)
  line(weight_x1,weight_y1, weight_x2, weight_y2);
  circle(weight_x1,weight_y1,2)
  }


  // Draw axes
  strokeWeight(1)

  stroke(0);
  fill(0);

  line(xtop, ybottom, xbottom+5, ybottom); // x-axis
  line(xtop, ytop, xtop, ybottom); // y-axis
  noStroke(0);
  textAlign(CENTER, CENTER);
  text("Max", xtop, ytop-10); // y-axis label
  textAlign(LEFT, CENTER);
  text("Date", xbottom+5, ybottom); // x-axis label

  text(message, (xbottom+xtop)/2, ytop-15)
  //console.log(message)
}

let message;

  function mouseMoved(){
    // fill(230, 232, 243);
    // stroke(230, 232, 243);

  //console.log("mouse move called")
    for (var i = 0; i<summary_date.length; i++){
      

      let barHeight = total[i] / ((longest-0)/graphheight);
      let yPos = ybottom - barHeight;
      let xPos = xtop + 5 + i * bar_width+1;

      let barHeight2 = -(steps[i]/maxStepValue)*graphheight+ybottom
      let xPos2 =  xtop + 5+ bar_width*[i];
    

    let xPos3 = xtop + 5+ bar_width*[i];
    let barHeight3 = (-(weight_lbs[i]-lightest)/(heaviest-lightest))*graphheight+ybottom;
   
      if(mouseX > xPos && mouseX < xPos+bar_width && mouseY > yPos && mouseY < yPos+barHeight){
        message = "Total Sleep is "+(round(total[i]/3600,2)).toString()+"h on "+summary_date[i];
        //console.log(message+"is message 1")
    }
    if(mouseX > xPos2-5 && mouseX < xPos2+5 && mouseY > barHeight2-5 && mouseY < barHeight2+5){
      message = "Steps count is "+(steps[i]).toString()+" on "+summary_date[i];
     //console.log(message+"is message 2")

  } if(mouseX > xPos3-5 && mouseX < xPos3+5 && mouseY > barHeight3-5 && mouseY < barHeight3+5){
    message = "Weight is "+(weight_lbs[i]).toString()+"lb on "+summary_date[i];
   console.log(message+"is message 3")

}


  }
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
