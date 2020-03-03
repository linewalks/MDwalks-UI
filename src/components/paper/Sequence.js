import React, { Component } from 'react';
import Table from '@Components/table/Table';
import SelectedCard from '@Cards/SelectedCard';
import SankeyChart from '@Charts/SankeyChart';
import sankeyData from '@src/data/dataForSankey2';
import patientListData from '@src/data/dataForPatientList';
// import axios from 'axios'

// // to test interaction with server
// axios.defaults.baseURL = 'http://192.168.0.103:5000';
// axios.defaults.headers.post.Accept = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.delete.Accept = 'application/json';
// axios.defaults.headers.delete['Content-Type'] = 'application/json';

class Sequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathway: sankeyData,
      selectedNodes: [],
      dataForTable: patientListData,
    };
  }

  onChange(selectedNodes) {
    this.setState({
      selectedNodes,
      // selectPage: 1,
    });
  }

  componentDidMount = () => {
  };

  render() {
    const { pathway, dataForTable, selectedNodes } = this.state
    if (pathway) {
      if (dataForTable) {
        return (
          <div>
            <SankeyChart
              data={pathway}
              selectedNodes={selectedNodes}
              onChange={this.onChange}
              onNodeClick={{}}
            />
            <SelectedCard selectedElement={selectedNodes} isLastHighlighted />
            <div style={{ width: '900px', padding: '20px 0 0 40px' }}>
              <Table data={dataForTable} />
            </div>
          </div>
        );
      }
      return <div />;
    }
    return <div />;
  }
}


export default Sequence;
