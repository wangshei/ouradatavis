// let sleepFile;
// let sleepDataProcessed = false;
// let activityDataProcessed = false;
// let xPositions = [];
// let bar_width = 14.75;
 

// // Get the selected file when input changes
// document.getElementById("sleepFile").addEventListener("change", (event) => {
//   sleepFile = event.target.files[0]; // selecting the file
// });
let light;
let rem;
let deep;
let total;
let efficiency;
let summarydate;
let steps;
let day_steps;

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

  light = sleep.light;
  rem = sleep.rem;
  deep = sleep.deep;
  total = sleep.total;
  efficiency = sleep.efficiency;
  summarydate = sleep.summary_date;

  steps = activity.steps;
  day_steps = activity.summary_date;

})

let earliest = Infinity; 
let latest = 0;

let minsteps = Infinity;
let maxsteps = 0;

// //var high_efficiency;
// //var low_efficiency;

// // Handle upload button click
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

//       if (sleepFile){
//         for(var i = 0; i < result.length; i++){
//           light.push(result[i].light);
//           rem.push(result[i].rem);
//           deep.push(result[i].deep);
//           total.push(result[i].total)
//           efficiency.push(result[i].efficiency);
//           summarydate.push(result[i].summary_date);
//         }

//             // Create dateTimestamps array
//       var dateTimestamps = summarydate.map(dateString => {
//       var parts = dateString.split('/');
//       var year = parseInt(parts[2]) + 2000; // Assuming the year is represented as two digits
//       var month = parseInt(parts[0]) - 1; // Months are 0-indexed in JavaScript
//       var day = parseInt(parts[1]);
//       return new Date(year, month, day).getTime(); // Convert to timestamp
//   });

//         // Calculate earliest and latest timestamps
//     var latestTimeStamp = Math.max(...dateTimestamps);
//     console.log(latestTimeStamp);
//     var earliestTimeStamp = Math.min(...dateTimestamps);
//     console.log(earliestTimeStamp);
    
//     //var highestEfficiency = Math.max(...numberEfficiency);
//     //var lowestEfficiency = Math.min(...numberEfficiency);

//     /*  latest = 0;
//         earliest = Infinity;
//         for(var i=0; i < summarydate.length; i++) {
//           var t = float(summarydate[i]);
//           if (t < earliest){
//             earliest = t;
//           }
//           if (t > latest){
//             latest = t;
//           }
//       }*/
//       console.log("Light sleep data :"+ `\n` + light);
//       console.log("Rem sleep data :"+ `\n` + rem);
//       console.log("Deep sleep data :"+ `\n` + deep);
//       console.log("Total sleep data :"+ `\n` + total);
//       console.log("Efficiency data :"+`\n` + efficiency);
//       console.log("Summary date data :"+ `\n` + summarydate);
    


//       console.log(result);
//         sleepDataProcessed = true;
//         console.log("sleepDataProcessed =" + sleepDataProcessed);
//         checkDataProcessed()
        
//       }


//     });
//   };
// });

// let activityFile;
//     document.getElementById("activityFile").addEventListener("change", (event) => {
//       activityFile = event.target.files[0]; // selecting the file
//     });
    
//     document.getElementById("upload-button").addEventListener("click", (e) => {
//       e.preventDefault();
//       let fileReader2 = new FileReader();
    
//       // Read the selected file as binary string
//       fileReader2.readAsBinaryString(activityFile);
    
//       // Process the file data when it's loaded
//       fileReader2.onload = (event) => {
//         let fileData2 = event.target.result;
    
//         // Read the Excel workbook
//         let workbook = XLSX.read(
//           fileData2,
//           { type: "binary" },
//           { dateNF: "mm/dd/yyyy" }
//         );
    

//         // Change each sheet in the workbook to json
//         workbook.SheetNames.forEach(async (sheet) => {
//           const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//             raw: false,
//           });
    
//         if (activityFile) {
//           for(var i = 0; i < result2.length; i++) {
//             day_steps.push(result2[i].summary_date);
//             steps.push(result2[i].steps);
//         }

//         console.log("Total step data :"+ `\n` + steps);
//         console.log("Day data :"+ `\n` + day_steps);
//       console.log(result2);
//         activityDataProcessed = true;
//         console.log("activityDataProcessed =" + activityDataProcessed);
//         checkDataProcessed()
//         minsteps = Infinity;
//         maxsteps = 0;
//         for (var i = 0; i < steps.length; i++) {
//           var t = float(steps[i]);
//           if (t>maxsteps){
//             maxsteps = t;
//             console.log(maxsteps + "is maxsteps");
//           }
//           if (t<minsteps){
//             minsteps = t;
//             console.log(minsteps + "is minsteps");
//           }
//          }
//         }
            
         
//         });
//       };
//     });


// function checkDataProcessed() {
//   if (sleepDataProcessed && activityDataProcessed) {
//     console.log("Data is processed, initializing p5 sketch...");
//   } 
//   if (!sleepDataProcessed && !activityDataProcessed){
//     console.log("No data is being processed");

//   }
//   if (!sleepDataProcessed && activityDataProcessed){
//     console.log("Only activity data is being processed");

//   }
// }

// im not sure what the let statements are for.

let divWidth;
let divHeight;
function setup(){
  divWidth = document.getElementById('activity-graph').clientWidth;
  divHeight = document.getElementById('activity-graph').clientHeight;
  console.log(divWidth + ", " + divHeight);

 var canvas = createCanvas(divWidth, divHeight);
 canvas.parent("activity-graph");
  console.log("Setup complete, summarydate.length:", summarydate.length);
  frameRate(60);

}
//console.log("Efficiency array", efficiency);

divWidth;
divHeight;
let graphheight;
let maxEfficiency;
let minEfficiency;
let maxStepValue;
let message = "";
let xtop;
let xbottom;
let ytop;
let ybottom;


function draw() {

  //console.log("draw is running")
  
  divWidth = document.getElementById('activity-graph').clientWidth;
  //console.log(divWidth)
  divHeight = document.getElementById('activity-graph').clientHeight;
  //console.log(divHeight)

  xtop = divWidth*0.1;
  ytop = divHeight*0.1;
  xbottom = divWidth*0.9;
  ybottom = divHeight*0.8;
  graphheight = ybottom-ytop;

  // console.log(xtop + "is xtop")
  // console.log(xbottom + "is xbottom")
  // console.log(ytop + "is ytop")
  // console.log(ybottom+"is ybottom")
  bar_width = (xbottom-xtop)/(total.length);


  background(255); // Clear the canvas each frame

  strokeWeight(0);

  // Draw y-axis labels for efficiency
  // for (let i = 0; i <= 100; i += 10) {
  //   let y = map(i, 0, 100, ybottom, ytop);
  //   text(i+" -", xtop, y);
  // }

  // Draw x-axis labels for dates
  textAlign(LEFT, CENTER);
  for (let i = 0; i < summarydate.length; i++) {
    if (i % 2 == 0) {
      push();
      translate(xtop + i * bar_width+10, ybottom+5);
      rotate(HALF_PI / 2);
      text(summarydate[i], 0, 0);
      pop();
    }
  }

  // Draw y-axis labels for steps
  textAlign(LEFT, CENTER);
   maxStepValue = 0;
  for(var i = 0; i <= steps.length; i++){
    var t = float(steps[i]);
    if (t>maxStepValue){
      maxStepValue = t;
      //console.log(heaviest + "is heaviest");
    }  }
    
    for (let i = 0; i <= maxStepValue; i += 1500) {
    let y = map(i, 0, maxStepValue, ybottom, ytop); // Corrected the variable name here
    text("- "+i, xbottom+10, y);
    //console.log(maxStepValue + "is max Step value")

  }

textAlign(RIGHT, CENTER);

 maxEfficiency = 0;
 minEfficiency = 100;

  for(var i = 0; i <= efficiency.length; i++){
    var t = float(efficiency[i]);
    if (t>maxEfficiency){
      maxEfficiency = t;
      //console.log(maxEfficiency + "is max");
    }  
    if (t<minEfficiency){
      minEfficiency = t;
      //console.log(minEfficiency + "is min");
    } 
  }
    
    for (let i = minEfficiency; i <= maxEfficiency; i += 5) {
    let y = map(i, minEfficiency, maxEfficiency, ybottom, ytop); // Corrected the variable name here
    text(i+" -", xtop, y);
}


  // Draw line graph for efficiency data
  stroke(67,1,89);    
  strokeWeight(3);
  for (let i = 0; i < efficiency.length - 1; i++) {
    let x1 = xtop + 5+ bar_width*[i];
    //let y1 = map(efficiency[i], 0, 100, height, 0);
    let y1 = (-(efficiency[i]-minEfficiency))/(maxEfficiency-minEfficiency)*graphheight+ybottom;
    let x2 = xtop + 5+ bar_width*[i+1];
    let y2 = (-(efficiency[i+1]-minEfficiency))/(maxEfficiency-minEfficiency)*graphheight+ybottom;
    line(x1, y1, x2, y2);
  }

  // Draw circles for efficiency data
  for (let i = 0; i < efficiency.length; i++) {
    stroke(0);
    fill(224,227,255);    

    let xpos = xtop + 5+ bar_width*[i];
    let ypos =  (-(efficiency[i]-minEfficiency))/(maxEfficiency-minEfficiency)*graphheight+ybottom;
    circle(xpos, ypos, 2);
    //console.log(`Drawing summary date at index ${i}: xpos=${xpos}, ypos=${ypos}`);
  }

  // Draw line graph for steps data
  stroke(224,227,255);       // Set color to red for steps data
  
  for (let i = 0; i < efficiency.length - 1; i++) {
    let steps_x1 = xtop + 5+ bar_width*[i];
    let steps_y1 = (-steps[i]/maxStepValue)*graphheight+ybottom
    //let steps_y1 = map(steps[i], 0, maxsteps, height, 0);//map from height to 0
    //let steps_y2 = map(steps[i + 1], 0, maxsteps, height, 0);//map from height to 0
    let steps_y2 = -(steps[i+1]/maxStepValue)*graphheight+ybottom
    let steps_x2 = xtop + 5+ bar_width*[i+1];

    line(steps_x1, steps_y1, steps_x2, steps_y2);
  }

  //Draw circles for steps data
  for (let i = 0; i < efficiency.length; i++) {
    stroke(0);
    fill(29,27,119);

    let stc_xpos = xtop + 5+ bar_width*[i];
    let stc_ypos = -steps[i]/maxStepValue*graphheight+ybottom
    circle(stc_xpos, stc_ypos, 2);

  // Draw x and y axis lines and labels
 
}

  stroke(0);
  strokeWeight(1);
  fill(0);
  line(xtop, ybottom, xbottom+10, ybottom); // x-axis
  line(xtop, ytop, xtop, ybottom); // y-axis
  line(xbottom+10, ytop-10, xbottom+10, ybottom); // right border
  stroke(0);
  textAlign(CENTER, CENTER);

  strokeWeight(0);

  text("Efficiency", xtop, ytop-20); // y-axis label
  textAlign(LEFT, CENTER);
  //text("Date", xbottom, ybottom); // x-axis label
  textAlign(CENTER, CENTER);
  text("Steps", xbottom, ytop-20); // right border label

  text(message, (xbottom+xtop)/2, ytop-15)
  console.log(message)

}

function mouseMoved(){
  // fill(230, 232, 243);
  // stroke(230, 232, 243);

//console.log("mouse move called")
  for (var i = 0; i<summarydate.length; i++){
    
    

    let barHeight = -(efficiency[i]-minEfficiency)/(maxEfficiency-minEfficiency)*graphheight+ybottom
    let xPos = xtop + 5+ bar_width*[i];

    let barHeight2 = -(steps[i]/maxStepValue)*graphheight+ybottom
    let xPos2 =  xtop + 5+ bar_width*[i];

    // console.log( xPos + "is xpos")
    // console.log( barHeight + "is barheight")
    
    // console.log( maxEfficiency + "is max")
    // console.log( minEfficiency + "is min")
    // console.log(graphheight + "is graph height")
    // console.log(summarydate[i])
    // console.log(maxStepValue+"is barheight 2")
    
    if(mouseX > xPos-5 && mouseX < xPos+5 && mouseY > barHeight-5 && mouseY < barHeight+5){
      message = "Efficiency is "+(efficiency[i]).toString()+" on "+summarydate[i];
    //console.log(message+"is message 1")
  }
  // fill(224,227,255);      
  // stroke(224,227,255);      


  
    if(mouseX > xPos2-5 && mouseX < xPos2+5 && mouseY > barHeight2-5 && mouseY < barHeight2+5){
      message = "Steps is "+(steps[i]).toString()+" on "+summarydate[i];
     //console.log(message+"is message 2")

  }


  


  // stroke(255);
  // fill(255)
}

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


