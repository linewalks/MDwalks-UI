import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color, colorV1 } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/commonTag'
import { getColorsByTheme, Themes } from '@Components/ChartColor'

import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'
import CartesianGrid from '@Components/charts/cartesian/CartesianGrid'

const LabelStyle = {
  fill: colorV1.$grey08,
  fontWeight: 'bold',
  fontSize: '14px',
  textAnchor: 'middle',
  letterSpacing: -0.5,
}

const DefaultDotStyle = {
  r: 5,
  stroke: 'none',
}

const HoverDotStyle = {
  r: 8,
  stroke: color.$primary_white,
  strokeWidth: 3,
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
  height,
  xAxisType,
  xAxisTicks,
  yAxisTicks,
  lineDot,
  yLabelAngle,
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
            <Rechart.ResponsiveContainer height={xData.label ? height + 28 : height}>
              <Rechart.LineChart
                data={data}
                height={xData.label ? height + 28 : height}
                margin={drawMargin}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  tickMargin={8}
                  dataKey={xDataKey}
                  ticks={xAxisTicks}
                  type={xAxisType}
                >
                  {
                    xData.label && (
                      <Rechart.Label value={xData.label.value} offset={-16} position="insideBottom" style={LabelStyle} />
                    )
                  }
                </XAxis>
                <YAxis
                  tickMargin={16}
                  tickFormatter={tickFormatter}
                  yAxisTicks={yAxisTicks}
                >
                  {
                    yData.label && (
                      <Rechart.Label value={yData.label.value} offset={-10} angle={yLabelAngle} position="insideLeft" style={LabelStyle} />
                    )
                  }
                </YAxis>
                <Rechart.Tooltip
                  isPercent={isPercent}
                  textMap={textMap}
                  content={TooltipBox}
                  cursor={{
                    stroke: colorV1.$grey06,
                    strokeDasharray: 3,
                  }}
                />
                {
                  newYDataKey.map((entry, index) => (
                    <Rechart.Line
                      key={`line${entry}`}
                      dot={lineDot && DefaultDotStyle}
                      activeDot={lineDot && HoverDotStyle}
                      dataKey={entry}
                      stroke={colors[index]}
                      strokeWidth={4}
                      fill={colors[index]}
                      connectNulls={xAxisType === 'number'}
                    />
                  ))
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
    top: 10, right: 41, bottom: 0, left: 5,
  },
  legend: {
    hide: false,
  },
  xData: {},
  yData: {},
  height: 303,
  xAxisType: 'category',
  xAxisTicks: null,
  yAxisTicks: null,
  lineDot: true,
  yLabelAngle: 0,
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
    Themes.ThemeArrangeQuinaryBerry, Themes.ThemeCompareSecondaryTeal,
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
  height: PropTypes.number,
  xAxisType: PropTypes.oneOf(['category', 'number']),
  xAxisTicks: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  yAxisTicks: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  lineDot: PropTypes.bool,
  yLabelAngle: PropTypes.number,
}

export default LineChart
