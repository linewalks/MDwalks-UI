import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { colorV1 } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/commonTag'
import { getColorsByTheme, Themes } from '@Components/ChartColor'

import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'
import CartesianGrid from '@Components/charts/cartesian/CartesianGrid'

const LabelStyle = {
  fill: colorV1.$grey08, fontWeight: 'bold', fontSize: '14px',
}

const LineChart = ({
  title,
  data,
  xDataKey,
  yDataKey,
  theme,
  isPercent,
  textMap,
  margin,
  legend,
  xData,
  yData,
}) => {
  const newYDataKey = [].concat(yDataKey)
  const colors = getColorsByTheme(theme, newYDataKey.length)
  const legendData = _.chain(newYDataKey)
    .map((entry, index) => ({ color: colors[index], text: entry }))
    .value()

  const tickFormatter = (value) => {
    if (isPercent) {
      return `${(Number(value) * 100).toFixed(0)} %`
    }
    const newValue = Number(value).toLocaleString()
    return newValue
  }

  XAxis.defaultProps.unit = xData.unit
  YAxis.defaultProps.unit = yData.unit

  const drawMargin = _.extend({}, LineChart.defaultProps.margin, margin)

  return (
    <div>
      <commonTag.chartTitle>{title}</commonTag.chartTitle>
      <commonTag.LegendList data={legendData} textMap={textMap} hide={legend.hide} />
      {
        _.isEmpty(data)
          ? <EmptyPlaceHolder />
          : (
            <Rechart.ResponsiveContainer height={415}>
              <Rechart.LineChart
                data={data}
                height={415}
                margin={drawMargin}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey={xDataKey}>
                  {
                    xData.label && (
                      <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={LabelStyle.style} />
                    )
                  }
                </XAxis>
                <YAxis tickFormatter={tickFormatter}>
                  {
                    yData.label && (
                      <Rechart.Label value={yData.label.value} offset={0} position="left" style={LabelStyle.style} />
                    )
                  }
                </YAxis>
                <Rechart.Tooltip
                  isPercent={isPercent}
                  textMap={textMap}
                  content={TooltipBox}
                />
                {
                  newYDataKey.map((entry, index) => (<Rechart.Line key={`bar${entry}`} dataKey={entry} fill={colors[index]} />))
                }
              </Rechart.LineChart>
            </Rechart.ResponsiveContainer>
          )
      }
    </div>
  )
}

LineChart.defaultProps = {
  title: null,
  data: [],
  xDataKey: 'name',
  yDataKey: ['value', []],
  theme: Themes.ThemeArrangePrimarySea,
  isPercent: false,
  textMap: {},
  margin: {
    top: 10, right: 20, bottom: 5, left: 5,
  },
  legend: {
    hide: false,
  },
  xData: {},
  yData: {},
}

LineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeSecondaryTeal,
    Themes.ThemeArrangeTertiaryRose, Themes.ThemeArrangeQuaternaryGold,
    Themes.ThemeArrangeQuinaryBerry,
  ]),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  legend: PropTypes.shape({
    hide: PropTypes.bool,
  }),
  xData: PropTypes.shape({
    label: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
    unit: PropTypes.string,
  }),
  yData: PropTypes.shape({
    label: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
    unit: PropTypes.string,
  }),
}

export default LineChart
