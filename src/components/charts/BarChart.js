import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'

import Heading from '@Components/layout/Heading'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { color } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import TooltipCompareContent from '@Components/tooltip/TooltipCompareContent'
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
  themes,
  isPercent,
  margin,
  xData,
  yData,
  scroll,
}) => {
  const newYDataKey = [].concat(yDataKey);

  let colors = ''
  let legendData

  if (!_.isUndefined(themes)) {
    colors = _.map(themes, (t) => (getColorsByTheme(t, newYDataKey.length)))
    legendData = _.chain(newYDataKey)
      .map((entry, index) => ({ color: _.map(colors, (c) => c[index]), text: entry }))
      .value()
  } else {
    colors = getColorsByTheme(theme, newYDataKey.length)
    legendData = _.chain(newYDataKey)
      .map((entry, index) => ({ color: colors[index], text: entry }))
      .value()
  }

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
              <commonTag.WrapperScrollBars scroll={scroll}>
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
                    {
                      !_.isUndefined(themes) && (
                        <Rechart.Tooltip
                          isPercent={isPercent}
                          content={TooltipCompareContent}
                          colorKeyMap={_.map(data, ({ [xDataKey]: name }) => (name))}
                          colorObject={colors}
                        />
                      )
                    }
                    {
                      !_.isUndefined(themes) && newYDataKey.map((entry, index) => (
                        <Rechart.Bar key={`bar${entry}`} dataKey={entry} stackId={stackId}>
                          {
                            data.map((entry1, index1) => {
                              const key = `${index}${index1}`
                              const fill = colors[index1][index]
                              return <Rechart.Cell key={key} fill={fill} />;
                            })
                          }
                        </Rechart.Bar>
                      ))
                    }
                    {
                      _.isUndefined(themes) && (
                        <Rechart.Tooltip
                          isPercent={isPercent}
                          content={TooltipBox}
                        />
                      )
                    }
                    {
                      _.isUndefined(themes) && (newYDataKey.map((entry, index) => (<Rechart.Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} stackId={stackId} />)))
                    }
                  </Rechart.BarChart>
                </Rechart.ResponsiveContainer>
              </commonTag.WrapperScrollBars>
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
  theme: 'theme-arrange-primary-sea',
  themes: undefined,
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
  themes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
  ]),
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    'theme-arrange-primary-sea', 'theme-arrange-secondary-teal', 'theme-arrange-tertiary-rose',
    'theme-arrange-quaternary-gold', 'theme-arrange-quinary-berry',
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
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
}

export default BarChart
