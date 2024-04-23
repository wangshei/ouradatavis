var sleep = {
    light:[],
    rem:[],
    deep:[],
    total:[],
    onset_latency:[],
    summary_date:[],
    efficiency:[]
  };

var activity = {
    summary_date:[],
    steps:[]
};

var weight = {
    weight_lbs:[],
    day_weight:[]
};

var dataprocessed = {
  sleep:false,
  activity:false,
  weight:false
}


// Helper functions for data analysis
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const standardDeviation = (arr, mean) => Math.sqrt(average(arr.map(x => (x - mean) ** 2)));

// Function to find anomalies and high standard deviation, accepts an array and returns detailed anomalies
const analyzeSleepData = (data, metric) => {
  const mean = average(data);
  const sd = standardDeviation(data, mean);
  const lowThreshold = mean - 1.5 * sd; // Define threshold for anomalies
  const highSdThreshold = mean + 1.5 * sd; // Define threshold for high standard deviation

  let anomalies = [];
  let highSdDates = [];

  data.forEach((value, index) => {
    if (value < lowThreshold) {
      anomalies.push({ date: sleep.summary_date[index], value });
    }
    if (Math.abs(value - mean) > highSdThreshold) {
      highSdDates.push({ date: sleep.summary_date[index], value });
    }
  });

  return { anomalies, highSdDates };
};

// Function to analyze weight data for anomalies and high standard deviation
const analyzeWeightData = (data) => {
  const mean = average(data);
  const sd = standardDeviation(data, mean);
  const lowThreshold = mean - 2 * sd; // Define threshold for anomalies
  const highSdThreshold = mean + 1.5 * sd; // Define threshold for high standard deviation

  let anomalies = [];
  let highSdDates = [];

  data.forEach((value, index) => {
    if (value < lowThreshold) {
      anomalies.push({ date: weight.day_weight[index], value });
    }
    if (Math.abs(value - mean) > highSdThreshold) {
      highSdDates.push({ date: weight.day_weight[index], value });
    }
  });

  return { anomalies, highSdDates };
};

// Function to analyze activity data for anomalies and high standard deviation
const analyzeActivityData = (data) => {
  const mean = average(data);
  const sd = standardDeviation(data, mean);
  const lowThreshold = mean - 2 * sd; // Define threshold for anomalies
  const highSdThreshold = mean + 1.5 * sd; // Define threshold for high standard deviation

  let anomalies = [];
  let highSdDates = [];

  data.forEach((value, index) => {
    if (value < lowThreshold) {
      anomalies.push({ date: activity.summary_date[index], value });
    }
    if (Math.abs(value - mean) > highSdThreshold) {
      highSdDates.push({ date: activity.summary_date[index], value });
    }
  });

  return { anomalies, highSdDates };
};



document.addEventListener('DOMContentLoaded', (event) => {
  // This ensures the DOM is fully loaded before attaching event listeners
  let selectedFile;

  document.getElementById("dropzone-file").addEventListener("change", (event) => {
      selectedFile = event.target.files[0];
      console.log(selectedFile.name)
      

      if (!selectedFile) {
          return; // Exit if no file is selected
      }

      let fileReader = new FileReader();

      fileReader.readAsBinaryString(selectedFile);

      fileReader.onload = (event) => {

          let fileData = event.target.result;
          let workbook = XLSX.read(fileData, { type: "binary" });

          if(selectedFile.name.includes("sleep")){
            workbook.SheetNames.forEach((sheet) => {
                const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false });

                for (let i = 0; i < result.length; i++) {
                    sleep.summary_date.push(result[i].summary_date);
                    sleep.light.push(parseFloat(result[i].light));
                    sleep.rem.push(parseFloat(result[i].rem));
                    sleep.deep.push(parseFloat(result[i].deep));
                    sleep.total.push(parseFloat(result[i].total));
                    sleep.onset_latency.push(parseFloat(result[i].onset_latency));
                    sleep.efficiency.push(parseFloat(result[i].efficiency));
                }
            });

            // Perform analysis using total sleep data
            const { anomalies, highSdDates } = analyzeSleepData(sleep.total, 'total');

            // Generate dynamic insights based on analysis
            const insights = [];
            insights.push(`Average total sleep duration is ${average(sleep.total).toFixed(2)} minutes.`);
            insights.push(`Detected ${anomalies.length} days with unusual sleep durations: ${anomalies.map(a => `${a.date} (${a.value} minutes)`).join(', ')}.`);
            if(anomalies.length){
              insights.push(`Days with high standard deviation in sleep duration: ${highSdDates.map(a => `${a.date} (${a.value} minutes)`).join(', ')}.`);
            }

            console.log(insights.join(" "));


            console.log(insights)

            dataprocessed.sleep = true;
            let domtext = document.querySelector(".sleeptext");
            domtext.innerHTML = "RECEIVED [sleep.xlsx]";
            domtext.style.color = "#869A7E";
            let disicon = document.querySelector(".sleepreq .waitinggif");
            disicon.style.transform ="scale(0.28)";
            disicon.src ="./assets/check.png";

            // console.log("Light sleep data :", light);
            // console.log("Rem sleep data :", rem);
            // console.log("Deep sleep data :", deep);
            // console.log("Total sleep data :", total);

       }else if(selectedFile.name.includes("weight")){
                workbook.SheetNames.forEach((sheet) => {
                  const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false });

                  for (let i = 0; i < result.length; i++) {
                    weight.weight_lbs.push(result[i].weight_lbs);
                    weight.day_weight.push(result[i].day);
                }
              });

               // Perform analysis on weight data
              const { anomalies, highSdDates } = analyzeWeightData(weight.weight_lbs);

              // Generate dynamic insights based on analysis
              // const insights = [];
              // insights.push(`Average weight is ${average(weight.weight_lbs).toFixed(2)} lbs.`);
              // insights.push(`Detected ${anomalies.length} days with unusual weight readings: ${anomalies.map(a => `${a.date} (${a.value} lbs)`).join(', ')}.`);
              // insights.push(`Days with high standard deviation in weight: ${highSdDates.map(a => `${a.date} (${a.value} lbs)`).join(', ')}.`);

              // console.log(insights.join(" "));


              dataprocessed.weight = true;
              let domtext = document.querySelector(".weitext");
              domtext.innerHTML = "RECEIVED [weight oura.xlsx]";
              domtext.style.color = "#869A7E";
              let disicon = document.querySelector(".weireq .waitinggif");
              disicon.style.transform ="scale(0.28)";
              disicon.src ="./assets/check.png";
            
          }else if(selectedFile.name.includes("activity")){

            workbook.SheetNames.forEach((sheet) => {
              const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false });

              result.forEach(row => {
                activity.summary_date.push(row.summary_date);
                activity.steps.push(parseInt(row.steps));
              });
          });


            
  
            dataprocessed.activity = true;
  
            // Perform analysis on activity data
            const { anomalies, highSdDates } = analyzeActivityData(activity.steps);
  
            // Generate dynamic insights based on analysis
            const insights = [];
            insights.push(`Average daily steps are ${average(activity.steps).toFixed(0)}.`);
            insights.push(`Detected ${anomalies.length} days with unusually low step counts: ${anomalies.map(a => `${a.date} (${a.value} steps)`).join(', ')}.`);
            insights.push(`Days with high variability in step count: ${highSdDates.map(a => `${a.date} (${a.value} steps)`).join(', ')}.`);
  
            console.log(insights.join(" "));
  
            // Update UI to indicate processing is done
            let domtext = document.querySelector(".activitytext");
            domtext.innerHTML = "RECEIVED [activity.xlsx]";
            domtext.style.color = "#869A7E";
            let disicon = document.querySelector(".actreq .waitinggif");
            disicon.style.transform = "scale(0.28)";
            disicon.src = "./assets/check.png";
          }else{
            return;
          }

          console.log(dataprocessed);
          
          if(dataprocessed.sleep && dataprocessed.activity && dataprocessed.weight){

            setTimeout(() => {
              var modal = document.getElementById("myModal");
              modal.style.display = "none";
            }, "200");
            
          }
          
      };

      fileReader.onerror = (error) => {
          console.error('Error reading file:', error);
      };
  });
});









// var inputbutton = document.getElementById("dropzone-file");

// inputbutton.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log(e)
//     let fileReader = new FileReader();
//     console.log(inputbutton.files.item(0).name)
//     // Read the selected file as binary string
//     fileReader.readAsBinaryString(sleepFile);
  
//     // Process the file data when it's loaded
//     fileReader.onload = (event) => {
//       let fileData = event.target.result;
  
//       // Read the Excel workbook
//       let workbook = XLSX.read(
//         fileData,
//         { type: "binary" },
//         { dateNF: "mm/dd/yyyy" }
//       );
  
  
//       // Change each sheet in the workbook to json
//       workbook.SheetNames.forEach(async (sheet) => {
//         const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//           raw: false,
//         });
  
//         if (sleepFile){
//           for(var i = 0; i < result.length; i++){
//             sleep.light.push(result[i].light);
//             sleep.rem.push(result[i].rem);
//             sleep.deep.push(result[i].deep);
//             sleep.total.push(result[i].total);
//             sleep.onset_latency.push(result[i].onset_latency);
//             sleep.summary_date.push(result[i].summary_date);
//           }
       
        
//         console.log(sleep);
  
  
//         console.log(result);
//           sleepDataProcessed = true;3
//           console.log("sleepDataProcessed =" + sleepDataProcessed);
//           checkDataProcessed()
  
//         }
        
  
//       });
//     };
   
   
//   });
  
//   let weightFile;
//   document.getElementById("weightFile").addEventListener("change", (event) => {
//     weightFile = event.target.files[0]; // selecting the file
//   });
  
//   document.getElementById("upload-button").addEventListener("click", (e) => {
//     e.preventDefault();
//     let fileReader2 = new FileReader();
  
//     // Read the selected file as binary string
//     fileReader2.readAsBinaryString(weightFile);
  
//     // Process the file data when it's loaded
//     fileReader2.onload = (event) => {
//       let fileData2 = event.target.result;
  
//       // Read the Excel workbook
//       let workbook = XLSX.read(
//         fileData2,
//         { type: "binary" },
//         { dateNF: "mm/dd/yyyy" }
//       );
  
  
//       // Change each sheet in the workbook to json
//       workbook.SheetNames.forEach(async (sheet) => {
//         const result2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
//           raw: false,
//         });
  
//         if (weightFile){
//           for(var i = 0; i < result2.length; i++){
//             day_weight.push(result2[i].day)
//             weight_lbs.push(result2[i].weight_lbs)
//           }
                  
//         console.log("Day data :"+ `\n` + day_weight);
//         console.log("Total weight data :"+ `\n` + weight_lbs);
//       console.log(result2);
//           weightDataProcessed = true;
//           console.log("weightDataProcessed =" + weightDataProcessed);
//           checkDataProcessed()
  
//         }
  
//       });
//     };
//   });
