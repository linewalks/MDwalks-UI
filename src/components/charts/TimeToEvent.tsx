import React from 'react'
import * as Rechart from 'recharts'
import { color } from '@Styles/variables'
import * as commonTag from '../common/commonTag'
import TooltipBox from '../tooltip/TooltipBox'
import {
  getColorsByTheme, Themes,
} from '../ChartColor'

import _ from 'lodash'

import XAxis from './cartesian/XAxis'
import YAxis from './cartesian/YAxis'
import CartesianGrid from './cartesian/CartesianGrid'
import fontStyle from '@Styles/font.module.sass'

export const dateFormat = (date) => (
  // new Date(date)
  // .toLocaleString('ko-KR', {
  //   year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
  // })
  // .replace(/(\d+)\.\s(\d+)\.\s(\d+)/, '$1-$2-$3')
  // .replace(/\.\s/, ' ')

  new Date(date)
    .toLocaleString('en-us', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') // for travis-ci
    .replace(/,\s/, ' ')
)

interface tooltipContentProps {
  active: boolean;
  payload: any;
  isPercent: boolean;
  textMap: any;
  dataKey: string;
  nameKey: string;
}

const tooltipContent = ({
  active, payload, dataKey, nameKey,
  isPercent, textMap,
}:tooltipContentProps) => {
  if (active) {
    const converted = _.map(payload, (e) => {
      const value = dateFormat(e.payload.value)
      return { ...e.payload, value, fill: e.fill }
    })

    return (
      <TooltipBox
        payload={converted}
        isPercent={isPercent}
        dataKey={dataKey}
        nameKey={nameKey}
        textMap={textMap}
      />
    )
  }
  return null
}

tooltipContent.defaultProps = {
  active: false,
  payload: {},
  isPercent: false,
  textMap: {},
  dataKey: 'value',
  nameKey: 'name',
}

export const yTickFormatterCustom = ({ order }, textMap = {}) => (
  textMap[`order${order}`] || ''
)

export const xTickFormatterCustom = (value, start = 0) => (
  new Date(value).getFullYear() - start
)

export const TYPE = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
}

export const convertData = (arr) => (
  _.chain(arr)
    .map(({
      start, end, name, order,
    }) => (
      [
        { value: start, name, [`order${order}`]: order },
        { value: end, name, [`order${order}`]: order },
      ]
    ))
    .flattenDeep()
    .value()
)

export const appendOrder = (arr) => (
  _.map(arr, (o, index:number) => ({ ...o, order: arr.length - index }))
)

interface IData {
  start: number;
  end: number;
  name: string;
}

interface TimeToEventProps {
  data: IData[];
  theme: string;
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
    unit: string;
  };
  showTooltip?: boolean;
}

const TimeToEvent = ({
  data, theme, margin, xData, legend, showTooltip,
}:TimeToEventProps) => {
  let startDate:Date = new Date(_.minBy(data, 'start').start)
  startDate.setDate(1)
  startDate.setMonth(0)
  let endDate:Date = new Date(_.maxBy(data, 'end').end)
  endDate.setDate(31)
  endDate.setMonth(11)

  const addOrderData = appendOrder(data)

  const newDataKey = _.map(addOrderData, ({ order }) => (`order${order}`))
  const yTicks = _.range(0, data.length + 2)
  const yDomain = [_.head(yTicks), _.last(yTicks)]

  const xDomain = [startDate.getTime(), endDate.getTime()]

  const rang = new Date(endDate).getFullYear() - new Date(startDate).getFullYear() + 2

  const xTicks = _.map(_.range(0, rang + 1), (num) => {
    const date = new Date(startDate)
    return date.setFullYear(date.getFullYear() + num)
  })

  const colors = getColorsByTheme(theme, newDataKey.length)

  const legendData = _.chain(newDataKey)
    .map((entry, index) => ({ color: colors[index], text: entry }))
    .value()

  const drawMargin = _.extend({}, TimeToEvent.defaultProps.margin, margin)
  const customData = _.map(convertData(addOrderData), (obj) => _.extend(obj, { z: 100 }))

  const textMap = _.chain(addOrderData)
    .reduce((sum, obj) => ({ ...sum, [`order${obj.order}`]: obj.name }), {})
    .value()

  const xTickFormatter = (value) => (xTickFormatterCustom(value, startDate.getFullYear()))
  const yTickFormatter = (value) => (yTickFormatterCustom({ order: value }, textMap))

  return (
    <div style={{ position: 'relative' }}>
      <commonTag.LegendList data={legendData} textMap={textMap} hide={legend.hide} />
      <Rechart.ResponsiveContainer height={263}>
        <Rechart.ComposedChart
          height={263}
          data={customData}
          margin={drawMargin}
        >
          <CartesianGrid strokeDasharray="2 2" horizontal={false} />
          {
            showTooltip && (
              <Rechart.Tooltip
                content={tooltipContent}
              />
            )
          }
          {
            _.map(yTicks, (tick) => (<Rechart.ReferenceLine key={`ReferenceLine${tick}`} y={tick} stroke={color.$grey04} />))
          }
          <Rechart.ReferenceLine y={_.last(yTicks)} stroke={color.$grey06} />
          <XAxis dataKey="value" type="number" tickFormatter={xTickFormatter} ticks={xTicks} domain={xDomain} />
          <YAxis type="number" tickFormatter={yTickFormatter} ticks={yTicks} domain={yDomain} />
          <Rechart.ZAxis dataKey="z" range={[0, 300]} />
          {
            newDataKey.map((entry, index) => (
              <Rechart.Scatter
                key={`scatter${entry}`}
                dataKey={entry}
                fill={colors[index]}
                line={{ strokeWidth: 3 }}
              />
            ))
          }
        </Rechart.ComposedChart>
      </Rechart.ResponsiveContainer>
      <span
        className={[fontStyle.fs14, fontStyle.bold].join(' ')}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 8,
          color: XAxis.defaultProps.stroke,
          lineHeight: 1,
        }}
      >
        {xData.unit}
      </span>
    </div>
  )
}

TimeToEvent.defaultProps = {
  data: [],
  theme: Themes.ThemeComparePrimarySea2,
  margin: {
    top: 10, right: 20, bottom: 5, left: 5,
  },
  legend: {
    hide: false,
  },
  xData: {},
  showTooltip: true,
}

export default TimeToEvent
