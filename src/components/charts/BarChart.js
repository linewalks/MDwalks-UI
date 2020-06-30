/* eslint-disable max-len */
import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import PropTypes from 'prop-types'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import { colorV1 } from '@src/assets/styles/variables'
import TooltipBox from '@Components/tooltip/TooltipBox'
import TooltipCompareContent from '@Components/tooltip/TooltipCompareContent'
import * as commonTag from '@Components/common/commonTag'
import { getColorsByTheme, Themes, ColorSet } from '@Components/ChartColor'

import { getBarSize } from '@src/helper/chartUtility'
import ChartConfig from '@src/helper/ChartConfig'

import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'
import CartesianGrid from '@Components/charts/cartesian/CartesianGrid'

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
  textMap,
  margin,
  legend,
  xData,
  yData,
  scroll,
  width,
  chartHeight,
}) => {
  const newYDataKey = [].concat(yDataKey);

  let colors = ''
  let legendData

  if (!_.isUndefined(themes)) { // group
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

  const XAxisType = layout === ChartConfig.Layout.HORIZONTAL ? 'category' : 'number'
  const YAxisType = layout === ChartConfig.Layout.HORIZONTAL ? 'number' : 'category'

  const XAxisDataKey = layout === ChartConfig.Layout.HORIZONTAL ? xDataKey : undefined
  const YAxisDataKey = layout === ChartConfig.Layout.HORIZONTAL ? undefined : xDataKey

  const XAxisTicFormatter = layout === ChartConfig.Layout.HORIZONTAL ? undefined : tickFormatter
  const YAxisTicFormatter = layout === ChartConfig.Layout.HORIZONTAL ? tickFormatter : undefined

  const isScroll = !_.isUndefined(scroll.y)

  const scrollChartMargin = _.extend({}, BarChart.defaultProps.margin, margin)

  if (isScroll) {
    scrollChartMargin.bottom = 0
  }

  let barCount = _.size(newYDataKey)

  if (stackId) {
    barCount = 1
  }

  const barSize = getBarSize(barCount, layout)

  const barGap = 1

  const labelMarginBottom = 35

  let height
  if (layout === ChartConfig.Layout.HORIZONTAL) {
    height = chartHeight
  }

  if (layout === ChartConfig.Layout.VERTICAL) {
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

  XAxis.defaultProps.unit = xData.unit
  YAxis.defaultProps.unit = yData.unit

  Rechart.Bar.defaultProps.stackId = stackId
  Rechart.Bar.defaultProps.barSize = barSize

  return (
    <div>
      <commonTag.chartTitle>{title}</commonTag.chartTitle>
      <commonTag.LegendList data={legendData} textMap={textMap} hide={legend.hide} />
      {/* {`barCount: ${barCount} barCategory: ${_.size(data)} ${margin.top} ${margin.bottom}`} */}
      {
        isEmpty(data)
          ? <EmptyPlaceHolder height={height} />
          : (
            <div>
              <commonTag.WrapperScrollBars scroll={scroll}>
                <Rechart.ResponsiveContainer width={width} height={xData.label ? height + 28 : height}>
                  <Rechart.BarChart
                    width={width}
                    data={data}
                    height={height}
                    layout={layout}
                    margin={
                      xData.label ? { ...scrollChartMargin, left: 40, bottom: labelMarginBottom } : scrollChartMargin
                    }
                    barGap={barGap}
                  >
                    <CartesianGrid
                      vertical={layout !== ChartConfig.Layout.HORIZONTAL}
                      horizontal={layout === ChartConfig.Layout.HORIZONTAL}
                    />
                    <XAxis
                      hide={isScroll}
                      dataKey={XAxisDataKey}
                      tickFormatter={XAxisTicFormatter}
                      type={XAxisType}
                      height={20}
                      tickMargin={8}
                    >
                      {
                        xData.label && (
                          <Rechart.Label value={xData.label.value} offset={22} position="bottom" style={LabelStyle} />
                        )
                      }
                    </XAxis>
                    <YAxis
                      dataKey={YAxisDataKey}
                      tickFormatter={YAxisTicFormatter}
                      type={YAxisType}
                      tickMargin={16}
                    >
                      {
                        yData.label && (
                          <Rechart.Label value={yData.label.value} offset={24} position="left" style={LabelStyle} />
                        )
                      }
                    </YAxis>
                    {
                      !_.isUndefined(themes) && (
                        <Rechart.Tooltip
                          isPercent={isPercent}
                          textMap={textMap}
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
                          textMap={textMap}
                          content={TooltipBox}
                          cursor={{ fill: ColorSet['Chart-Hover']['grey-hover'] }}
                        />
                      )
                    }
                    {
                      _.isUndefined(themes) && (newYDataKey.map((entry, index) => (
                        <Rechart.Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} />
                      )))
                    }
                  </Rechart.BarChart>
                </Rechart.ResponsiveContainer>
              </commonTag.WrapperScrollBars>
              {
                isScroll && (
                  <Rechart.ResponsiveContainer width={width} height={xData.label ? (31 + labelMarginBottom) : (31 + margin.bottom)}>
                    <Rechart.BarChart
                      width={width}
                      data={data}
                      height={36}
                      layout={layout}
                      margin={_.extend({}, margin, { top: 5, bottom: xData.label ? labelMarginBottom : margin.bottom })}
                      barGap={barGap}
                    >
                      <XAxis
                        dataKey={XAxisDataKey}
                        tickFormatter={XAxisTicFormatter}
                        type={XAxisType}
                        tickMargin={8}
                      >
                        {
                          xData.label && (
                            <Rechart.Label value={xData.label.value} offset={22} position="bottom" style={LabelStyle} />
                          )
                        }
                      </XAxis>
                      <YAxis
                        dataKey={YAxisDataKey}
                        tickFormatter={YAxisTicFormatter}
                        type={YAxisType}
                        tickMargin={16}
                      />
                      {
                        newYDataKey.map((entry, index) => (<Rechart.Bar style={{ visibility: 'hidden' }} key={`bar${entry}`} dataKey={entry} fill={colors[index]} />))
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
  title: null,
  data: [],
  layout: ChartConfig.Layout.HORIZONTAL,
  stackId: undefined,
  xDataKey: 'name',
  yDataKey: ['value', []],
  theme: Themes.ThemeArrangePrimarySea,
  themes: undefined,
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
  scroll: {},
  width: Rechart.BarChart.defaultProps.width,
  chartHeight: 303,
}

BarChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  layout: ChartConfig.Layout.propTypes,
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
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
  width: PropTypes.number,
  chartHeight: PropTypes.number,
}

export default BarChart
