const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function createCharts(x) {
  d3.json(url).then(function (data) {
    let samples = data.samples
    var results = samples.filter(cat=>cat.id==x)[0]
console.log(results)
  });
}

function createPanel(x) {
  d3.json(url).then(function (data) {
    let metadata = data.metadata
var results = metadata.filter(cat=>cat.id==x)[0]
console.log(results)
let PANEL = d3.select("#sample-metadata");
PANEL.html("")
for (key in results) {
    PANEL.append("h5").text(`${key.toUpperCase()}: ${results[key]}`)

}

  });
}

function init() {
  d3.json(url).then(function (data) {
    console.log(data); 
    let dropdown = d3.select("#selDataset");
    let names = data.names
    for (let i = 0; i < names.length; i++) {
        dropdown.append("option").text(names[i]).property("value",names[i])
    }
    createCharts(names[0]);
    createPanel(names[0]);
  });
}



function createBarChart(data) {
    let sampleValues = data.sample_values.slice(0, 10).reverse();
    let otuIds = data.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    let otuLabels = data.otu_labels.slice(0, 10).reverse();

    let trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    let layout = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };

    Plotly.newPlot("bar", [trace], layout);
}

function createBubbleChart(data) {
    let trace = {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: "markers",
        marker: {
            size: data.sample_values,
            color: data.otu_ids,
            colorscale: "Earth"
        }
    };

    let layout = {
        title: "OTU Bubble Chart",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bubble", [trace], layout);
}

function createCharts(x) {
    d3.json(url).then(function (data) {
        let samples = data.samples.filter(sample => sample.id == x)[0];
        createBarChart(samples);
        createBubbleChart(samples);
    });
}


function optionChanged(x) {
  createCharts(x);
  createPanel(x);
}




init();
