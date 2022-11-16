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
  
    //1. Find the top 10 OTU values
  
    //filter for the id that matches the ID selected
    var filteredData = data.samples.filter(sampleobject => sampleobject.id == ID);
    // Gving a var for sampleValues so it can be called later
    var sampleValues = filteredData[0].sample_values;
    //sorting the sampleVales in decending order (they seem sorted already but there are too many to check)
    sampleValues.sort(function compareFunction(firstNum, secondNum) {
      return secondNum - firstNum;
    });
    console.log("sampleValues",sampleValues);

    
    // 2. Create the horizontal bar chart

    var data = [{
      type: 'bar',
      x: [20, 14, 23],
      y: ['giraffes', 'orangutans', 'monkeys'],
      orientation: 'h'
    }];
    
    Plotly.newPlot('bar', data);
  });
};

//function runs the data visualisations and page changes based off of the dataSelect()
function optionChanged(ID) {
  barChart(ID);
};



//runs the data visualisations based off of the dataSelect()
optionChanged();