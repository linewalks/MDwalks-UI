import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from "@Card/SelectedCard";
import SankeyChart from "@Charts/SankeyChart";
// import sankeyData from "@Data/dataForSankey2";
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
  })
  // pathway: new ApiClient({
  //   url: `/patient-list/`
  // }),
};

class Fig1 extends Component {
  constructor(props) {
    super(props);
    // this.sankey = apiClient.pathway.get({ name: "Test123" }).then(response => {
    //   return response.data;
    // });
    // axios.all([
    //   apiClient.pathway
    //     .get({name: 'Test123'})
    // ]).then(axios.spread((sankey) => {
    //   return sankey.data;
    //   // this.setState({
    //   //   summaryData: utils.convertPathwayEvents(events.data),
    //   //   dataForTable: utils.appendfolderIcon(utils.convertRowData(patientList.data)),
    //   // })
    // }));
    this.state = {
      pathway: null,
      selectedNodes: [], //["emergency", "VSURG", "CSRU", "ECHO", "died"],
      dataForTable: null
    };
  }
  componentDidMount = () => {
    apiClient.pathway.get({ name: "Test123" }).then(response => {
      this.setState({
        pathway: sankey.data
      });
    });
  };

  onChange(selectedNodes) {
    this.setState({
      selectedNodes,
      selectPage: 1
    });

    // axios.all([apiClient.pathway.get({ name: "Test123" })]).then(
    //   axios.spread(sankey => {
    //     this.setState({
    //       pathway: sankey.data
    //     });
    //   })
    // );

    // session.setCookie('selectedNodes', selectedNodes)

    // axios.all([
    //   apiClient.pathway_events
    //     .get({events: JSON.stringify(this.state.selectedNodes)}),
    //   apiClient.pathway_patient_list
    //     .get({events: JSON.stringify(this.state.selectedNodes), page: 1, length: 10}),
    // ]).then(axios.spread((events, patientList) => {
    //   this.setState({
    //     summaryData: utils.convertPathwayEvents(events.data),
    //     dataForTable: utils.appendfolderIcon(utils.convertRowData(patientList.data)),
    //   })
    // }));
  }

  componentDidMount = () => {
    apiClient.pathway.get({ name: "Test123" }).then(response => {
      this.setState({
        pathway: response.data
      });
    });
  };

  render() {
    if (this.state.pathway)
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
            data={{
              headers: ["a", "b", "c"],
              rowData: [
                {
                  a: 1,
                  b: 2,
                  c: 3
                },
                {
                  a: 4,
                  b: 5,
                  c: 6
                },
                {
                  a: 7,
                  b: 8,
                  c: 9
                }
              ]
            }}
          />
        </div>
      );
    else return <div></div>;
  }
}

storiesOf("JAMIA", module)
  .addDecorator(withKnobs)
  .add("fig1", () => <Fig1 />);
