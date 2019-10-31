
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import highchartsTreeMap from "highcharts/modules/treemap";
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'

if (typeof Highcharts === 'object') {
  highchartsTreeMap(Highcharts)
}


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
        data: this.props.data,
    }],
    title: {
        text: this.props.title
    }
    }
  }
  renderTreeMap = options => {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  errorMessage = (errorType) => {
    let message;
    if (errorType === 'typeOfVariable') {
      message = <h1>type is invalid</h1>
    }
  
    if (errorType === 'haveData') {
      message = <h1>No data is provided</h1>
    }
  
    if (errorType === 'haveValidKey') {
      message = <h1>Object Key is invalid</h1>
    }
    return <div>{message}</div>  
  }

  render() {
    const { data } = this.props
    if (isEmpty(data)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(data)) {
      return this.errorMessage('typeOfVariable')
    }
    return (
      <div>
        {this.renderTreeMap(this.options)}
      </div>
    );
  }
}

export default TreeMap; 