import React, { Component } from "react";
import Table from "../table/Table";
import SelectedCard from "../card/SelectedCard";
import SankeyChart from "../charts/SankeyChart";
import sankeyData from "../../data/dataForSankey2";
import patientListData from "../../data/dataForPatientList";
import axios from "axios";

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

class Sequence extends Component {
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
              onNodeClick={{}}
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


export default Sequence;