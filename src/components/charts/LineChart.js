import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import Heading from '@Components/layout/Heading'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/cdmCommon'
import { getColorsByTheme } from '@Components/ChartColor'

const LineChart = ({
  title,
  data,
  xDataKey,
  yDataKey,
  theme,
  isPercent,
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

  const isEmpty = (items) => _.isEmpty(items)

  return (
    <div>
      <Heading size="18" style={{ marginBottom: '30px' }}>{title}</Heading>

      <commonTag.LegendList data={legendData} />

      {
        isEmpty(data)
          ? <EmptyPlaceHolder />
          : (
            <Rechart.ResponsiveContainer height={415}>
              <Rechart.LineChart data={data} height={415}>
                <Rechart.CartesianGrid vertical={false} stroke={color.$line_graph_xy_grey} />
                <Rechart.XAxis tickLine={false} tickMargin={10} dataKey={xDataKey} stroke="rgba(0, 0, 0, 0.6)" />
                <Rechart.YAxis axisLine={false} tickLine={false} tickFormatter={tickFormatter} tickMargin={10} stroke="rgba(0, 0, 0, 0.4)" />
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
  theme: 'blue',
  isPercent: false,
}

LineChart.propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    'theme-arrange-primary-sea', 'theme-arrange-secondary-teal', 'theme-arrange-tertiary-rose',
    'theme-arrange-quaternary-gold', 'theme-arrange-quinary-berry',
  ]),
  isPercent: PropTypes.bool,
}

export default LineChart
