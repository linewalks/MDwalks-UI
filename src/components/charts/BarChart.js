import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars';

import Heading from '@Components/layout/Heading'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/cdmCommon'

const colorSet = {
  blue: ['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'],
  green: ['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'],
  compare: ['#63a3f3', '#d686c8'],
}

export const tickFormatterCustom = (value, isPercent) => {
  if (isPercent) {
    return `${(Number(value) * 100).toFixed(0)} %`
  }
  const newValue = Number(value).toLocaleString()
  return newValue
}

const BarChart = ({
  title,
  data,
  layout,
  stackId,
  xDataKey,
  yDataKey,
  theme,
  isPercent,
  margin,
  xData,
  yData,
  scroll,
}) => {
  const colors = colorSet[theme] || colorSet.blue
  const newYDataKey = [].concat(yDataKey)
  const legendData = _.chain(newYDataKey)
    .map((entry, index) => ({ color: colors[index], text: entry }))
    .value()

  const tickFormatter = (value) => tickFormatterCustom(value, isPercent)

  const isEmpty = (items) => _.isEmpty(items)

  const XAxisType = layout === 'horizontal' ? 'category' : 'number'
  const YAxisType = layout === 'horizontal' ? 'number' : 'category'

  const XAxisDataKey = layout === 'horizontal' ? xDataKey : undefined
  const YAxisDataKey = layout === 'horizontal' ? undefined : xDataKey

  const XAxisTicFormatter = layout === 'horizontal' ? undefined : tickFormatter
  const YAxisTicFormatter = layout === 'horizontal' ? tickFormatter : undefined

  const isScroll = !_.isUndefined(scroll.y)

  const scrollChartMargin = _.extend({}, margin)

  if (isScroll) {
    scrollChartMargin.bottom = 0
  }

  return (
    <div>
      <Heading size="18" style={{ marginBottom: '30px' }}>{title}</Heading>

      <commonTag.LegendList data={legendData} />
      {
        isEmpty(data)
          ? <EmptyPlaceHolder />
          : (
            <div>
              <Scrollbars style={{ height: isScroll ? scroll.y : 415 }}>
                <Rechart.ResponsiveContainer height={415}>
                  <Rechart.BarChart
                    data={data}
                    height={415}
                    layout={layout}
                    margin={scrollChartMargin}
                  >
                    <Rechart.CartesianGrid vertical={false} stroke={color.$line_graph_xy_grey} />
                    <Rechart.XAxis hide={isScroll} tickLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.6)" dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType}>
                      {
                        xData.label && (
                          <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={{ fill: 'rgba(0, 0, 0, 0.6)' }} />
                        )
                      }
                    </Rechart.XAxis>
                    <Rechart.YAxis axisLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.4)" tickLine={false} dataKey={YAxisDataKey} tickFormatter={YAxisTicFormatter} type={YAxisType}>
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
                      newYDataKey.map((entry, index) => (<Rechart.Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} stackId={stackId} />))
                    }
                  </Rechart.BarChart>
                </Rechart.ResponsiveContainer>
              </Scrollbars>
              {
                isScroll && (
                  <Rechart.ResponsiveContainer height={(31 + margin.bottom)}>
                    <Rechart.BarChart
                      data={data}
                      height={36}
                      layout={layout}
                      margin={_.extend({}, margin, { top: 5 })}
                    >
                      <Rechart.XAxis tickLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.6)" dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType}>
                        {
                          xData.label && (
                            <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={{ fill: 'rgba(0, 0, 0, 0.6)' }} />
                          )
                        }
                      </Rechart.XAxis>
                      <Rechart.YAxis axisLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.4)" tickLine={false} dataKey={YAxisDataKey} tickFormatter={YAxisTicFormatter} type={YAxisType} />
                      {
                        newYDataKey.map((entry, index) => (<Rechart.Bar style={{ visibility: 'hidden' }} key={`bar${entry}`} dataKey={entry} fill={colors[index]} stackId={stackId} />))
                      }
                    </Rechart.BarChart>
                  </Rechart.ResponsiveContainer>
                )
              }
            </div>
          )
      }
    </div>
  )
}

BarChart.defaultProps = {
  title: [{}, null],
  data: [],
  layout: 'horizontal',
  stackId: undefined,
  xDataKey: 'name',
  yDataKey: ['value', []],
  theme: 'blue',
  isPercent: false,
  margin: {
    top: 5, right: 5, bottom: 5, left: 5,
  },
  xData: {},
  yData: {},
  scroll: {},
}

BarChart.propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  stackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  theme: PropTypes.oneOf(['blue', 'green', 'compare']),
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
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
}

export default BarChart
