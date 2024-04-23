// Function to normalize data
function normalizeData(data) {
  const minMaxValues = {};

  // Find min and max values for each property
  for (let property in data[0]) {
    minMaxValues[property] = {
      min: Math.min(...data.map(item => item[property])),
      max: Math.max(...data.map(item => item[property])),
    };
  }

  // Normalize data
  return data.map(item => {
    const normalizedItem = {};
    for (let property in item) {
      const { min, max } = minMaxValues[property];
      normalizedItem[property] = (item[property] - min) / (max - min);
    }
    return normalizedItem;
  });
}

// Function to plot the graph on canvas
function plotGraph(ctx, datasets, startDate, endDate) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, canvasHeight - 50);
  ctx.lineTo(canvasWidth - 50, canvasHeight - 50);
  ctx.stroke();
  
  // Plot datasets
  const numDatasets = datasets.length;
  const xOffset = (canvasWidth - 100) / (endDate - startDate);
  const yOffset = (canvasHeight - 100) / 1; // Assuming y-axis range is from 0 to 1
  
  datasets.forEach((dataset, index) => {
    ctx.beginPath();
    dataset.forEach((data, dataIndex) => {
      const x = 50 + (data.date - startDate) * xOffset;
      const y = canvasHeight - 50 - data.value * yOffset;
      if (dataIndex === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    ctx.stroke();
  });
}

// Load and process Excel files
function processData(files) {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  let datasets = [];
  let startDate = null;
  let endDate = null;
  let filesProcessed = 0;

  // Function to process each file
  function processFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assume only one sheet per file
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract dates and values
      const dataset = rows.slice(1).map(row => ({
        date: new Date(row[0]), // Assuming the date is in the first column
        value: parseFloat(row[1]) // Assuming the value is in the second column
      }));

      // Determine start and end dates
      const firstDate = dataset[0].date;
      const lastDate = dataset[dataset.length - 1].date;
      if (!startDate || firstDate < startDate) {
        startDate = firstDate;
      }
      if (!endDate || lastDate > endDate) {
        endDate = lastDate;
      }

      // Normalize data and push to datasets array
      datasets.push(normalizeData(dataset));

      // Plot graph when all files are processed
      if (++filesProcessed === files.length) {
        plotGraph(ctx, datasets, startDate, endDate);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Read and process each file
  for (let file of files) {
    processFile(file);
  }
}

// Listen for file input change
document.getElementById('fileInput').addEventListener('change', function(event) {
  processData(event.target.files);
});
