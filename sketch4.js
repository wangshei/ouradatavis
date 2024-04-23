let sleepFile;
let sleepDataProcessed = false;
let activityDataProcessed = false;
let xPositions = [];
let bar_width = 14.75;
 

// Get the selected file when input changes
document.getElementById("sleepFile").addEventListener("change", (event) => {
  sleepFile = event.target.files[0]; // selecting the file
});

var light = [];
var rem = [];
var deep = [];
var total = [];
var efficiency = [];
var summarydate = [];

var steps = [];
var day_steps = [];

var earliest = Infinity; 
var latest = 0;

var minsteps = Infinity;
var maxsteps = 0;
//var high_efficiency;
//var low_efficiency;

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

      if (sleepFile){
        for(var i = 0; i < result.length; i++){
          light.push(result[i].light);
          rem.push(result[i].rem);
          deep.push(result[i].deep);
          total.push(result[i].total)
          efficiency.push(result[i].efficiency);
          summarydate.push(result[i].summary_date);
        }

            // Create dateTimestamps array
      var dateTimestamps = summarydate.map(dateString => {
      var parts = dateString.split('/');
      var year = parseInt(parts[2]) + 2000; // Assuming the year is represented as two digits
      var month = parseInt(parts[0]) - 1; // Months are 0-indexed in JavaScript
      var day = parseInt(parts[1]);
      return new Date(year, month, day).getTime(); // Convert to timestamp
  });

        // Calculate earliest and latest timestamps
    var latestTimeStamp = Math.max(...dateTimestamps);
    console.log(latestTimeStamp);
    var earliestTimeStamp = Math.min(...dateTimestamps);
    console.log(earliestTimeStamp);
    
    //var highestEfficiency = Math.max(...numberEfficiency);
    //var lowestEfficiency = Math.min(...numberEfficiency);

    xPositions = dateTimestamps.map(timestamp => map(timestamp, earliestTimeStamp, latestTimeStamp, 65, 865));
    /*  latest = 0;
        earliest = Infinity;
        for(var i=0; i < summarydate.length; i++) {
          var t = float(summarydate[i]);
          if (t < earliest){
            earliest = t;
          }
          if (t > latest){
            latest = t;
          }
      }*/
      console.log("Light sleep data :"+ `\n` + light);
      console.log("Rem sleep data :"+ `\n` + rem);
      console.log("Deep sleep data :"+ `\n` + deep);
      console.log("Total sleep data :"+ `\n` + total);
      console.log("Efficiency data :"+`\n` + efficiency);
      console.log("Summary date data :"+ `\n` + summarydate);
    


      console.log(result);
        sleepDataProcessed = true;
        console.log("sleepDataProcessed =" + sleepDataProcessed);
        checkDataProcessed()
        
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
          for(var i = 0; i < result2.length; i++) {
            day_steps.push(result2[i].summary_date);
            steps.push(result2[i].steps);
        }

        console.log("Total step data :"+ `\n` + steps);
        console.log("Day data :"+ `\n` + day_steps);
      console.log(result2);
        activityDataProcessed = true;
        console.log("activityDataProcessed =" + activityDataProcessed);
        checkDataProcessed()
        minsteps = Infinity;
        maxsteps = 0;
        for (var i = 0; i < steps.length; i++) {
          var t = float(steps[i]);
          if (t>maxsteps){
            maxsteps = t;
            console.log(maxsteps + "is maxsteps");
          }
          if (t<minsteps){
            minsteps = t;
            console.log(minsteps + "is minsteps");
          }
         }
        }
            
         
        });
      };
    });


function checkDataProcessed() {
  if (sleepDataProcessed && activityDataProcessed) {
    console.log("Data is processed, initializing p5 sketch...");
  } 
  if (!sleepDataProcessed && !activityDataProcessed){
    console.log("No data is being processed");

  }
  if (!sleepDataProcessed && activityDataProcessed){
    console.log("Only activity data is being processed");

  }
}

// im not sure what the let statements are for.


function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch4");
  console.log("Setup complete, summarydate.length:", summarydate.length);
  frameRate(60);

}
//console.log("Efficiency array", efficiency);


xtop = 65;
ytop = 65;
xbottom = 865;
ybottom = 508;
 graphheight = ybottom-ytop;
divWidth;
divHeight;


function draw() {
  background(255); // Clear the canvas each frame

  strokeWeight(1);
  // Draw y-axis labels for efficiency
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 100; i += 10) {
    let y = map(i, 0, 100, ybottom, xtop);
    text(i+" -", xtop, y);
  }

  // Draw x-axis labels for dates
  textAlign(LEFT, CENTER);
  for (let i = 0; i < summarydate.length; i++) {
    if (i % 2 == 0) {
      push();
      translate(65 + i * bar_width, 512);
      rotate(HALF_PI / 2);
      text(summarydate[i], 0, 0);
      pop();
    }
  }

  // Draw y-axis labels for steps
  textAlign(LEFT, CENTER);
  let maxStepValue = 0;
  for(var i = 0; i <= steps.length; i++){
    var t = float(steps[i]);
    if (t>maxStepValue){
      maxStepValue = t;
      //console.log(heaviest + "is heaviest");
    }  }
    
    for (let i = 0; i <= maxStepValue; i += 1000) {
    let y = map(i, 0, maxStepValue, ybottom, ytop); // Corrected the variable name here
    text("- "+i, xbottom, y);
}


  // Draw line graph for efficiency data
  stroke(224,227,255);    
  strokeWeight(3);
  for (let i = 0; i < summarydate.length - 1; i++) {
    let x1 = xPositions[i];
    //let y1 = map(efficiency[i], 0, 100, height, 0);
    let y1 = -efficiency[i]/100*508+508;
    let x2 = xPositions[i + 1];
    let y2 = -efficiency[i+1]/100*508+508;
    line(x1, y1, x2, y2);
  }

  // Draw circles for efficiency data
  for (let i = 0; i < summarydate.length; i++) {
    stroke(0);
    fill(224,227,255);    

    let xpos = xPositions[i];
    let ypos =  -efficiency[i]/100*ybottom+ybottom;
    circle(xpos, ypos, 4);
    console.log(`Drawing summary date at index ${i}: xpos=${xpos}, ypos=${ypos}`);
  }

  // Draw line graph for steps data
  stroke(29,27,119); // Set color to red for steps data
  
  for (let i = 0; i < day_steps.length - 1; i++) {
    let steps_x1 = xPositions[i];
    let steps_y1 = -steps[i]/maxStepValue*graphheight+ybottom
    //let steps_y1 = map(steps[i], 0, maxsteps, height, 0);//map from height to 0
    //let steps_y2 = map(steps[i + 1], 0, maxsteps, height, 0);//map from height to 0
    let steps_y2 = -steps[i+1]/maxStepValue*graphheight+ybottom
    let steps_x2 = xPositions[i + 1];

    line(steps_x1, steps_y1, steps_x2, steps_y2);
  }

  //Draw circles for steps data
  for (let i = 0; i < day_steps.length; i++) {
    stroke(0);
    fill(29,27,119);

    let stc_xpos = xPositions[i];
    let stc_ypos = -steps[i]/maxStepValue*graphheight+ybottom
    circle(stc_xpos, stc_ypos, 4);

  // Draw x and y axis lines and labels
  stroke(0);
  strokeWeight(1);
  fill(0);
  line(xtop, ybottom, 865, ybottom); // x-axis
  line(xtop, ytop, xtop, ybottom); // y-axis
  line(xbottom, ytop-10, xbottom, ybottom); // right border
  stroke(255);
  textAlign(CENTER, CENTER);
  text("Efficiency", xtop, ytop-20); // y-axis label
  textAlign(LEFT, CENTER);
  //text("Date", xbottom, ybottom); // x-axis label
  textAlign(CENTER, CENTER);
  text("Steps", xbottom, ytop-20); // right border label
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


/*




let activity= {

  steps:[]
}

let sleep= {

  efficiency:[]
}
*/
}