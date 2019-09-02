import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import isEmpty from 'lodash/isEmpty'


class LineChart extends Component {
  constructor(props) {
    super(props)

    this.options = {
      chart: {
        type: 'line',
        width: this.props.width || '1158',
        height: this.props.height || '408',
        backgroundColor: '#f7fafb',
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
        max: 1,
        title: {
          text: this.props.yAxisTitle,
          align: this.props.yAxisTitleAlign,
        },
        tickAmount: this.props.yAxisTickAmount,
        tickInterval: this.props.yAxisTickInterval,
      },

      legend: {
        enabled: false,
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
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#002d4f'],
                    [1, '#189bff'] 
                ]
            }
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
  title: 'Line Chart',
  data: [],
  xAxisCategory: [],
  xAxisTitle: 'xAxis',
  xAxisTitleAlign: 'middle',
  yAxisTitle: 'yAxis',
  yAxisTitleAlign: 'middle',
}

export default LineChart;
