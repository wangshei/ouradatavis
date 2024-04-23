var sleep = {
    light:[],
    rem:[],
    deep:[],
    total:[],
    onset_latency:[],
    summary_date:[],
    efficiency:[],
    insights:[]
  };

var activity = {
    summary_date:[],
    cal_active:[],
    steps:[],
    insights:[]
};

var weight = {
    weight_lbs:[],
    day_weight:[]
};

var readiness = {
  summary_date:[],
  score:[],
  insights:[]
}

var overInsight = [];

var dataprocessed = {
  sleep:false,
  activity:false,
  weight:false,
  readiness:false
}



function updateInsights(category, insights) {
  const insightsContent = document.getElementById(`${category}-insights-content`);
  // insightsContent.innerHTML = ""; // Clear existing insights
  insights.forEach(insight => {
      const insightElement = document.createElement("div");
      insightElement.className = "insight";
      insightElement.innerHTML = `<div class="insight-info">
                                      <p>${insight}</p>
                                  </div>
                                  <br>`;
      insightsContent.appendChild(insightElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Load data from local storage
  function loadData() {
      const defaultData = { light: [], rem: [], deep: [], total: [], onset_latency: [], summary_date: [], efficiency: [], insights: [] };
      sleep = JSON.parse(localStorage.getItem('sleepData')) || defaultData;
      activity = JSON.parse(localStorage.getItem('activityData')) || { summary_date: [], cal_active: [], steps: [], insights: [] };
      weight = JSON.parse(localStorage.getItem('weightData')) || { weight_lbs: [], day_weight: [] };
      readiness = JSON.parse(localStorage.getItem('readinessData')) || { summary_date: [], score: [], insights: [] };
      overInsight = JSON.parse(localStorage.getItem('overInsight')) || [];
  }

  // Function to update the DOM with insights
  function displayInsights() {
      updateInsights('sleep', sleep.insights);
      updateInsights('activity', activity.insights);
      updateInsights('readiness', readiness.insights);
      updateInsights('overview', overInsight);
  }

  // Initialize the application
  loadData();
  displayInsights();
  
  // Function to update insights in the DOM
  
});



// Helper functions for data analysis
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const standardDeviation = (arr, mean) => Math.sqrt(average(arr.map(x => (x - mean) ** 2)));

// Function to find anomalies and high standard deviation, accepts an array and returns detailed anomalies
const analyzeSleepData = (data, metric) => {
  const mean = average(data);22
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

const analyzeReadinessData = (data) => {
  const mean = average(data);
  const sd = standardDeviation(data, mean);
  const lowThreshold = mean - 2 * sd; // Define threshold for anomalies
  const highSdThreshold = mean + 1.5 * sd; // Define threshold for high standard deviation

  let anomalies = [];
  let highSdDates = [];

  data.forEach((value, index) => {
    if (value < lowThreshold) {
      anomalies.push({ date: readiness.summary_date[index], value });
    }
    if (Math.abs(value - mean) > highSdThreshold) {
      highSdDates.push({ date: readiness.summary_date[index], value });
    }
  });

  return { anomalies, highSdDates };
};

// function updateInsights(category, insights) {
//   const insightsContent = document.getElementById(`${category}-insights-content`);
//   // insightsContent.innerHTML = ""; // Clear existing insights
//   insights.forEach(insight => {
//     const insightElement = document.createElement("div");
//     insightElement.className = "insight";
//     insightElement.innerHTML = `<div class="insight-info">
//                                 <p>${insight}</p>
//                             </div>
//                             <br>`;
//     insightsContent.appendChild(insightElement);
//   });
// }

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
            
            insights.push(`Detected ${anomalies.length} days with unusual sleep durations: ${anomalies.map(a => `${a.date} (${a.value} minutes)`).join(', ')}.`);
            if(highSdDates.length){
              insights.push(`Days with high standard deviation in sleep duration: ${highSdDates.map(a => `${a.date} (${a.value} minutes)`).join(', ')}.`);
            }

            updateInsights("overview", insights);
            for(let i=0;i<insights.length;i++){
              overInsight.push(insights[i]);
            }
            
            insights.push(`Average total sleep duration is ${average(sleep.total).toFixed(2)} minutes.`);
            updateInsights("sleep", insights);
            sleep.insights = insights;
            console.log(insights.join(" "));

            // After processing sleep data
            localStorage.setItem('sleepData', JSON.stringify(sleep));

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

              localStorage.setItem('weightData', JSON.stringify(weight));

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
                activity.cal_active.push(parseInt(row.cal_active))
              });
          });
  
            dataprocessed.activity = true;
  
            // Perform analysis on activity data
            const { anomalies, highSdDates } = analyzeActivityData(activity.steps);
  
            // Generate dynamic insights based on analysis
            const insights = [];
            

            
            insights.push(`Detected ${anomalies.length} days with unusually low step counts: ${anomalies.map(a => `${a.date} (${a.value} steps)`).join(', ')}.`);
            if(highSdDates.length){
              insights.push(`Days with high variability in step count: ${highSdDates.map(a => `${a.date} (${a.value} steps)`).join(', ')}.`);
            }
            updateInsights("overview", insights);
            for(let i=0;i<insights.length;i++){
              overInsight.push(insights[i]);
            }
            

            insights.push(`Average daily steps are ${average(activity.steps).toFixed(0)}.`);

            updateInsights("activity", insights);
            activity.insights = insights;

            console.log(insights.join(" "));
            localStorage.setItem('activityData', JSON.stringify(activity));

            // Update UI to indicate processing is done
            let domtext = document.querySelector(".activitytext");
            domtext.innerHTML = "RECEIVED [activity.xlsx]";
            domtext.style.color = "#869A7E";
            let disicon = document.querySelector(".actreq .waitinggif");
            disicon.style.transform = "scale(0.28)";
            disicon.src = "./assets/check.png";

          }else if(selectedFile.name.includes("read")){

            workbook.SheetNames.forEach((sheet) => {
              const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false });

              result.forEach(row => {
                readiness.summary_date.push(row.summary_date);
                readiness.score.push(parseInt(row.score));
              });
          });
  
            dataprocessed.readiness = true;
  
            // Perform analysis on activity data
            const { anomalies, highSdDates } = analyzeReadinessData(readiness.score);
  
            // Generate dynamic insights based on analysis
            const insights = [];
            

            insights.push(`Detected ${anomalies.length} days with unusually low readiness: ${anomalies.map(a => `${a.date} (Readiness Level ${a.value})`).join(', ')}.`);
            if(highSdDates.length){
              insights.push(`Days with high variability in readiness: ${highSdDates.map(a => `${a.date} (Readiness Level ${a.value})`).join(', ')}.`);
            }
            // updateInsights("overview", insights);

            insights.push(`Average readiness level ${average(readiness.score).toFixed(0)}.`);

            updateInsights("overview", insights);
            for(let i=0;i<insights.length;i++){
              overInsight.push(insights[i]);
            }
            
            
            readiness.insights = insights;

            console.log(insights.join(" "));

            localStorage.setItem('readinessData', JSON.stringify(readiness));
  
            // Update UI to indicate processing is done
            let domtext = document.querySelector(".readtext");
            domtext.innerHTML = "RECEIVED [readiness.xlsx]";
            domtext.style.color = "#869A7E";
            let disicon = document.querySelector(".readreq .waitinggif");
            disicon.style.transform = "scale(0.28)";
            disicon.src = "./assets/check.png";
          }else{
            return;
          }

          console.log(dataprocessed);
          
          localStorage.setItem('overInsight', JSON.stringify(overInsight));

          if(dataprocessed.sleep && dataprocessed.activity && dataprocessed.weight && dataprocessed.readiness){

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






