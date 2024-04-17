let sleepFile;

// Get the selected file when input changes
document.getElementById("sleepFile").addEventListener("change", (event) => {
  sleepFile = event.target.files[0]; // selecting the file
});

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

    var light = [];
    var rem = [];
    var deep = [];
    var total = [];
    var efficiency = [];

    // Change each sheet in the workbook to json
    workbook.SheetNames.forEach(async (sheet) => {
      const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        raw: false,
      });

      for(var i = 0; i < result.length; i++){
        light.push(result[i].light);
        rem.push(result[i].rem);
        deep.push(result[i].deep);
        total.push(result[i].total)
        efficiency.push(result[i].efficiency);
      }
        
      console.log("Light sleep data :"+ `\n` + light);
      console.log("Rem sleep data :"+ `\n` + rem);
      console.log("Deep sleep data :"+ `\n` + deep);
      console.log("Total sleep data :"+ `\n` + total);
      console.log("Efficiency data :"+`\n` + efficiency);
     
    
      console.log(result);
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
    
        var steps = [];
    
        // Change each sheet in the workbook to json
        workbook.SheetNames.forEach(async (sheet) => {
          const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
            raw: false,
          });
    
          for(var i = 0; i < result2.length; i++){
            steps.push(result2[i].steps)
          }
            
          console.log("Total step data :"+ `\n` + steps);
         
          
    
    
          console.log(result2);
        });
      };
    });

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch4");
  frameRate(60);
}

function draw(){
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
