import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from "@Card/SelectedCard";
import SankeyChart from "@Charts/SankeyChart";
import sankeyData from "@Data/dataForSankey2";

class Fig1 extends Component {
  state = {
    selectedNodes: [], //["emergency", "VSURG", "CSRU", "ECHO", "died"],
    dataForTable: null
  };

  onChange(selectedNodes) {
    this.setState({
      selectedNodes,
      selectPage: 1,
    })

    session.setCookie('selectedNodes', selectedNodes)

    axios.all([
      apiClient.pathway_events
        .get({events: JSON.stringify(this.state.selectedNodes)}),
      apiClient.pathway_patient_list
        .get({events: JSON.stringify(this.state.selectedNodes), page: 1, length: 10}),
    ]).then(axios.spread((events, patientList) => {
      this.setState({
        summaryData: utils.convertPathwayEvents(events.data),
        dataForTable: utils.appendfolderIcon(utils.convertRowData(patientList.data)),
      })
    }));
  }

  render() {
    return (
      <div>
        {/* /home/hcinyoung/dev/MDwalks-EXI-Cardio/frontend/src/pages/Home.js @193 */}
        {/* /home/hcinyoung/dev/MDwalks-EXI-Cardio/frontend/src/pages/Home.js @205 */}
        <SankeyChart
          data={sankeyData}
          selectedNodes={this.state.selectedNodes}
          onChange={this.onChange.bind(this)}
          onNodeClick={action("Node has been clicked")}
        />
        <SelectedCard
          selectedElement={this.state.selectedNodes}
        />
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
  }
}

storiesOf("JAMIA", module)
  .addDecorator(withKnobs)
  .add("fig1", () => <Fig1/>);
