import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import Heading from '@Components/layout/Heading'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/cdmCommon'

const colorSet = {
  blue: ['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'],
  green: ['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'],
}

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
  const colors = colorSet[theme] || colorSet.blue
  const newYDataKey = [].concat(yDataKey)
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
  theme: 'blue',
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
  theme: PropTypes.string,
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
