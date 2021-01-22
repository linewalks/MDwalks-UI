/* eslint-disable max-len */
import React from 'react'
import _ from 'lodash'
import * as Rechart from 'recharts'
import EmptyPlaceHolder from '../table/EmptyPlaceHolder'
import { color } from '../../assets/styles/variables'
import TooltipBox from '../tooltip/TooltipBox'
import TooltipCompareContent from '../tooltip/TooltipCompareContent'
import * as commonTag from '../common/commonTag'
import { getColorsByTheme, Themes, ColorSet } from '../ChartColor'

import { getBarSize } from '../../helper/chartUtility'
import ChartConfig from '../../helper/ChartConfig'

import XAxis from './cartesian/XAxis'
import YAxis from './cartesian/YAxis'
import CartesianGrid from './cartesian/CartesianGrid'

const LabelStyle = {
  fill: color.$grey08, fontWeight: 'bold', fontSize: '14px',
}

export const tickFormatterCustom = (value, isPercent) => {
  if (isPercent) {
    return `${(Number(value) * 100).toFixed(0)} %`
  }
  const newValue = Number(value).toLocaleString()
  return newValue
}

interface BarChartProps {
  title?: string;
  data: any;
  layout: 'horozontal' | 'vertical';
  stackId?: string | number;
  xDataKey: string;
  yDataKey: string | string[];
  themes: string[];
  theme: string;
  isPercent?:boolean;
  textMap?:any;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  legend?: {
    hide: boolean;
  };
  xData?: {
    label: {
      value: string;
    };
    unit: string;
  };
  yData?: {
    label: {
      value: string;
    };
    unit: string;
  };
  scroll?: {
    y: number;
  };
  width?: number;
  chartHeight?: number;
  barSize?: number;
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
  barSize,
}:BarChartProps) => {
  const newYDataKey = [].concat(yDataKey);

  let colors: string | string[] = ''
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
  Rechart.Bar.defaultProps.barSize = barSize || getBarSize(barCount, layout)

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
  barSize: null,
}

export default BarChart
