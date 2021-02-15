import React from 'react'
import * as Rechart from 'recharts'
import { color } from '@Styles/variables'
import * as commonTag from '../common/commonTag'
import {
  getColorsByTheme, Themes,
} from '../ChartColor'
import TooltipBox from '../tooltip/TooltipBox'

import _ from 'lodash'

interface tooltipContentProps {
  active: boolean;
  payload: any;
  nameKey: string;
  textMap: any;
}

const tooltipContent = ({
  active, payload, nameKey, textMap,
}:tooltipContentProps) => {
  if (active) {
    return (
      <TooltipBox
        payload={payload.reverse()}
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
  textMap: {},
  nameKey: 'name',
}

interface RadarChartProps {
  data: any[];
  nameKey: string;
  dataKey: string | string[];
  theme: string;
  textMap?: any;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  legend?: {
    hide: boolean;
  };
  width?:number;
  height?:number;
  outerRadius?:number;
}

// Legend 클릭 시 Radar 를 toggle 하려면 Radar의 props 인 hide 을 사용하세요
const RadarChart = ({
  data,
  nameKey,
  dataKey,
  theme,
  textMap,
  legend,
  width,
  height,
  outerRadius,
  margin,
}:RadarChartProps) => {
  const newDataKey = [].concat(dataKey).reverse()
  const colors = getColorsByTheme(theme, newDataKey.length).reverse()
  const legendData = _.chain(newDataKey)
    .map((entry, index) => ({ color: colors[index], text: entry }))
    .value().reverse()
  return (
    <div>
      <commonTag.LegendList data={legendData} textMap={textMap} hide={legend.hide} />
      <Rechart.RadarChart
        data={data}
        width={width}
        height={height}
        margin={margin}
        cx={_.divide(width, 2)}
        cy={_.divide(height, 2)}
        outerRadius={outerRadius}
        style={{
          margin: '0 auto',
        }}
      >
        <Rechart.Tooltip
          content={tooltipContent}
        />
        <Rechart.PolarGrid stroke={color.$grey04} />
        <Rechart.PolarAngleAxis
          axisLine={{ stroke: color.$grey06 }}
          tickLine={false}
          stroke={color.$grey08}
          fontSize={14}
          custom={true}
          dataKey={nameKey}
        />
        {
          newDataKey.map((entry, index) => (
            <Rechart.Radar
              key={`radar${entry}`}
              dataKey={entry}
              stroke={colors[index]}
              fill={colors[index]}
              strokeWidth={3}
              fillOpacity={0.3}
              dot
            />
          ))
        }
      </Rechart.RadarChart>
    </div>
  )
}

RadarChart.defaultProps = {
  data: [],
  nameKey: 'name',
  dataKey: ['value', []],
  theme: Themes.ThemeComparePrimarySea2,
  textMap: {},
  legend: {
    hide: false,
  },
  width: 700,
  height: 456,
  outerRadius: 200,
  margin: {
    top: 5,
    right: 5,
    bottom: 20,
    left: 5,
  },
}

export default RadarChart
