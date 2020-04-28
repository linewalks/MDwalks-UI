import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import Heading from '@Components/layout/Heading'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/cdmCommon'
import { getColorsByTheme, Themes } from '@Components/ChartColor'

const LineChart = ({
  title,
  data,
  xDataKey,
  yDataKey,
  theme,
  isPercent,
  margin,
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

  return (
    <div>
      <Heading size="18" style={{ marginBottom: '30px' }}>{title}</Heading>
      <commonTag.LegendList data={legendData} />
      {
        _.isEmpty(data)
          ? <EmptyPlaceHolder />
          : (
            <Rechart.ResponsiveContainer height={415}>
              <Rechart.LineChart
                data={data}
                height={415}
                margin={margin}
              >
                <Rechart.CartesianGrid vertical={false} stroke={color.$line_graph_xy_grey} />
                <Rechart.XAxis tickLine={false} tickMargin={10} dataKey={xDataKey} stroke="rgba(0, 0, 0, 0.6)">
                  {
                    xData.label && (
                      <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={{ fill: 'rgba(0, 0, 0, 0.6)' }} />
                    )
                  }
                </Rechart.XAxis>
                <Rechart.YAxis axisLine={false} tickLine={false} tickFormatter={tickFormatter} tickMargin={10} stroke="rgba(0, 0, 0, 0.4)">
                  {
                    yData.label && (
                      <Rechart.Label value={yData.label.value} offset={0} position="left" style={{ fill: 'rgba(0, 0, 0, 0.4)' }} />
                    )
                  }
                </Rechart.YAxis>
                <Rechart.Tooltip
                  isPercent={isPercent}
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
  title: [{}, null],
  data: [],
  xDataKey: 'name',
  yDataKey: ['value', []],
  theme: Themes.ThemeArrangePrimarySea,
  isPercent: false,
  margin: {
    top: 10, right: 5, bottom: 5, left: 5,
  },
  xData: {},
  yData: {},
}

LineChart.propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
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
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  xData: PropTypes.shape({
    label: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  }),
  yData: PropTypes.shape({
    label: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  }),
}

export default LineChart
