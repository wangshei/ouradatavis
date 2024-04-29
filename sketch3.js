// let sleepFile;
// let sleepDataProcessed = false;
// let weightDataProcessed = false;

// // Get the selected file when input changes
// document.getElementById("sleepFile").addEventListener("change", (event) => {
//   sleepFile = event.target.files[0]; // selecting the file
// });


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

   weight_lbs = weight.weight_lbs;
  day_weight = weight.day_weight;

  cal_active = activity.cal_active;
})




 bar_width;
 longest;
 heaviest;
 lightest;



// function checkDataProcessed() {
//   if (activityDataProcessed && weightDataProcessed) {
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
 duration = "day_weight";
 let latency_height;

 let xtop;
 let ytop;
 let xbottom;
      let ybottom;
      let graphheight;
      let divWidth;
      let divHeight;


function setup(){
   divWidth = document.getElementById('movement-graph').clientWidth;
   divHeight = document.getElementById('movement-graph').clientHeight;
  console.log(divWidth + ", " + divHeight);

  var weightCanvas = createCanvas(divWidth, divHeight);
  weightCanvas.parent("movement-graph");
  // console.log("Sketch 3 Setup complete, summary_date.length:", summary_date.length);
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
  
 xtop = divWidth*0.15;
 ytop = divHeight*0.1;
 xbottom = divWidth*0.9;
 ybottom = divHeight*0.8;
 graphheight = ybottom-ytop;

  console.log(sleep);
  divWidth = document.getElementById('movement-graph').clientWidth;
  divHeight = document.getElementById('movement-graph').clientHeight;
  console.log(divWidth + ", " + divHeight);

  // xbottom = divWidth-xtop;
  // ybottom = divHeight-ytop;
  // graphheight = ybottom-ytop;

  var total = sleep.total;

  var weight_lbs = weight.weight_lbs;
  var day_weight = weight.day_weight;

  var cal_active = activity.cal_active;

  longest = 0;
       
        lightest = 1000;
        heaviest = 0;
                for(var i = 0; i <= weight_lbs.length; i++){
                  var t = float(weight_lbs[i]);
                  if (t>heaviest){
                    heaviest = t;
                    //console.log(heaviest + "is heaviest");
                  }
                  if (t<lightest){
                    lightest = t;
                    //console.log(lightest + "is lightest");
                  }
                }
  
    longest = 0;
        bar_width = (xbottom-xtop)/(day_weight.length);
        for(var i = 0; i <= day_weight.length; i++){
          var t = float(total[i]);
          if (t>longest){
            longest = t;
            //console.log(longest + "is longest");
          }
        }
                   
  //console.log("Draw function is running."); // Check how often this logs
    most_cal = 0;
    for(var i = 0; i <= cal_active.length; i++){
      var t = float(cal_active[i]);

      if (t>most_cal){
        most_cal = t;
        //console.log(most_cal + "is most_cal");
      }
    }
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
      for (var i = 0; i<=most_cal;i+=50){
        var ypos = map(i, 0, most_cal,ybottom,ytop )
        text(i+" cal -",xtop,ypos); // this is the only thing that will change style
      }
      textAlign(LEFT, CENTER);

      //console.log(heaviest + ","+ heaviest-lightest);
      for (var i = lightest; i<=heaviest;i+=1){
        var ypos = map(i, lightest, heaviest,ybottom,ytop )
        text("- "+i+" lb",xbottom+10,ypos); // this is the only thing that will change style
      }

      for (var i = 0; i<day_weight.length; i++){
       if (i%3==0){
        push();
        translate(xtop + i * bar_width+5, ybottom+5);
        rotate(HALF_PI/2); // default is radiants
        text(day_weight[i],0,0);
        //console.log(summary_date[i]);
        pop(); // go back to the original codition so we can isolate different things)
    
        }
  
      }
      
    for (var i = 0; i<day_weight.length; i++){

      strokeWeight(2)
      stroke(67,1,89);


      calories_x1 = xtop + 5+ bar_width*[i];
      // console.log(weight_lbs[i] + " is weight right now");
      // console.log(lightest + " is the lightest weight");
      // console.log(heaviest + " is the heaviest")
      // console.log(graphheight + " is graphheight")
      // console.log(ybottom + "is ybottom")
      // console.log(cal_active[i]+ "is cal active")
      // console.log(graphheight + "is graphheight")
      // console.log(ybottom + "is ybottom")
      
       calories_y1 = (-(cal_active[i])/(most_cal))*graphheight+ybottom;
       calories_x2 = xtop + 5+ bar_width*[i+1];
       calories_y2 = (-(cal_active[i+1])/(most_cal))*graphheight+ybottom;
      //console.log(weight_y1, weight_y2)
      line(calories_x1,calories_y1, calories_x2, calories_y2);
      stroke(0)
      circle(calories_x1,calories_y1, 2);
      //console.log(`Drawing line at index ${i}: xPos=${calories_x1}, yPos=${calories_y1}, xPos2=${calories_x2}, height=${calories_y2}`);

      stroke(224,227,255);      

       weight_x1 = xtop + 5+ bar_width*[i];
      // console.log(weight_lbs[i] + " is weight right now");
      // console.log(lightest + " is the lightest weight");
      // console.log(heaviest + " is the heaviest")
      // console.log(graphheight + " is graphheight")
      // console.log(ybottom + "is ybottom")
       weight_y1 = (-(weight_lbs[i]-lightest)/(heaviest-lightest))*graphheight+ybottom;
       weight_x2 = xtop + 5+ bar_width*[i+1];
       weight_y2 = (-(weight_lbs[i+1]-lightest)/(heaviest-lightest))*graphheight+ybottom;
      //console.log(weight_y1, weight_y2)
      line(weight_x1,weight_y1, weight_x2, weight_y2);
      stroke(0)
      circle(weight_x1,weight_y1, 2);
      //console.log(`Drawing line at index ${i}: xPos=${weight_x1}, yPos=${weight_y1}, xPos2=${weight_x2}, height=${weight_y2}`);

      // noLoop();
    }

    
  //}
  

  strokeWeight(1)


  stroke(0);

    fill(0);

    line(xtop,ybottom,xbottom+10,ybottom);
    // y index
    line(xtop,ytop-5,xtop,ybottom);
    line(xbottom+10,ytop-5,xbottom+10,ybottom);

    stroke(255);

    textAlign(CENTER, CENTER);
    text("Calories Burned", xtop, ytop-20);

    textAlign(CENTER, CENTER);
    text("Weight", xbottom, ytop-20);
    text(message, (xbottom+xtop)/2, ytop-15)
    console.log(message)
  }

  let message;

  function mouseMoved(){
    // fill(230, 232, 243);
    // stroke(230, 232, 243);

  //console.log("mouse move called")
    for (var i = 0; i<day_weight.length; i++){
      

      let xPos2 = xtop + 5+ bar_width*[i];
      let barHeight2 = (-(cal_active[i])/(most_cal))*graphheight+ybottom;
    

    let xPos3 = xtop + 5+ bar_width*[i];
    let barHeight3 = (-(weight_lbs[i]-lightest)/(heaviest-lightest))*graphheight+ybottom;
   
   
    if(mouseX > xPos2-5 && mouseX < xPos2+5 && mouseY > barHeight2-5 && mouseY < barHeight2+5){
      message = "Calories is "+(cal_active[i]).toString()+" on "+day_weight[i];
     console.log(message+"is message 2")

  } if(mouseX > xPos3-5 && mouseX < xPos3+5 && mouseY > barHeight3-5 && mouseY < barHeight3+5){
    message = "Weight is "+(weight_lbs[i]).toString()+" on "+day_weight[i];
   console.log(message+"is message 3")

}


  }
  }


function windowResized(){
  divWidth = document.getElementById('activity-graph').clientWidth;
  divHeight = document.getElementById('activity-graph').clientHeight;
  resizeCanvas(divWidth, divHeight);
}

