import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'
import { color } from '../../assets/styles/variables'

class LineChart extends Component {
  constructor(props) {
    super(props)

    this.options = {
      chart: {
        type: 'line',
        width: this.props.width || '1158',
        height: this.props.height || '408',
        backgroundColor: this.props.bgColor || color.$primary_white,
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
      },

      yAxis: {
        max: this.props.yMaxValue,
        title: {
          text: this.props.yAxisTitle,
          align: this.props.yAxisTitleAlign,
        },
        tickAmount: this.props.yAxisTickAmount,
        tickInterval: this.props.yAxisTickInterval,
      },

      legend: {
        enabled: this.props.legendOpen || true,
        align: 'left',
        verticalAlign: 'top',
        layout: 'vertical',
        floating: true,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        x: 15,
        itemStyle: {
          color: color.$black,
          fontSize: '14px',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 'normal',
          letterSpacing: -0.5,
          opacity: 0.4
        }
      },

      tooltip: {
        backgroundColor: '#ffffff',
        opacity: 0.96,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#505050',
        padding: 8,
        formatter: function() {
          return this.y
        },
        style: {
          fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
          fontSize: 16,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 'normal',
          letterSpacing: -0.5,
          color: '#202020',
        } 
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

  renderLineChart = options => {
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  render() {
    const { data } = this.props
    if (isEmpty(data)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(data)) {
      return this.errorMessage('typeOfVariable')
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
