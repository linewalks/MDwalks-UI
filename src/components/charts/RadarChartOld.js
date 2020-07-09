import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Highcharts from 'highcharts';
import HCMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash'
import { colorV1 } from '@src/assets/styles/variables'
import { errorMessage, getTextStyleForHighcharts } from '@src/helper/chartUtility'

import {
  getColorsByTheme,
  Themes,
} from '@Components/ChartColor'

if (typeof Highcharts === 'object') {
  HCMore(Highcharts)
}

class RadarChartOld extends Component {
  constructor(props) {
    super(props)

    const {
      title, width, height,
      radarCategory, groupData, patientData, legendOpen,
      theme,
    } = this.props

    this.colors = getColorsByTheme(theme)

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
      xAxis: {
        categories: radarCategory,
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          distance: 14,
          style: getTextStyleForHighcharts(colorV1.$grey08),
        },
        gridLineWidth: 1,
        gridLineColor: colorV1.$grey06,
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        gridLineWidth: 1,
        gridLineColor: colorV1.$grey06,
        lineWidth: 1,
        min: 0,
        labels: {
          enabled: false,
        },
        tickAmount: 3,
        lineColor: colorV1.$grey06,
      },
      series: [
        {
          name: 'Group',
          color: this.colors[1],
          data: groupData,
          pointPlacement: 'on',
        },
        {
          name: 'Patient',
          color: this.colors[0],
          data: patientData,
          pointPlacement: 'on',
        },
      ],
      legend: {
        enabled: legendOpen,
        align: 'left',
        verticalAlign: 'top',
        layout: 'horizontal',
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        itemStyle: getTextStyleForHighcharts(colorV1.$grey08),
        reversed: true,
        x: -18.5,
        itemDistance: 24,
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

RadarChartOld.defaultProps = {
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
  theme: Themes.ThemeComparePrimarySea2,
}

RadarChartOld.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  radarCategory: PropTypes.arrayOf(PropTypes.string),
  groupData: PropTypes.arrayOf(PropTypes.number),
  patientData: PropTypes.arrayOf(PropTypes.number),
  legendOpen: PropTypes.bool,
  theme: PropTypes.oneOf([
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
  ]),
}

export default RadarChartOld;
