function getPlots(id) {
    d3.json("samples").then(sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slce(0,10);
        console.log(labels)
        var otu_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        var otu_id = otu_top.map(d => "OTU " +d);
        console.log("OTU IDs: ${otu_id}")
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log("OTU_labels: ${labels}")
        var trace = {
            x: sampleValues,
            y: otu_id, 
            text: labels, 
            marker: {
            color: "blue"},
            type: "bar", 
            orientation: "h",
            
        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTU", 
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
    plotly.newPlot("bar", data, layout);
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.sample[0].otu_labels
        };
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
        var data1 = [trace1];
    Plotly.newPlot("bubble", data1, layout2);
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getPlots(data.names[0]);
        getDemoIndo(data.names[0]);
    });
}

init();