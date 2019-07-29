import React, { Component } from 'react';
import Highcharts from 'highcharts';
import highchartsTreeMap from "highcharts/modules/treemap";
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'

class TreeMap extends Component {
  constructor(props) {
    super(props)
    this.options = {
      series: [{
        type: "treemap",
        layoutAlgorithm: 'squarified',
        allowDrillToNode: true,
        animationLimit: 1000,
        dataLabels: {
            enabled: false
        },
        levelIsConstant: false,
        levels: [{
            level: 1,
            dataLabels: {
                enabled: true
            },
            borderWidth: 3
        }],
        data: this.props.data
    }],
    title: {
        text: this.props.title
    }
    }
  }
  renderTreeMap = options => {
    return (
      <HighchartsReact highcharts={highchartsTreeMap(Highcharts)} options={options} />
    )
  }
  render() {
    const { data } = this.props
    return (
      <div>
        {this.renderTreeMap(this.options)}
      </div>
    );
  }
}

export default TreeMap;