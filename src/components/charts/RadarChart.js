import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Highcharts from 'highcharts';
import HCMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash'
import { color } from '@src/assets/styles/variables'
import { errorMessage, getTextStyleForHighcharts } from '@src/helper/chartUtility'

if (typeof Highcharts === 'object') {
  HCMore(Highcharts)
}

class RadarChart extends Component {
  constructor(props) {
    super(props)

    const {
      title, width, height,
      radarCategory, groupData, patientData, legendOpen,
    } = this.props

    this.options = {
      chart: {
        polar: true,
        type: 'area',
        width,
        height,
        marginLeft: 100,
        marginTop: 50,
      },
      title: {
        text: title,
      },
      pane: {
        size: 488,
      },
      xAxis: {
        categories: radarCategory,
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          distance: 14,
          style: getTextStyleForHighcharts(color.$black),
        },
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 1,
        min: 0,
        labels: {
          enabled: false,
        },
        tickAmount: 3,
      },
      series: [
        {
          name: 'Group',
          color: color.$legend_timeline_red_01,
          data: groupData,
          pointPlacement: 'on',
        }, {
          name: 'Patient',
          color: color.$primary_navy,
          data: patientData,
          pointPlacement: 'on',
        }],
      legend: {
        enabled: legendOpen,
        align: 'left',
        verticalAlign: 'top',
        layout: 'horizontal',
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        itemStyle: getTextStyleForHighcharts(color.$black),
        reversed: true,
        x: -15,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 5,
          },
          fillOpacity: 0.3,
        },
      },
    }
  }

  renderRadarChart = (options) => (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )

  checkDataValidation = () => {
    const { groupData, patientData } = this.props
    if (_.isEmpty(groupData) || _.isEmpty(patientData)) return 'haveData'
    if (!Array.isArray(groupData) || !Array.isArray(patientData)) return 'typeOfVariable'
    return null
  }


  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return <div>{this.renderRadarChart(this.options)}</div>
  }
}

// title, width, height,
// radarCategory, groupData, patientData, legendOpen,

RadarChart.defaultProps = {
  title: null,
  width: 1200,
  height: 1200,
  radarCategory: [
    'visit_info',
    'visit_history',
    'lab',
    'echo',
    'drug',
    'spect',
    'demo',
    'comorbidity',
    'cabgpci',
    'vitalsign',
  ],
  groupData: [],
  patientData: [],
  legendOpen: true,
}

RadarChart.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  radarCategory: PropTypes.arrayOf(PropTypes.string),
  groupData: PropTypes.arrayOf(PropTypes.number),
  patientData: PropTypes.arrayOf(PropTypes.number),
  legendOpen: PropTypes.bool,
}

export default RadarChart;
