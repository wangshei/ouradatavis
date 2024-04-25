var sleepscore = [];
var sleepsummarydate = [];

var activityscore = [];
var activitysummarydate = [];

var weightscore = [];
var weightsummarydate = [];
let normalizedWeightScores = [];

var readinessscore = [];
var readinesssummarydate = [];
let normalizedReadinessScores = [];

var earliest = Infinity;
var latest = 0;

let numLabels;
let labelSpacing;

var dateTimestamps;

var latestTimeStamp;
var earliestTimeStamp;
let minWeightScore; 
let maxWeightScore;

let maxReadinessScore;
let minReadinessScore;

let minSleepScore;
let maxSleepScore;
let minActivityScore;
let maxActivityScore;

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

  weight_lbs = weight.weight_lbs;
  day_weight = weight.day_weight;

  cal_active = activity.cal_active;
  sleepscore = sleep.score;
  sleepsummarydate = sleep.summary_date;

  activityscore = activity.score;
  activitysummarydate = activity.summary_date;

  weightscore = weight.weight_lbs;
  weightsummarydate = weight.day_weight;


  readinessscore = readiness.score;
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
  return 65 + (timestamp - earliestTimeStamp) * (865 - 65) / (latestTimeStamp - earliestTimeStamp);
});

// console.log(xPositions);

minWeightScore = Math.min(...weightscore);
maxWeightScore = Math.max(...weightscore);

normalizedWeightScores = weightscore.map(
  (score) =>
    (score - minWeightScore) / (maxWeightScore - minWeightScore)
);

// Calculate the minimum and maximum values of the weight scores
minReadinessScore = Math.min(...readinessscore);
maxReadinessScore = Math.max(...readinessscore);

normalizedReadinessScores = readinessscore.map(
  (score) =>
    (score - minReadinessScore) /
    (maxReadinessScore - minReadinessScore)
);

minSleepScore = Math.min(...sleepscore);
maxSleepScore = Math.max(...sleepscore);
normalizedSleepScores = sleepscore.map((score) => {
  // Scale the score value to the new range
  return (score - minSleepScore) / (maxSleepScore - minSleepScore);
});

minActivityScore = Math.min(...activityscore);
maxActivityScore = Math.max(...activityscore);
normalizedActivityScores = activityscore.map((score) => {
  // Scale the score value to the new range
  return (score - minActivityScore) / (maxActivityScore - minActivityScore);
});

})



let divWidth;
let divHeight;
function setup(){
  divWidth = document.getElementById('overview-graph').clientWidth;
  divHeight = document.getElementById('overview-graph').clientHeight;
  // console.log(divWidth + ", " + divHeight);

  var canvas = createCanvas(divWidth, divHeight);
  canvas.parent("overview-graph");
  frameRate(60);

  
}


                
      
function draw() {
  divWidth = document.getElementById('overview-graph').clientWidth;
  divHeight = document.getElementById('overview-graph').clientHeight;
  fill(255);

  rect(0,0,divWidth, divHeight);

    textAlign(CENTER, CENTER);
    textSize(20);
  
    xtop = divWidth*0.1;
    ytop = divHeight*0.1;
    xbottom = divWidth*0.9;
    ybottom = divHeight*0.9;
    graphheight = ybottom-ytop;

    // Once data is processed, draw the graph
    background(255);
    stroke(0);
    fill(0);
  
    textAlign(LEFT, CENTER);
  
    // Draw hash marks and labels on the y-axis
    for (let i = 0; i <= 10; i++) {
      let y = map(i / 10, 0, 1, height - 50, 50); // Calculate y-coordinate for each hash mark
      line(60, y, 65, y); // Draw the hash mark
      textAlign(RIGHT, CENTER);
      noStroke();
      text(i / 10, 60, y); // Label the hash mark
    }
  stroke(0);
  fill(0);

  bar_width = (xbottom - xtop) / activitysummarydate.length;



  // Draw date labels horizontally without rotation
  textAlign(CENTER, CENTER);
  labelSpacing = Math.ceil(sleepsummarydate.length / 5); // Spacing between date labels
  for (let i = 0; i < sleepsummarydate.length; i += labelSpacing) {
    let x = map(i, 0, sleepsummarydate.length - 1, 65, 865); // Calculate x-coordinate for each date label
    let y = ybottom + 20; // Adjust vertical position
    text(sleepsummarydate[i], x, y); // Display the date label
  }

  // Draw lines connecting sleep score data points
  stroke(64, 119, 27);
  for (let i = 0; i < sleepsummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    // console.log(sleepscore[i]);
    let y1 = (-(sleepscore[i]) / 100) * ybottom + ybottom;
    let x2 = xPositions[i + 1];
    let y2 = (-sleepscore[i + 1] / 100) * ybottom + ybottom;
    line(x1, y1, x2, y2);
  }

  // Draw lines connecting activity score data points
  stroke(134, 77, 191); // Change color to red
  for (let i = 0; i < activitysummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    let y1 = (-activityscore[i]/ 100) * ybottom + ybottom;

    let x2 = xPositions[i + 1];
    let y2 = (-activityscore[i + 1] / 100) * ybottom + ybottom;
    line(x1, y1, x2, y2);
  }

  // Draw lines connecting weight score data points
  stroke(0, 164, 186); // Change color to green
  for (let i = 0; i < weightsummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    let y1 = -normalizedWeightScores[i] * ybottom + ybottom;
    let x2 = xPositions[i + 1];
    let y2 = -normalizedWeightScores[i + 1] * ybottom + ybottom;
    


    line(x1, y1, x2, y2);
  }

  // Draw lines connecting readiness score data points
  stroke(211, 100, 100); // Change color to purple

  for (let i = 0; i < readinesssummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    let y1 = -normalizedReadinessScores[i] * ybottom + ybottom;
    let x2 = xPositions[i + 1];
    let y2 = -normalizedReadinessScores[i + 1] * ybottom + ybottom;
    console.log("x1: "+ x1 + ", y1: " + y1);
    console.log("x2: "+ x2 + ", y2: " + y2);
    line(x1, y1, x2, y2);
  }

  // Draw circles at each sleep score data point
  for (var i = 0; i < sleepsummarydate.length; i++) {
    stroke(0);
    fill(255, 255, 255);

    var xpos = xPositions[i];
    var ypos = (-sleepscore[i] / 100) * ybottom + ybottom;
    circle(xpos, ypos, 4);
  }

  // Draw circles at each activity score data point
  for (var i = 0; i < activitysummarydate.length; i++) {
    stroke(0);
    fill(255, 255, 255); // Set fill color to white

    var xpos = xPositions[i];
    var ypos = (-activityscore[i] / 100) * ybottom + ybottom;
    circle(xpos, ypos, 4); // Draw a circle at the activity score data point
  }

  // Draw circles at each weight score data point
  for (var i = 0; i < weightsummarydate.length; i++) {
    stroke(0);
    fill(255, 255, 255); // Set fill color to white

    var xpos = xPositions[i];
    var ypos = -normalizedWeightScores[i] * ybottom + ybottom;
    circle(xpos, ypos, 4); // Draw a circle at the normalized weight score data point
  }

  // Draw circles at each readiness score data point
  for (var i = 0; i < readinesssummarydate.length; i++) {
    stroke(0);
    fill(255, 255, 255); // Set fill color to white

    var xpos = xPositions[i];
    var ypos = -normalizedReadinessScores[i] * ybottom + ybottom;
    circle(xpos, ypos, 4); // Draw a circle at the normalized readiness score data point
  }

  // Draw axes
  stroke(0);
  fill(0);
  line(xtop, ybottom, xbottom, ybottom); // x-axis
  line(xtop, ytop, xtop, ybottom); // y-axis
  noStroke(0);
  textAlign(CENTER, CENTER);
  text("score", xtop, 20); // y-axis label
  textAlign(LEFT, CENTER);
  text("Date", xbottom, ybottom); // x-axis label
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
