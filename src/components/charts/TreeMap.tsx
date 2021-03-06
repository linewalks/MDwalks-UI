import React, { Component } from 'react';

import Highcharts from 'highcharts';
import highchartsTreeMap from 'highcharts/modules/treemap';
import highchartsHeatMap from 'highcharts/modules/heatmap'
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash'
import { errorMessage } from '../../helper/chartUtility'

interface IProps {
  data: any[];
  title?: string;
}

class TreeMap extends Component <IProps> {
  static defaultProps = {
    data: [],
    title: '',
  }

  public options: any;
  constructor(props) {
    super(props)
    if (typeof Highcharts === 'object') {
      const { data, title } = this.props
      highchartsTreeMap(Highcharts)
      highchartsHeatMap(Highcharts)
      const [minColor, maxColor] = Highcharts.getOptions().colors
      this.options = {
        colorAxis: {
          min: 0,
          max: 1,
          minColor,
          maxColor,
        },
        legend: {
          enabled: false,
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          allowDrillToNode: true,
          animationLimit: 1000,
          dataLabels: {
            enabled: false,
          },
          levelIsConstant: false,
          levels: [{
            level: 1,
            dataLabels: {
              enabled: true,
            },
            borderWidth: 3,
          }],
          data,
        }],
        title: {
          text: title,
        },
      }
    }
  }

  renderTreeMap = (options) => (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )

  checkDataValidation = () => {
    const { data } = this.props
    if (_.isEmpty(data)) return 'haveData'
    if (!Array.isArray(data)) return 'typeOfVariable'
    return null
  }

  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return (
      <div>
        {this.renderTreeMap(this.options)}
      </div>
    );
  }
}

export default TreeMap;
