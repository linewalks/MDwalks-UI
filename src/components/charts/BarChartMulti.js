import React from 'react'
import * as Rechart from 'recharts'
import _ from 'lodash'

import styled from 'styled-components'

import { colorV1 } from '@src/assets/styles/variables'
// import * as variables from '@src/assets/styles/variables'
import fontStyle from '@src/assets/styles/font.module.sass'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as commonTag from '@Components/common/commonTag'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'

import PropTypes from 'prop-types'
// import { getColorsByTheme } from '@Components/ChartColor'
import { getColorsByTheme, Themes, ColorSet } from '@Components/ChartColor'

import { getBarSize } from '@src/helper/chartUtility'

import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'
import CartesianGrid from '@Components/charts/cartesian/CartesianGrid'

const Box = styled.article`
  &:not(:last-child) {
    border-right: 1px dashed ${colorV1.$grey05};
  }
`

const BarChartMulti = ({
  title,
  data,
  xDataKey,
  yDataKey,
  theme,
  isPercent,
  textMap,
  legend,
}) => {
  const newYDataKey = [].concat(yDataKey)
  const colors = getColorsByTheme(theme, newYDataKey.length)
  const legendData = _.chain(newYDataKey)
    .map((entry, index) => ({ color: colors[index], text: entry }))
    .value()

  const tickFormatter = (value) => `${(Number(value) * 100).toFixed(0)} %`

  const size = _.reduce(data, (sum, [, value]) => sum + value.length, 0)

  const maxValue = _.chain(data)
    .flatMapDeep()
    .filter((obj) => !_.isString(obj))
    .map((obj) => _.values(obj))
    .flatMapDeep()
    .map(Number)
    .filter((num) => !_.isNaN(num))
    .max()
    .value()

  const YAxisWidth = 60
  const domain = [0, (Math.ceil((maxValue * 100) / 10) * 10) / 100]

  const isEmpty = (items) => _.isEmpty(items)

  const barSize = getBarSize(_.size(newYDataKey), 'horizontal')

  return (
    <div>
      <commonTag.chartTitle>{title}</commonTag.chartTitle>

      <commonTag.LegendList data={legendData} textMap={textMap} hide={legend.hide} />
      {
        isEmpty(data)
          ? (
            <EmptyPlaceHolder />
          )
          : (
            <section style={{ display: 'flex' }}>
              {
          data.map(([key, value], i) => {
            const totalWidth = 1130 - YAxisWidth
            const width = totalWidth * (value.length / size) + (i === 0 ? YAxisWidth : 0)
            return (
              <Box style={{ width: `${width}px` }} key={`${key}`}>
                <Rechart.ResponsiveContainer width="100%" height={263}>
                  <Rechart.BarChart
                    data={value}
                    height={263}
                    margin={{
                      top: 0, right: 0, bottom: 0, left: (i === 0 ? 0 : YAxisWidth * -1),
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey={xDataKey} />
                    <YAxis tickFormatter={tickFormatter} width={YAxisWidth} domain={domain} />
                    <Rechart.Tooltip
                      isPercent={isPercent}
                      textMap={textMap}
                      content={TooltipBox}
                      cursor={{ fill: ColorSet['Chart-Hover']['grey-hover'] }}
                    />
                    {
                      newYDataKey.map((entry, index) => <Rechart.Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} barSize={barSize} />)
                    }
                  </Rechart.BarChart>
                </Rechart.ResponsiveContainer>
                <div style={{ textAlign: 'center', paddingLeft: i === 0 ? YAxisWidth : 0, paddingTop: '16px' }}>
                  <span
                    className={[fontStyle.fs14, fontStyle.fc_grey08].join(' ')}
                  >
                    {key}
                  </span>
                </div>
              </Box>
            )
          })
        }
            </section>
          )
      }
    </div>
  )
}

BarChartMulti.defaultProps = {
  title: null,
  data: [],
  xDataKey: 'name',
  yDataKey: [],
  theme: Themes.ThemeArrangePrimarySea,
  isPercent: false,
  textMap: {},
  legend: {
    hide: false,
  },
}

BarChartMulti.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
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
  legend: PropTypes.shape({
    hide: PropTypes.bool,
  }),
}

export default BarChartMulti
