
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import highchartsTreeMap from "highcharts/modules/treemap";
import highchartsHeatMap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'
import { errorMessage } from '@src/helper/chartUtility'

if (typeof Highcharts === 'object') {
  highchartsTreeMap(Highcharts)
  highchartsHeatMap(Highcharts)
}


class TreeMap extends Component {
  constructor(props) {
    super(props)
    const [minColor ,maxColor] = Highcharts.getOptions().colors
    this.options = {      
      colorAxis: {
        min: 0,
        max: 1,
        minColor,
        maxColor
      },
      legend: {
        enabled: false
      },
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

  render() {
    const { data } = this.props
    if (isEmpty(data)) {
      return <div>{errorMessage('haveData')}</div>
    }

    if (!Array.isArray(data)) {
      return <div>{errorMessage('typeOfVariable')}</div>
    }
    return (
      <div>
        {this.renderTreeMap(this.options)}
      </div>
    );
  }
}

export default TreeMap; 