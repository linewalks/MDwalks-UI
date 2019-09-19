import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from "@Card/SelectedCard";
import SankeyChart from "@Charts/SankeyChart";
import sankeyData from "@Data/dataForSankey2";
import axios from "axios";

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
  }),
};

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
    this.setState({
      selectedNodes,
      selectPage: 1
    });
  }

  componentDidMount = () => {


    axios.all([
      apiClient.pathway
        .get({}),
      apiClient.patients
        .get({ N: 20 }),
    ]).then(axios.spread((sankey, plist) => {
      this.setState({
        pathway: sankey.data,
        dataForTable: plist.data,
      })
    }));
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
            
            <Table
              data={this.state.dataForTable}
            />
          </div>
        );
      else return <div></div>;
    else return <div></div>;
  }
}

storiesOf("JAMIA", module)
  .addDecorator(withKnobs)
  .add("fig1", () => <Fig1 />);
