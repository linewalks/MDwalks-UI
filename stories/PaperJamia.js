import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from "@Card/SelectedCard";
import SankeyChart from "@Charts/SankeyChart";
import heatmapData from "@Data/dataForHeatmap";
import sankeyData from "@Data/dataForSankey2";
import metadata from "@Data/dataForMetadata";
import patientListData from "@Data/dataForPatientList";
import axios from "axios";
import * as core from "d3";

// to test interaction with server
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
    this.d3 = { ...core };
  }

  componentDidMount() {
    this.renderHeatmap();
  }
  renderHeatmap() {
    const d3 = this.d3;
    // set the dimensions and margins of the graph
    var margin = { top: 90, right: 25, bottom: 30, left: 400 },
      width = 900 - margin.left - margin.right,
      height = 1200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read the data
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

    // Build X scales and axis:
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.15);
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
      .padding(0.15);
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
      .style("position", "absolute")
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
        .text("Weight: " + d.value)
        .style("left", x(d.group) + 450 + "px")
        .style("top", y(metadata[d.variable]) + 80 + "px");
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
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
      // .attr("width", 60)
      // .attr("height", 40)

      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function(d) {
        return myColor(d.value * 100);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
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
    return (
      <div>
        <div id="heatmap" style={{ position: "relative", float: "left" }}></div>
        <div id="slider">
          <select className="select-board-size">
            {_.range(0, 1 + 0.2, 0.2).map(value => (
              <option key={value.toFixed(2)} value={value.toFixed(2)}>
                {value.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            float: "left",
            width: "200px",
            height: "100px",
            margin: "1em"
          }}
        ></div>
      </div>
    );
  }
}

class Fig1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathway: sankeyData,
      selectedNodes: [],
      dataForTable: patientListData
    };
  }

  onChange(selectedNodes) {
    // console.log(this.state.selectedNodes);
    this.setState({
      selectedNodes,
      selectPage: 1
    });
  }

  componentDidMount = () => {
    // axios
    //   .all([apiClient.pathway.get({}), apiClient.patients.get({ N: 20 })])
    //   .then(
    //     axios.spread((sankey, plist) => {
    //       this.setState({
    //         pathway: sankey.data,
    //         dataForTable: plist.data
    //       });
    //     })
    //   );
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
  .add("fig2. attention heatmap - all patients", () => <Heatmap />)
  .add("fig3. attention heatmap - single patient", () => <Heatmap />);
