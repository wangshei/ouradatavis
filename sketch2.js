// let sleepFile;
// let sleepDataProcessed = false;
// let weightDataProcessed = false;

// // Get the selected file when input changes
// document.getElementById("sleepFile").addEventListener("change", (event) => {
//   sleepFile = event.target.files[0]; // selecting the file
// });

var light = sleep.light;
var rem = sleep.rem;
var deep = sleep.deep;
var total = sleep.total;
var onset_latency = sleep.onset_latency;
var summary_date = sleep.summary_date;

var weight_lbs = weight.weight_lbs;
var day_weight = weight.day_weight;

let bar_width;
let longest;
let heaviest;
let lightest;



// Handle upload button click
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


    // Change each sheet in the workbook to json
  //   workbook.SheetNames.forEach(async (sheet) => {
  //     const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
  //       raw: false,
  //     });

  //     if (sleepFile){
  //       for(var i = 0; i < result.length; i++){
  //         light.push(result[i].light);
  //         rem.push(result[i].rem);
  //         deep.push(result[i].deep);
  //         total.push(result[i].total);
  //         onset_latency.push(result[i].onset_latency);
  //         summary_date.push(result[i].summary_date);
  //       }

  //       longest = 0;
  //       bar_width = (xbottom-xtop)/(total.length);
  //       for(var i = 0; i <= total.length; i++){
  //         var t = float(total[i]);
  //         if (t>longest){
  //           longest = t;
  //           //console.log(longest + "is longest");
  //         }
  //       }
        
        
                
  //     console.log("Light sleep data :"+ `\n` + light);
  //     console.log("Rem sleep data :"+ `\n` + rem);
  //     console.log("Deep sleep data :"+ `\n` + deep);
  //     console.log("Total sleep data :"+ `\n` + total);
  //     console.log("Onset Latency sleep data :"+ `\n` + onset_latency);
  //     console.log("summary_date for the data is:"+ `\n` + summary_date);



  //     console.log(result);
  //       sleepDataProcessed = true;
  //       console.log("sleepDataProcessed =" + sleepDataProcessed);
  //       checkDataProcessed()

  //     }
      

  //   });
  // };
 
 
// });

// let weightFile;
// document.getElementById("weightFile").addEventListener("change", (event) => {
//   weightFile = event.target.files[0]; // selecting the file
// });

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

//       if (weightFile){
//         for(var i = 0; i < result2.length; i++){
//           day_weight.push(result2[i].day)
//           weight_lbs.push(result2[i].weight_lbs)
//         }
                
//       console.log("Day data :"+ `\n` + day_weight);
//       console.log("Total weight data :"+ `\n` + weight_lbs);
//     console.log(result2);
//         weightDataProcessed = true;
//         console.log("weightDataProcessed =" + weightDataProcessed);
//         checkDataProcessed()
//         lightest = 1000;
//         heaviest = 0;
//         for(var i = 0; i <= weight_lbs.length; i++){
//           var t = float(weight_lbs[i]);
//           if (t>heaviest){
//             heaviest = t;
//             console.log(heaviest + "is heaviest");
//           }
//           if (t<lightest){
//             lightest = t;
//             console.log(lightest + "is lightest");
//           }
//         }
//       }

//     });
//   };
 

// });


// function checkDataProcessed() {
//   if (sleepDataProcessed && weightDataProcessed) {
//     console.log("Data is processed, initializing p5 sketch...");
//   } 
//   if (!sleepDataProcessed && !weightDataProcessed){
//     console.log("No data is being processed");

//   }
//   if (!sleepDataProcessed && weightDataProcessed){
//     console.log("Only Weight data is being processed");

//   }
// }


let duration;
duration = "total";
let latency_height;

let xtop = 65;
let ytop = 65;
let xbottom;
let ybottom;
let graphheight;
let divWidth;
let divHeight;


function setup(){
  let divWidth = document.getElementById('graph-section').clientWidth;
  let divHeight = document.getElementById('graph-section').clientHeight;
  //console.log(divWidth + ", " + divHeight);

  var canvas = createCanvas(divWidth, divHeight);
  canvas.parent("sleep-graph");
  //console.log("Setup complete, summary_date.length:", summary_date.length);
  //noLoop();
  xbottom = divWidth-xtop;
  ybottom = divHeight-ytop;
  graphheight = ybottom-ytop;
  
  // if (summary_date.length>0){
  //   if (duration === "total"){
  //     bar_width = 800/(total.length);
  //     console.log("Width per bar: ", bar_width);
  //   }
  // }
}





function draw(){
  // console.log(sleep)
  divWidth = document.getElementById('sleep-graph').clientWidth;
  divHeight = document.getElementById('sleep-graph').clientHeight;
  //console.log(divWidth + ", " + divHeight);

  xbottom = divWidth-xtop;
  ybottom = divHeight-ytop;
  graphheight = ybottom-ytop;
  
  var light = sleep.light;
  var rem = sleep.rem;
  var deep = sleep.deep;
  var total = sleep.total;
  var onset_latency = sleep.onset_latency;
  var summary_date = sleep.summary_date;

  var weight_lbs = weight.weight_lbs;
  var day_weight = weight.day_weight;
  longest = 0;
        bar_width = (xbottom-xtop)/(total.length);
        for(var i = 0; i <= total.length; i++){
          var t = float(total[i]);
          if (t>longest){
            longest = t;
            //console.log(longest + "is longest");
          }
        }
        lightest = 1000;
                heaviest = 0;
                for(var i = 0; i <= weight_lbs.length; i++){
                  var t = float(weight_lbs[i]);
                  if (t>heaviest){
                    heaviest = t;
                    console.log(heaviest + "is heaviest");
                  }
                  if (t<lightest){
                    lightest = t;
                    console.log(lightest + "is lightest");
                  }
                }
  //console.log("Draw function is running."); // Check how often this logs

    //x index
    fill(255);
    rect(0,0,divWidth, divHeight);
    
    //rect(0, 50, 150, 150);  // Should definitely be visible

    // calculate the width of each bar
    // draw rectangle for latency 
    //if(width> 0 && summary_date.length>0){
      
      stroke(255);
      fill(0);
      textAlign(RIGHT, CENTER);

      //console.log(longest + ","+ longest/3600);
      for (var i = 0; i<=longest;i+=3600){
        var ypos = map(i, 0, longest,ybottom,ytop )
        text(i/3600+" hour -",xtop,ypos); // this is the only thing that will change style
      }
      textAlign(LEFT, CENTER);

      //console.log(heaviest + ","+ heaviest-lightest);
      for (var i = lightest; i<=heaviest;i+=1){
        var ypos = map(i, lightest, heaviest,ybottom,ytop )
        text("- "+i+" lb",xbottom+10,ypos); // this is the only thing that will change style
      }

      for (var i = 0; i<summary_date.length; i++){
       if (i%2==0){
        push();
        translate(xtop + i * bar_width+10, ybottom+5);
        rotate(HALF_PI/2); // default is radiants
        text(summary_date[i],0,0);
        //console.log(summary_date[i]);
        pop(); // go back to the original codition so we can isolate different things)
    
        }
  
      }
      
    for (var i = 0; i<summary_date.length; i++){
      stroke(255);
      fill(230, 232, 243);

      let barHeight = onset_latency[i] / ((longest-0)/graphheight);
      let yPos = ybottom - barHeight;
      let xPos = xtop + 5 + i * bar_width+1;
      rect(xPos, yPos, bar_width, barHeight);
      //console.log(`Drawing latency at index ${i}: xPos=${xPos}, yPos=${yPos}, bar_width=${bar_width}, height=${barHeight}`);

      fill(224,227,255);      
      let barHeight2 = light[i] / ((longest-0)/graphheight);
      let yPos2 = yPos - barHeight2;
      let xPos2 = xtop + 5 + i * bar_width+1;
      rect(xPos2, yPos2, bar_width, barHeight2);
      //console.log(`Drawing light at index ${i}: xPos=${xPos2}, yPos=${yPos2}, bar_width=${bar_width}, height=${barHeight2}`);
      
      fill(207,207,245);
      let barHeight3 = rem[i] / ((longest-0)/graphheight);
      let yPos3 = yPos2 - barHeight3;
      let xPos3 = xtop + 5 + i * bar_width+1;
      rect(xPos3, yPos3, bar_width, barHeight3);
      //console.log(`Drawing light at index ${i}: xPos=${xPos3}, yPos=${yPos3}, bar_width=${bar_width}, height=${barHeight3}`);

      
      fill(184,183,242);

      let barHeight4 = deep[i] / ((longest-0)/graphheight);
      let yPos4 = yPos3 - barHeight4;
      let xPos4 = xtop + 5 + i * bar_width+1;
      rect(xPos4, yPos4, bar_width, barHeight4);
      //console.log(`Drawing light at index ${i}: xPos=${xPos4}, yPos=${yPos4}, bar_width=${bar_width}, height=${barHeight4}`);
      
      stroke(0);

      let weight_x1 = xtop + 5+ bar_width*[i];
      // console.log(weight_lbs[i] + " is weight right now");
      // console.log(lightest + " is the lightest weight");
      // console.log(heaviest + " is the heaviest")
      // console.log(graphheight + " is graphheight")
      // console.log(ybottom + "is ybottom")
      let weight_y1 = (-(weight_lbs[i]-lightest)/(heaviest-lightest))*graphheight+ybottom;
      let weight_x2 = xtop + 5+ bar_width*[i+1];
      let weight_y2 = (-(weight_lbs[i+1]-lightest)/(heaviest-lightest))*graphheight+ybottom;
      //console.log(weight_y1, weight_y2)
      line(weight_x1,weight_y1, weight_x2, weight_y2);
      //console.log(`Drawing line at index ${i}: xPos=${weight_x1}, yPos=${weight_y1}, xPos2=${weight_x2}, height=${weight_y2}`);

      // noLoop();
    }

    
  //}
  

  

  stroke(0);

    fill(0);

    line(xtop,ybottom,xbottom+10,ybottom);
    // y index
    line(xtop,ytop-5,xtop,ybottom);
    line(xbottom+10,ytop-5,xbottom+10,ybottom);

    stroke(255);

    textAlign(CENTER, CENTER);
    text("Duration", xtop, ytop-20);

    textAlign(CENTER, CENTER);
    text("Weight", xbottom, ytop-20);
    
  }


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}