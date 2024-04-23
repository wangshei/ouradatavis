let sleepFile;
let sleepDataProcessed = false;
let activityDataProcessed = false;
let xPositions = [];
let bar_width = 14.7;

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





function draw(){
  console.log("Draw function is running."); // Check how often this logs

  stroke(0);
  fill(0);//figure out how to unbold here, the dates axis is here

  console.log("Efficiency array", efficiency);
  console.log("Summary array:", summarydate);
  

textAlign(LEFT, CENTER);

for (var i = 0; i < summarydate.length; i++){
  if (i%2==0){
    push();
    translate(65 + i*bar_width, 512);
    rotate(HALF_PI/2); // default is radiants
    text(summarydate[i],0,0);
    console.log(summarydate[i]);
    pop(); // go back to the original codition so we can isolate different things)

  }
}

/*for (var i = 0; i < summarydate.length; i++) {
  var linex = xPositions[i];
  var liney = map(efficiency[i], 0, 100, height, 0);
  line(px, py, linex, liney);
}*/

//line graph, connecting the dots
stroke(0, 0, 255);
for (let i=0; i < summarydate.length; i++) {
  let x1 = xPositions[i];
  let y1 = map(efficiency[i], 0, 100, height, 0);
  let x2 = xPositions[i + 1];
  let y2 = map(efficiency[i + 1], 0, 100, height, 0);
  line(x1, y1, x2, y2);
}

for (var i = 0; i < summarydate.length; i++){
  stroke(0);
  fill(255, 255, 255);

  
  var xpos = xPositions[i];
  var ypos = map(efficiency[i], 0, 100, height, 0);
  circle(xpos, ypos, 4);
  console.log(`Drawing summary date at index ${i}: xpos=${xpos}, ypos=${ypos}`);

  noLoop();
}





  stroke(0);

    fill(0);

    line(65,508,865,508);
    //y index
    line(65,50,65,508);
    stroke(255);

    textAlign(CENTER, CENTER);
    text("Efficiency", 65, 45);

    textAlign(LEFT, CENTER);
    text("Date", 875, 508);

  /*line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
  textAlign(CENTER, CENTER);*/


//find the range highest data point
//unit on y axis

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
