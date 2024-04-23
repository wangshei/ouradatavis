// let sleepFile;
// let activityFile;
// let weightFile;
// let readinessFile;
let sleepDataProcessed = false;
let activityDataProcessed = false;
let weightDataProcessed = false;
let readinessDataProcessed = false;
let xPositions = [];
// // let bar_width = 14.75;

// // Get the selected file when input changes
// document.getElementById("sleepFile").addEventListener("change", (event) => {
//   sleepFile = event.target.files[0]; // selecting the file
// });

// document.getElementById("activityFile").addEventListener("change", (event) => {
//   activityFile = event.target.files[0]; // selecting the file
// });

// document.getElementById("weightFile").addEventListener("change", (event) => {
//   weightFile = event.target.files[0]; // selecting the file
// });

// document.getElementById("readinessFile").addEventListener("change", (event) => {
//   readinessFile = event.target.files[0]; // selecting the file
// });

// set up arrays to be populated
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

// // Function to filter data by the first month
// function filterDataByFirstMonth(summaryDates, scores) {
//     // Get the date of the first entry
//     const firstDate = new Date(summaryDates[0]);
//     // Get the month of the first entry
//     const firstMonth = firstDate.getMonth();
    
//     // Filter out data entries that belong to the first month
//     const filteredSummaryDates = [];
//     const filteredScores = [];
//     for (let i = 0; i < summaryDates.length; i++) {
//         const currentDate = new Date(summaryDates[i]);
//         if (currentDate.getMonth() === firstMonth) {
//             filteredSummaryDates.push(summaryDates[i]);
//             filteredScores.push(scores[i]);
//         } else {
//             // Stop once data entries from the next month are encountered
//             break;
//         }
//     }
    
//     return { filteredSummaryDates, filteredScores };
// }

// //sleep
// document.getElementById("upload-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   let fileReader = new FileReader();

//   // Read the selected file as binary string
//   fileReader.readAsBinaryString(sleepFile);

//   // Process the file data when it's loaded
//   fileReader.onload = (event) => {
//     let fileData = event.target.result;

//     // Read the Excel workbook
//     let workbook = XLSX.read(
//       fileData,
//       { type: "binary" },
//       { dateNF: "mm/dd/yyyy" }
//     );

//     // Change each sheet in the workbook to json
//     workbook.SheetNames.forEach(async (sheet) => {
//       const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//         raw: false,
//       });

//       if (sleepFile) {
//         for (var i = 0; i < result.length; i++) {
//           sleepscore.push(result[i].score);
//           sleepsummarydate.push(result[i].summary_date);
//         }

//         // Normalize the sleep score data from 0 to 1
//         let minSleepScore = Math.min(...sleepscore);
//         let maxSleepScore = Math.max(...sleepscore);
//         let normalizedSleepScores = sleepscore.map((score) =>
//           map(score, minSleepScore, maxSleepScore, 0, 1)
//         );

//         // Filter sleep data by the first month
//         const { filteredSummaryDates, filteredScores } = filterDataByFirstMonth(sleepsummarydate, sleepscore);

//         // Create dateTimestamps array
//         var dateTimestamps = filteredSummaryDates.map((dateString) => {
//           noStroke();
//           var parts = dateString.split("/");
//           var year = parseInt(parts[2]) + 2000; // Assuming the year is represented as two digits
//           var month = parseInt(parts[0]) - 1; // Months are 0-indexed in JavaScript
//           var day = parseInt(parts[1]);
//           return new Date(year, month, day).getTime(); // Convert to timestamp
//         });

//         // Calculate earliest and latest timestamps
//         var latestTimeStamp = Math.max(...dateTimestamps);
//         var earliestTimeStamp = Math.min(...dateTimestamps);

//         xPositions = dateTimestamps.map((timestamp) =>
//           map(timestamp, earliestTimeStamp, latestTimeStamp, 65, 865)
//         );

//         sleepDataProcessed = true;
//         checkDataProcessed();
//       }
//     });
//   };
// });

// //activity
// document.getElementById("upload-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   let fileReader2 = new FileReader();

//   // Read the selected file as binary string
//   fileReader2.readAsBinaryString(activityFile);

//   // Process the file data when it's loaded
//   fileReader2.onload = (event) => {
//     let fileData2 = event.target.result;

//     // Read the Excel workbook
//     let workbook = XLSX.read(
//       fileData2,
//       { type: "binary" },
//       { dateNF: "mm/dd/yyyy" }
//     );

//     // Change each sheet in the workbook to json
//     workbook.SheetNames.forEach(async (sheet) => {
//       const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//         raw: false,
//       });

//       if (activityFile) {
//         for (var i = 0; i < result2.length; i++) {
//           activityscore.push(result2[i].score);
//           activitysummarydate.push(result2[i].summary_date);
//         }
//         // Normalize the activity score data from 0 to 1
//         let minActivityScore = Math.min(...activityscore);
//         let maxActivityScore = Math.max(...activityscore);
//         let normalizedActivityScores = activityscore.map((score) =>
//           map(score, minActivityScore, maxActivityScore, 0, 1)
//         );

//         // Filter activity data by the first month
//         const { filteredSummaryDates, filteredScores } = filterDataByFirstMonth(activitysummarydate, activityscore);

//         activityDataProcessed = true;
//         checkDataProcessed();
//       }
//     });
//   };
// });

// //weight
// document.getElementById("upload-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   let fileReader2 = new FileReader();

//   // Read the selected file as binary string
//   fileReader2.readAsBinaryString(weightFile);

//   // Process the file data when it's loaded
//   fileReader2.onload = (event) => {
//     let fileData2 = event.target.result;

//     // Read the Excel workbook
//     let workbook = XLSX.read(
//       fileData2,
//       { type: "binary" },
//       { dateNF: "mm/dd/yyyy" }
//     );

//     // Change each sheet in the workbook to json
//     workbook.SheetNames.forEach(async (sheet) => {
//       const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//         raw: false,
//       });

//       if (weightFile) {
//         for (var i = 0; i < result2.length; i++) {
//           // Parse the weight value as an integer
//           let weight = parseInt(result2[i].weight_lbs);
//           weightscore.push(weight);
//           weightsummarydate.push(result2[i].day);
//         }

//         // Calculate the minimum and maximum values of the weight scores
//         let minWeightScore = Math.min(...weightscore);
//         let maxWeightScore = Math.max(...weightscore);

//         // Normalize the weight score data from 0 to 1 and assign to normalizedWeightScores
//         normalizedWeightScores = weightscore.map(
//           (score) =>
//             (score - minWeightScore) / (maxWeightScore - minWeightScore)
//         );

//         weightDataProcessed = true;
//         checkDataProcessed();
//       }
//     });
//   };
// });

// //readiness
// document.getElementById("upload-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   let fileReader2 = new FileReader();

//   // Read the selected file as binary string
//   fileReader2.readAsBinaryString(readinessFile);

//   // Process the file data when it's loaded
//   fileReader2.onload = (event) => {
//     let fileData2 = event.target.result;

//     // Read the Excel workbook
//     let workbook = XLSX.read(
//       fileData2,
//       { type: "binary" },
//       { dateNF: "mm/dd/yyyy" }
//     );

//     // Change each sheet in the workbook to json
//     workbook.SheetNames.forEach(async (sheet) => {
//       const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//         raw: false,
//       });

//       if (readinessFile) {
//         for (var i = 0; i < result2.length; i++) {
//           // Parse the weight value as an integer
//           let readiness = parseInt(result2[i].score);
//           readinessscore.push(readiness);
//           readinesssummarydate.push(result2[i].day);
//         }

//         // Calculate the minimum and maximum values of the weight scores
//         let minReadinessScore = Math.min(...readinessscore);
//         let maxReadinessScore = Math.max(...readinessscore);

//         // Normalize the readiness score data from 0 to 1 and assign to normalizedReadinessScores
//         normalizedReadinessScores = readinessscore.map(
//           (score) =>
//             (score - minReadinessScore) / (maxReadinessScore - minReadinessScore)
//         );

//         readinessDataProcessed = true;
//         checkDataProcessed();
//       }
//     });
//   };
// });

// function checkDataProcessed() {
//   if (sleepDataProcessed && activityDataProcessed && weightDataProcessed && readinessDataProcessed) {
//     redraw(); // Redraw the canvas once all data is processed
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  // Load data from local storage
  function loadData() {
      const defaultData = { light: [], rem: [], deep: [], total: [], onset_latency: [], summary_date: [], efficiency: [], insights: [] };
      sleep = JSON.parse(localStorage.getItem('sleepData')) || defaultData;
      activity = JSON.parse(localStorage.getItem('activityData')) || { summary_date: [], cal_active: [], steps: [], insights: [] };
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

  
sleepscore = sleep.sleepscore;
sleepsummarydate = sleep.sleepsummarydate;

activityscore = activity.activityscore;
activitysummarydate = activity.activitysummarydate;

weightscore = weight.weightscore;
weightsummarydate = weight.weightsummarydate;
normalizedWeightScores = weight.normalizedWeightScores;

readinessscore = [];
readinesssummarydate = [];
normalizedreadinessScores = [];
})

function setup(){
  let divWidth = document.getElementById('overview-graph').clientWidth;
  let divHeight = document.getElementById('overview-graph').clientHeight;
  console.log(divWidth + ", " + divHeight);

  var canvas = createCanvas(divWidth, divHeight);
  canvas.parent("overview-graph");
  frameRate(60);

  
}

function draw() {
  console.log("figfhton")
    if (!sleepDataProcessed || !activityDataProcessed || !weightDataProcessed || !readinessDataProcessed) {
      background(255);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(0);
      return; // Exit draw function until all data is processed
    }
  
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
  
    // Calculate spacing between date labels
    let numLabels = 5; // Number of date labels to show
    let labelSpacing = Math.ceil(sleepsummarydate.length / numLabels); // Calculate spacing between date labels
  
    // Draw date labels horizontally
    textAlign(CENTER, CENTER);
    for (let i = 0; i < sleepsummarydate.length; i += labelSpacing) {
      let x = map(i, 0, sleepsummarydate.length - 1, 65, 865); // Calculate x-coordinate for each date label
      let y = height - 30;
      text(sleepsummarydate[i], x, y); // Display the date label
    }
  
    // Draw lines connecting sleep score data points
    strokeWeight(2); // Set the stroke weight to 2 pixels

    stroke(64, 119, 27);
    for (let i = 0; i < sleepsummarydate.length - 1; i++) {
      let x1 = xPositions[i];
      let y1 = map(sleepscore[i], 0, 100, height - 50, 50);
      let x2 = xPositions[i + 1];
      let y2 = map(sleepscore[i + 1], 0, 100, height - 50, 50);
      line(x1, y1, x2, y2);
    }
  
    // Draw lines connecting activity score data points
    strokeWeight(2); // Set the stroke weight to 2 pixels

    stroke(134, 77, 191); // Change color to red
    for (let i = 0; i < activitysummarydate.length - 1; i++) {
      let x1 = xPositions[i];
      let y1 = map(activityscore[i], 0, 100, height - 50, 50);
      let x2 = xPositions[i + 1];
      let y2 = map(activityscore[i + 1], 0, 100, height - 50, 50);
      line(x1, y1, x2, y2);
    }
  
    // Draw lines connecting weight score data points
    strokeWeight(2); // Set the stroke weight to 2 pixels

    stroke(0, 164, 186); // Change color to green
    for (let i = 0; i < weightsummarydate.length - 1; i++) {
      let x1 = xPositions[i];
      let y1 = map(normalizedWeightScores[i], 0, 1, height - 50, 50);
      let x2 = xPositions[i + 1];
      let y2 = map(normalizedWeightScores[i + 1], 0, 1, height - 50, 50);
      line(x1, y1, x2, y2);
    }
  
    // Draw lines connecting readiness score data points
    strokeWeight(2); // Set the stroke weight to 2 pixels

    stroke(211, 100, 100); // Change color to purple
    for (let i = 0; i < readinesssummarydate.length - 1; i++) {
      let x1 = xPositions[i];
      let y1 = map(normalizedReadinessScores[i], 0, 1, height - 50, 50);
      let x2 = xPositions[i + 1];
      let y2 = map(normalizedReadinessScores[i + 1], 0, 1, height - 50, 50);
      line(x1, y1, x2, y2);
    }
  
    // Draw circles at each sleep score data point
    for (var i = 0; i < sleepsummarydate.length; i++) {
      stroke(0);
      fill(255, 255, 255);
  
      var xpos = xPositions[i];
      var ypos = map(sleepscore[i], 0, 100, height - 50, 50);
      circle(xpos, ypos, 4);
    }
  
    // Draw circles at each activity score data point
    for (var i = 0; i < activitysummarydate.length; i++) {
      stroke(0);
      fill(255, 255, 255); // Set fill color to white
  
      var xpos = xPositions[i];
      var ypos = map(activityscore[i], 0, 100, height - 50, 50);
      circle(xpos, ypos, 4); // Draw a circle at the activity score data point
    }
  
    // Draw circles at each weight score data point
    for (var i = 0; i < weightsummarydate.length; i++) {
      stroke(0);
      fill(255, 255, 255); // Set fill color to white
  
      var xpos = xPositions[i];
      var ypos = map(normalizedWeightScores[i], 0, 1, height - 50, 50);
      circle(xpos, ypos, 4); // Draw a circle at the normalized weight score data point
    }
  
    // Draw circles at each readiness score data point
    for (var i = 0; i < readinesssummarydate.length; i++) {
      stroke(0);
      fill(255, 255, 255); // Set fill color to white
  
      var xpos = xPositions[i];
      var ypos = map(normalizedReadinessScores[i], 0, 1, height - 50, 50);
      circle(xpos, ypos, 4); // Draw a circle at the normalized readiness score data point
    }
  
    // Draw axes
    stroke(0);
    fill(0);
    line(65, 765, 865, 765); // x-axis
    line(65, 50, 65, 765); // y-axis
    noStroke(0);
    textAlign(CENTER, CENTER);
    text("score", 65, 20); // y-axis label
    textAlign(LEFT, CENTER);
    text("Date", 875, 765); // x-axis label
  }
  

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
