// Reading in the data source
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Dropdown box allowing user to select
function dataSelect() {
  //Connecting to the index.html
  var dropdownMenu = d3.select("#selDataset");
  // Fetching Json and iterating though
  d3.json(url).then(function(data) {
    // For each name var add to the dropdownMenu and display
    data.names.forEach((name) => {
      dropdownMenu
      .append("option")
      .text(name)
      .property("value", name);
    });
  });

};

//Run the data selct function allowing the user to select an ID
dataSelect();

// Visualises a bar chart from the selected ID
function barChart (ID) {
  //Open the json URL
  d3.json(url).then(function(data) {
    //filter for the id that matches the ID selected
    var filteredData = data.samples.filter(sampleobject => sampleobject.id == ID);
    // Gving a var for sampleValues so it can be called later
    var sampleValues = filteredData[0].sample_values;
    // Gving a var for otuId so it can be called later
    var otuId = filteredData[0].otu_ids;
    // Slice, reverse then put OTU for otuIds for the y axis
    var yaxis = otuId.slice(0,10).reverse().map(ids => "OTU" + ids);
    // Slice, reverse sampleval for the x axis
    var xaxis = sampleValues.slice(0,10).reverse();
    // Gving a var for otu lables so it can be called later
    var otuLabels = filteredData[0].otu_labels;
    // Format for the plot
    var formatting = [{
      type: 'bar',
      x: xaxis,
      y: yaxis,
      text: otuLabels,
      orientation: 'h'
    }];
    var layout = {
      title: "Top 10 Bacteria Found",
      width: 500,
      height: 500
    };
    //Draw plot with Plotly
    Plotly.newPlot('bar', formatting, layout);
  });
};

// Visualises a bubble chart from the selected ID
function bubbleChart (ID){
  d3.json(url).then(function(data) {
    //filter for the id that matches the ID selected
    var filteredData = data.samples.filter(sampleobject => sampleobject.id == ID);
    // Gving a var for sampleValues so it can be called later
    var sampleValues = filteredData[0].sample_values;
    // Gving a var for otuId so it can be called later
    var otuId = filteredData[0].otu_ids;
    // Gving a var for otu lables so it can be called later
    var otuLabels = filteredData[0].otu_labels;
    // Format for the plot
    var formatting = [{
      type: 'bubble',
      x: otuId,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuId,
        colorscale: 'Earth'
      }
    }];
    var layout = {
      title: "Bacteria Found",
      width: 1300,
      height: 600 
    };
    //Draw plot with Plotly
    Plotly.newPlot('bubble', formatting, layout);
  });
};

// Display Metadata
function displayMetadata (ID) {
  d3.json(url).then(function(data) {
    //filter for the id that matches the ID selected
    var metadata = data.metadata.filter(sampleobject => sampleobject.id == ID);
    // Selects entry on the html
    var sampleMeta = d3.select("#sample-metadata");
    //clear the display to prevent stacking inputs
    sampleMeta.html("");
    // add metadata to the display
    Object.entries(metadata[0]).forEach(([type, entry]) => {
      sampleMeta.append("h6").text(`${type}: ${entry}`);
    });
  });
};

//Bounus gaugeChart display
function gaugeChart (ID) {
  d3.json(url).then(function(data) {
    //filter for the id that matches the ID selected
    var metadata = data.metadata.filter(sampleobject => sampleobject.id == ID);
    //in metadata find how many washes per week
    var washPer = metadata[0].wfreq;
    //Create data for gauge
    var gaugeData = [
      {
        domain: washPer,
        value: washPer,
        title: { text: "Scrubs Per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: "lightgray" },
            { range: [1, 2], color: "lightgray" },
            { range: [2, 3], color: "lightgray" },
            { range: [3, 4], color: "lightgray" },
            { range: [4, 5], color: "lightgray" },
            { range: [5, 6], color: "lightgray" },
            { range: [6, 7], color: "lightgray" },
            { range: [7, 8], color: "lightgray" },
            { range: [8, 9], color: "lightgray" },
          ]
        }
      }
    ];
    // Print the guage
    Plotly.newPlot("gauge", gaugeData);
  });
};

//function runs the data visualisations and page changes based off of the dataSelect()
function optionChanged(ID) {
  barChart(ID);
  bubbleChart(ID);
  displayMetadata(ID);
  gaugeChart(ID);
};

//runs the data visualisations based off of the dataSelect()
optionChanged();