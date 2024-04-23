let sleepFile;
let sleepDataProcessed = false;
let activityDataProcessed = false;
let xPositions = [];
let bar_width = 14.75;

// Get the selected file when input changes
document.getElementById("sleepFile").addEventListener("change", (event) => {
  sleepFile = event.target.files[0]; // selecting the file
});

var sleepscore = [];
var sleepsummarydate = [];

var activityscore = [];
var activitysummarydate = [];

var earliest = Infinity;
var latest = 0;

// Handle upload button click
document.getElementById("upload-button").addEventListener("click", (e) => {
  e.preventDefault();

  let fileReader = new FileReader();

  // Read the selected file as binary string
  fileReader.readAsBinaryString(sleepFile);

  // Process the file data when it's loaded
  fileReader.onload = (event) => {
    let fileData = event.target.result;

    // Read the Excel workbook
    let workbook = XLSX.read(
      fileData,
      { type: "binary" },
      { dateNF: "mm/dd/yyyy" }
    );

    // Change each sheet in the workbook to json
    workbook.SheetNames.forEach(async (sheet) => {
      const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        raw: false,
      });

      if (sleepFile) {
        for (var i = 0; i < result.length; i++) {
          sleepscore.push(result[i].score);
          sleepsummarydate.push(result[i].summary_date);
        }

        // Normalize the sleep score data from 0 to 1
        let minSleepScore = Math.min(...sleepscore);
        let maxSleepScore = Math.max(...sleepscore);
        let normalizedSleepScores = sleepscore.map((score) =>
          map(score, minSleepScore, maxSleepScore, 0, 1)
        );

        // Create dateTimestamps array
        var dateTimestamps = sleepsummarydate.map((dateString) => {
          var parts = dateString.split("/");
          var year = parseInt(parts[2]) + 2000; // Assuming the year is represented as two digits
          var month = parseInt(parts[0]) - 1; // Months are 0-indexed in JavaScript
          var day = parseInt(parts[1]);
          return new Date(year, month, day).getTime(); // Convert to timestamp
        });

        // Calculate earliest and latest timestamps
        var latestTimeStamp = Math.max(...dateTimestamps);
        var earliestTimeStamp = Math.min(...dateTimestamps);

        xPositions = dateTimestamps.map((timestamp) =>
          map(timestamp, earliestTimeStamp, latestTimeStamp, 65, 865)
        );

        sleepDataProcessed = true;
        checkDataProcessed();
      }
    });
  };
});

let activityFile;
document.getElementById("activityFile").addEventListener("change", (event) => {
  activityFile = event.target.files[0]; // selecting the file
});

document.getElementById("upload-button").addEventListener("click", (e) => {
  e.preventDefault();
  let fileReader2 = new FileReader();

  // Read the selected file as binary string
  fileReader2.readAsBinaryString(activityFile);

  // Process the file data when it's loaded
  fileReader2.onload = (event) => {
    let fileData2 = event.target.result;

    // Read the Excel workbook
    let workbook = XLSX.read(
      fileData2,
      { type: "binary" },
      { dateNF: "mm/dd/yyyy" }
    );

    // Change each sheet in the workbook to json
    workbook.SheetNames.forEach(async (sheet) => {
      const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        raw: false,
      });

      if (activityFile) {
        for (var i = 0; i < result2.length; i++) {
          activitysummarydate.push(result2[i].summary_date);
          activityscore.push(result2[i].score);
        }
        // Normalize the activity score data from 0 to 1
        let minActivityScore = Math.min(...activityscore);
        let maxActivityScore = Math.max(...activityscore);
        let normalizedActivityScores = activityscore.map((score) =>
          map(score, minActivityScore, maxActivityScore, 0, 1)
        );

        activityDataProcessed = true;
        checkDataProcessed();
      }
    });
  };
});

function checkDataProcessed() {
  if (sleepDataProcessed && activityDataProcessed) {
  }
  if (!sleepDataProcessed && !activityDataProcessed) {
  }
  if (!sleepDataProcessed && activityDataProcessed) {
  }
}


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch1");
  frameRate(60);
}

function draw() {
  stroke(0);
  fill(0);

  textAlign(LEFT, CENTER);

  // Draw hash marks and labels on the y-axis
  for (let i = 0; i <= 10; i++) {
    let y = map(i / 10, 0, 1, height - 50, 50); // Calculate y-coordinate for each hash mark
    line(60, y, 65, y); // Draw the hash mark
    textAlign(RIGHT, CENTER);
    text(i / 10, 60, y); // Label the hash mark
  }

  // Draw sleep summary dates
  for (var i = 0; i < sleepsummarydate.length; i++) {
    if (i % 2 == 0) {
      push();
      translate(65 + i * bar_width + bar_width / 2, height - 10);
      rotate(HALF_PI / 2);
      text(sleepsummarydate[i], 0, 0);
      pop();
    }
  }

  // Draw lines connecting sleep score data points
  stroke(0, 0, 255);
  for (let i = 0; i < sleepsummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    let y1 = map(sleepscore[i], 0, 100, height - 50, 50);
    let x2 = xPositions[i + 1];
    let y2 = map(sleepscore[i + 1], 0, 100, height - 50, 50);
    line(x1, y1, x2, y2);
  }

  // Draw lines connecting activity score data points
  stroke(255, 0, 0); // Change color to red
  for (let i = 0; i < activitysummarydate.length - 1; i++) {
    let x1 = xPositions[i];
    let y1 = map(activityscore[i], 0, 100, height - 50, 50);
    let x2 = xPositions[i + 1];
    let y2 = map(activityscore[i + 1], 0, 100, height - 50, 50);
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
  stroke(0); // Set stroke color to red
  fill(255, 255, 255); // Set fill color to white

  var xpos = xPositions[i];
  var ypos = map(activityscore[i], 0, 100, height - 50, 50);
  circle(xpos, ypos, 4); // Draw a circle at the activity score data point
}


  // Draw axes
  stroke(0);
  fill(0);
  line(65, 765, 865, 765); // x-axis
  line(65, 50, 65, 765); // y-axis
  stroke(255);
  textAlign(CENTER, CENTER);
  text("score", 65, 20); // y-axis label
  textAlign(LEFT, CENTER);
  text("Date", 875, 765); // x-axis label
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
