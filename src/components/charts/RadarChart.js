import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'
import { color } from '@src/assets/styles/variables'

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
          style: {
            color: color.$black,
            fontFamily: 'Spoqa Han Sans',
            fontSize: '14px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: -0.5,
            opacity: 0.6
          }
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
        itemStyle: {
          color: color.$black,
          fontFamily: 'Spoqa Han Sans',
          fontSize: '14px',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 'normal',
          letterSpacing: -0.5,
          opacity: 0.4
        },
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

  renderRadarChart = options => {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  render() {
    const { groupData, patientData } = this.props
    if (isEmpty(groupData) || isEmpty(patientData)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(groupData) || !Array.isArray(patientData)) {
      return this.errorMessage('typeOfVariable')
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