import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from "@Card/SelectedCard";
import SankeyChart from "@Charts/SankeyChart";
import heatmapData from "@Data/dataForHeatmap";
import metadata from "@Data/dataForMetadata";
import axios from "axios";
import * as d3 from "d3";

axios.defaults.baseURL = "http://192.168.0.103:5000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.delete["Accept"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

class ApiClient {
  constructor({ path, url, previousCancel = true }) {
    this.endpoint = url || path;
    this.previousCancel = previousCancel;
  }

  get = payload => {
    return axios({
      url: this.endpoint,
      method: "get",
      params: payload
    });
  };

  post = payload => {
    return axios({
      url: this.endpoint,
      method: "POST",
      data: payload
    });
  };
}

const apiClient = {
  pathway: new ApiClient({
    url: "/pathway"
  }),
  patients: new ApiClient({
    url: `/patients`
  })
};

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: heatmapData
    };
  }

  componentDidMount() {
    this.renderHeatmap();
  }
  renderHeatmap() {
    // set the dimensions and margins of the graph
    var margin = { top: 90, right: 25, bottom: 30, left: 400 },
      width = 900 - margin.left - margin.right,
      height = 3500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    var data = this.state.data;
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3
      .map(data, function(d) {
        return d.group;
      })
      .keys();
    var myVars = d3
      .map(data, function(d) {
        return metadata[d.variable];
      })
      .keys();
    var myLines = [
      ["A", "v1", "B", "v1", 5],
      ["B", "v1", "C", "v2", 1],
      ["C", "v2", "D", "v2", 1],
      ["D", "v2", "E", "v5", 7],
      ["E", "v5", "F", "v4", 1],
      ["F", "v4", "G", "v4", 1],
      ["G", "v4", "H", "v5", 3],
      ["H", "v5", "I", "v4", 3],
      ["I", "v4", "J", "v4", 1]
    ];

    // Build X scales and axis:
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.05);
    svg
      .append("g")
      .style("font-size", 15)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain")
      .remove();
      svg
      .append("g")
      .style("font-size", 15)
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisTop(x).tickSize(0))
      .select(".domain")
      .remove();

    // Build Y scales and axis:
    var y = d3
      .scaleBand()
      .range([height, 0])
      .domain(myVars)
      .padding(0.05);
    svg
      .append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain")
      .remove();

    // Build color scale
    var myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 100]);

    // create a tooltip
    var tooltip = d3
      .select("#heatmap")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      tooltip.style("opacity", 1);
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
    };
    var mousemove = function(d) {
      tooltip
        .html("The exact value of<br>this cell is: " + d.value)
        .style("left", d3.mouse(this)[0] + 70 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    };
    var mouseleave = function(d) {
      tooltip.style("opacity", 0);
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8);
    };

    // add the squares
    svg
      .selectAll()
      .data(data, function(d) {
        return d.group + ":" + d.variable;
      })
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return x(d.group);
      })
      .attr("y", function(d) {
        return y(metadata[d.variable]);
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", 60)
      .attr("height", 40)
      // .attr("width", x.bandwidth() )
      // .attr("height", y.bandwidth() )
      .style("fill", function(d) {
        return myColor(d.value * 100);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    // Add title to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -40)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("Attention heatmap");
  }

  render() {
    return <div id="heatmap"></div>;
  }
}

class Fig1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathway: null,
      selectedNodes: [],
      dataForTable: null
    };
  }

  onChange(selectedNodes) {
    console.log(this.state.selectedNodes);
    this.setState({
      selectedNodes,
      selectPage: 1
    });
  }

  componentDidMount = () => {
    axios
      .all([apiClient.pathway.get({}), apiClient.patients.get({ N: 20 })])
      .then(
        axios.spread((sankey, plist) => {
          this.setState({
            pathway: sankey.data,
            dataForTable: plist.data
          });
        })
      );
  };

  render() {
    if (this.state.pathway)
      if (this.state.dataForTable)
        return (
          <div>
            <SankeyChart
              data={this.state.pathway}
              selectedNodes={this.state.selectedNodes}
              onChange={this.onChange.bind(this)}
              onNodeClick={action("Node has been clicked")}
            />
            <SelectedCard selectedElement={this.state.selectedNodes} />
            <div style={{ width: "1200px", padding: "20px 0 0 40px" }}>
              <Table data={this.state.dataForTable} />
            </div>
          </div>
        );
      else return <div></div>;
    else return <div></div>;
  }
}

storiesOf("JAMIA", module)
  .addDecorator(withKnobs)
  .add("fig1. sequence mining", () => <Fig1 />)
  .add("fig2. attention heatmap", () => <Heatmap />);
