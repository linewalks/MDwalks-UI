import React from 'react'
import * as Rechart from 'recharts'
import { color } from '@src/assets/styles/variables'
import * as commonTag from '@Components/common/commonTag'
import {
  getColorsByTheme, Themes,
} from '@Components/ChartColor'
import TooltipBox from '@Components/tooltip/TooltipBox'

import _ from 'lodash'
import PropTypes from 'prop-types'

import PolarAngleAxis from '@Components/charts/cartesian/PolarAngleAxis'

const tooltipContent = ({
  active, payload, nameKey, textMap,
}) => {
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

tooltipContent.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  textMap: PropTypes.shape({}),
  nameKey: PropTypes.string,
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
}) => {
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
        <PolarAngleAxis dataKey={nameKey} />
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

RadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  nameKey: PropTypes.string,
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  theme: PropTypes.oneOf([
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
  ]),
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
  width: PropTypes.number,
  height: PropTypes.number,
  outerRadius: PropTypes.number,
}

export default RadarChart
