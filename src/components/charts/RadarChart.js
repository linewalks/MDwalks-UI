import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash'
import { color } from '@src/assets/styles/variables'
import { errorMessage, getTextStyleForHighcharts } from '@src/helper/chartUtility'

if (typeof Highcharts === 'object') {
  HC_more(Highcharts)
}

class RadarChart extends Component {
  constructor(props) {
    super(props)

    this.options = {
      chart: {
        polar: true,
        type: 'area',
        width: this.props.width,
        height: this.props.height,
        marginLeft: 100,
        marginTop: 50
      },
      title: {
        text: this.props.title
      },
      pane: {
        size: 488
      },
      xAxis: {
        categories: this.props.radarCategory,
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          distance: 14,
          style: getTextStyleForHighcharts(color.$black),
        }
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 1,
        min: 0,
        labels: {
          enabled: false
        },
        tickAmount: 3 
      },
      series: [
      {
        name: 'Group',
        color: color.$legend_timeline_red_01,
        data: this.props.groupData,
        pointPlacement: 'on'
      },{
        name: 'Patient',
        color: color.$primary_navy,
        data: this.props.patientData,
        pointPlacement: 'on'
      },],
      legend: {
        enabled: this.props.legendOpen,
        align: 'left',
        verticalAlign: 'top',
        layout: 'horizontal',
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        itemStyle: getTextStyleForHighcharts(color.$black),
        reversed: true,
        x: -15
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 5
            },
            fillOpacity: 0.3
        }
      },
    }
  }

  renderRadarChart = options => {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  checkDataValidation = () => {
    const { groupData, patientData } = this.props
    if (_.isEmpty(groupData) || _.isEmpty(patientData)) return 'haveData'
    if (!Array.isArray(groupData) || !Array.isArray(patientData)) return 'typeOfVariable' 
  }


  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return <div>{this.renderRadarChart(this.options)}</div>
  }
}

RadarChart.defaultProps = {
  title: null,
  width: 1200,
  height: 1200,
  radarCategory: [
    "visit_info",
    "visit_history",
    "lab",
    "echo",
    "drug",
    "spect",
    "demo",
    "comorbidity",
    "cabgpci",
    "vitalsign"
  ],
  legendOpen: true
}

export default RadarChart; 