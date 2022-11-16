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
    var yaxis1 = otuId.slice(0,10).reverse().map(ids => "OTU" + ids);
    // Gving a var for otu lables so it can be called later
    var otuLabels = filteredData[0].otu_labels;
    // Format for the plot
    var formatting = [{
      type: 'bar',
      x: sampleValues.slice(0,10).reverse(),
      y: yaxis1,
      text: otuLabels,
      orientation: 'h'
    }];
    //Draw plot with Plotly
    Plotly.newPlot('bar', formatting);
  });
};

function bubbleChart (ID){
  console.log("Hello World!", ID);
};

//function runs the data visualisations and page changes based off of the dataSelect()
function optionChanged(ID) {
  barChart(ID);
  bubbleChart(ID);
};

//runs the data visualisations based off of the dataSelect()
optionChanged();