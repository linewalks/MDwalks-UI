import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash'
import { color } from '@src/assets/styles/variables'
import { errorMessage, getTextStyleForHighcharts } from '@src/helper/chartUtility'

class LineChart extends Component {
  constructor(props) {
    super(props)

    this.options = {
      chart: {
        type: 'line',
        width: this.props.width || '1158',
        height: this.props.height || '408',
        backgroundColor: this.props.bgColor || color.$primary_white,
        marginTop: 60
      },
      title: {
        text: this.props.title,
      },
      series: this.props.data,
      xAxis: {
        categories: this.props.xAxisCategory,
        title: {
          text: this.props.xAxisTitle,
          align: this.props.xAxisTitleAlign,
        },
        tickAmount: this.props.xAxisTickAmount,
        tickInterval: this.props.xAxisTickInterval,
        crosshair: {
          width: 2,
          color: color.$line_btn_grey,
          dashStyle: 'shortdot'
        },
        labels: {
          style: getTextStyleForHighcharts(color.$black),
        }
      },

      yAxis: {
        min: 0,
        max: this.props.yMaxValue,
        title: {
          text: this.props.yAxisTitle,
          align: this.props.yAxisTitleAlign,
        },
        tickAmount: this.props.yAxisTickAmount,
        tickInterval: this.props.yAxisTickInterval,
        labels: {
          style: getTextStyleForHighcharts(color.$black),
        }
      },

      legend: {
        enabled: this.props.legendOpen || true,
        margin: 5,
        padding: 0,
        align: 'left',
        verticalAlign: 'top',
        layout: 'vertical',
        floating: true,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        itemStyle: getTextStyleForHighcharts(color.$black),
      },

      tooltip: {
        backgroundColor: '#ffffff',
        opacity: 0.96,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#505050',
        padding: 12,
        formatter: function() {
          return `<span style="opacity:0.6">${this.series.name} </span><span style="opacity:0.9"> <b> ${this.y}</b></span>`
        },
        style: getTextStyleForHighcharts(color.$black),
      },

      plotOptions: {
        series: {
          marker: {
            radius: 5,
            width: 10,
            height: 10
          },
          color: color.$solid_default
        }
    },
    }
  }

  renderLineChart = options => {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  checkDataValidation = () => {
    const { data } = this.props    
    if (_.isEmpty(data)) return 'haveData'
    if (!Array.isArray(data)) return 'typeOfVariable' 
  }

  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return <div>{this.renderLineChart(this.options)}</div>
  }
}

LineChart.defaultProps = {
  title: null,
  data: [],
  xAxisCategory: [],
  xAxisTitle: null,
  xAxisTitleAlign: 'middle',
  yAxisTitle: null,
  yAxisTitleAlign: 'middle',
}

export default LineChart;
