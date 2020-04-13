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
import { getColorsByTheme } from '@Components/ChartColor'

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
  scroll,
}) => {
  const newYDataKey = [].concat(yDataKey)
  const colors = getColorsByTheme(theme, newYDataKey.length)
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
                    margin={{
                      top: 5, right: 5, bottom: (isScroll ? 0 : 5), left: 5,
                    }}
                  >
                    <Rechart.CartesianGrid vertical={false} stroke={color.$line_graph_xy_grey} />
                    <Rechart.XAxis hide={isScroll} tickLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.6)" dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType} />
                    <Rechart.YAxis axisLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.4)" tickLine={false} dataKey={YAxisDataKey} tickFormatter={YAxisTicFormatter} type={YAxisType} />
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
                  <Rechart.ResponsiveContainer height={36}>
                    <Rechart.BarChart data={data} height={36} layout={layout}>
                      <Rechart.XAxis tickLine={false} tickMargin={10} stroke="rgba(0, 0, 0, 0.6)" dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType} />
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
  scroll: {},
}

BarChart.propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  stackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    'theme-arrange-primary-sea', 'theme-arrange-secondary-teal', 'theme-arrange-tertiary-rose',
    'theme-arrange-quaternary-gold', 'theme-arrange-quinary-berry',
  ]),
  isPercent: PropTypes.bool,
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
}

export default BarChart
