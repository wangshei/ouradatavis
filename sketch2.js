let sleepFile;
let sleepDataProcessed = false;
let weightDataProcessed = false;

// Get the selected file when input changes
document.getElementById("sleepFile").addEventListener("change", (event) => {
  sleepFile = event.target.files[0]; // selecting the file
});

var light = [];
var rem = [];
var deep = [];
var total = [];
var onset_latency = [];
var summary_date = [];

var weight_lbs = [];
var day_weight = [];

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
          total.push(result[i].total);
          onset_latency.push(result[i].onset_latency);
          summary_date.push(result[i].summary_date);
        }
                
      console.log("Light sleep data :"+ `\n` + light);
      console.log("Rem sleep data :"+ `\n` + rem);
      console.log("Deep sleep data :"+ `\n` + deep);
      console.log("Total sleep data :"+ `\n` + total);
      console.log("Onset Latency sleep data :"+ `\n` + onset_latency);
      console.log("summary_date for the data is:"+ `\n` + summary_date);



      console.log(result);
        sleepDataProcessed = true;
        console.log("sleepDataProcessed =" + sleepDataProcessed);
        checkDataProcessed()

      }
      

    });
  };
 
 
});

let weightFile;
document.getElementById("weightFile").addEventListener("change", (event) => {
  weightFile = event.target.files[0]; // selecting the file
});

document.getElementById("upload-button").addEventListener("click", (e) => {
  e.preventDefault();
  let fileReader2 = new FileReader();

  // Read the selected file as binary string
  fileReader2.readAsBinaryString(weightFile);

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

      if (weightFile){
        for(var i = 0; i < result2.length; i++){
          day_weight.push(result2[i].day)
          weight_lbs.push(result2[i].weight_lbs)
        }
                
      console.log("Day data :"+ `\n` + day_weight);
      console.log("Total weight data :"+ `\n` + weight_lbs);
    console.log(result2);
        weightDataProcessed = true;
        console.log("weightDataProcessed =" + weightDataProcessed);
        checkDataProcessed()

      }

    });
  };
 

});


function checkDataProcessed() {
  if (sleepDataProcessed && weightDataProcessed) {
    console.log("Data is processed, initializing p5 sketch...");
    initializeSketch();
  } 
  if (!sleepDataProcessed && !weightDataProcessed){
    console.log("No data is being processed");

  }
  if (!sleepDataProcessed && weightDataProcessed){
    console.log("Only Weight data is being processed");

  }
}

function initializeSketch() {
  console.log("Initializing p5 sketch..."); // Debug to confirm this runs
  new p5();
  noLoop(); // Stop continuous drawing if not necessary
}

let duration;
duration = "total";
let latency_height;
let width;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch2");
  console.log("Setup complete, summary_date.length:", summary_date.length);

  
  if (summary_date.length>0){
    if (duration === "total"){
      width = 800/(total.length);
      console.log("Width per bar: ", width);
    }
  }
  noLoop();
}


function draw(){
  console.log("Draw function is running."); // Check how often this logs

    //x index
    //background(255);
    fill(0,250,0);
    line(65,508,865,508);
    // y index
    line(65,100,65,508);
    noLoop();
    rect(0, 50, 150, 150);  // Should definitely be visible

    // calculate the width of each bar
    // draw rectangle for latency 
    //if(width> 0 && summary_date.length>0){
    for (var i = 0; i<summary_date.length; i++){
      fill(255, 0, i * 5); 
      let barHeight = onset_latency[i] / 36;
      let yPos = 508 - barHeight;
      let xPos = 70 + i * width;
      rect(xPos, yPos, width, barHeight);
      noLoop();
      console.log(`Drawing latency at index ${i}: xPos=${xPos}, yPos=${yPos}, width=${width}, height=${barHeight}`);

    }
  //}
  
  
    
  }


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
