/* eslint-disable max-len */
import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { colorV1 } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import TooltipCompareContent from '@Components/tooltip/TooltipCompareContent'
import * as commonTag from '@Components/common/cdmCommon'
import { getColorsByTheme, Themes, ColorSet } from '@Components/ChartColor'

const LabelStyle = {
  fill: colorV1.$grey08, fontWeight: 'bold', fontSize: '14px',
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

  let barCount = _.size(newYDataKey)
  let barSize

  if (stackId) {
    barCount = 1
  }

  if (layout === 'horizontal') {
    barSize = ({
      1: 48,
      2: 40,
      3: 40,
      4: 40,
    })[barCount] || 32
  }

  if (layout === 'vertical') {
    barSize = (
      {
        1: 34,
      }
    )[barCount] || 16
  }

  const barGap = 1

  let height
  if (layout === 'horizontal') {
    height = 263
  }

  if (layout === 'vertical') {
    const space = 35 // 35 를 세부적으로 계산해야 하겠다 // margin.top + margin.bottom

    const barCagetoryGap = 34

    height = (barCount * barSize) * _.size(data)
            + (_.size(data) - 1) * barCagetoryGap

    if (barCount > 1) {
      height += ((barCount - 1) * barGap) * _.size(data)
    }

    height = Math.max(298, height)

    height += space
  }

  return (
    <div>
      <commonTag.chartTitle>{title}</commonTag.chartTitle>
      <commonTag.LegendList data={legendData} />
      {/* {`barCount: ${barCount} barCategory: ${_.size(data)} ${margin.top} ${margin.bottom}`} */}
      {
        isEmpty(data)
          ? <EmptyPlaceHolder height={height} />
          : (
            <div>
              <commonTag.WrapperScrollBars scroll={scroll}>
                <Rechart.ResponsiveContainer height={height}>
                  <Rechart.BarChart
                    data={data}
                    height={height}
                    layout={layout}
                    margin={scrollChartMargin}
                    barGap={barGap}
                  >
                    <Rechart.CartesianGrid vertical={layout !== 'horizontal'} horizontal={layout === 'horizontal'} stroke={colorV1.$grey04} />
                    <Rechart.XAxis hide={isScroll} axisLine={{ stroke: colorV1.$grey06 }} tickLine={false} tickMargin={10} stroke={colorV1.$grey08} dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType} height={20} dy={-10 + 8}>
                      {
                        xData.label && (
                          <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={LabelStyle.style} />
                        )
                      }
                    </Rechart.XAxis>
                    <Rechart.YAxis axisLine={false} tickMargin={10} stroke={colorV1.$grey08} tickLine={false} dataKey={YAxisDataKey} tickFormatter={YAxisTicFormatter} type={YAxisType} dx={15 - 16}>
                      {
                        yData.label && (
                          <Rechart.Label value={yData.label.value} offset={0} position="left" style={LabelStyle.style} />
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
                          cursor={{ fill: ColorSet['Chart-Hover']['grey-hover'] }}
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
                          cursor={{ fill: ColorSet['Chart-Hover']['grey-hover'] }}
                        />
                      )
                    }
                    {
                      _.isUndefined(themes) && (newYDataKey.map((entry, index) => (<Rechart.Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} stackId={stackId} barSize={barSize} />)))
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
                      barGap={barGap}
                    >
                      <Rechart.XAxis axisLine={{ stroke: colorV1.$grey06 }} tickLine={false} tickMargin={10} stroke={colorV1.$grey08} dataKey={XAxisDataKey} tickFormatter={XAxisTicFormatter} type={XAxisType}>
                        {
                          xData.label && (
                            <Rechart.Label value={xData.label.value} offset={10} position="bottom" style={LabelStyle.style} />
                          )
                        }
                      </Rechart.XAxis>
                      <Rechart.YAxis axisLine={false} tickMargin={10} stroke={colorV1.$grey08} tickLine={false} dataKey={YAxisDataKey} tickFormatter={YAxisTicFormatter} type={YAxisType} />
                      {
                        newYDataKey.map((entry, index) => (<Rechart.Bar style={{ visibility: 'hidden' }} key={`bar${entry}`} dataKey={entry} fill={colors[index]} stackId={stackId} barSize={barSize} />))
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
  theme: Themes.ThemeArrangePrimarySea,
  themes: undefined,
  isPercent: false,
  margin: {
    top: 10, right: 5, bottom: 5, left: 5,
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
    Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeSecondaryTeal,
    Themes.ThemeArrangeTertiaryRose, Themes.ThemeArrangeQuaternaryGold,
    Themes.ThemeArrangeQuinaryBerry,
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
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
