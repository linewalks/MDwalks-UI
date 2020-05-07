import React from 'react'
import * as Rechart from 'recharts'
import _ from 'lodash'

import styled from 'styled-components'

import { colorV1 } from '@src/assets/styles/variables'
// import * as variables from '@src/assets/styles/variables'
import Heading from '@Components/layout/Heading'
import fontStyle from '@src/assets/styles/font.module.sass'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as cdmCommon from '@Components/common/cdmCommon'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'

import PropTypes from 'prop-types'
// import { getColorsByTheme } from '@Components/ChartColor'
import { getColorsByTheme, Themes, ColorSet } from '@Components/ChartColor'

import { getBarSize } from '@src/helper/chartUtility'

import XAxis from '@Components/charts/cartesian/XAxis'
import YAxis from '@Components/charts/cartesian/YAxis'

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
      <Heading size="18" style={{ marginBottom: '30px' }}>{title}</Heading>

      <cdmCommon.LegendList data={legendData} />
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
                <Rechart.ResponsiveContainer width="100%" height={415}>
                  <Rechart.BarChart
                    data={value}
                    height={415}
                    margin={{
                      top: 0, right: 0, bottom: 0, left: (i === 0 ? 0 : YAxisWidth * -1),
                    }}
                  >
                    <Rechart.CartesianGrid
                      vertical={false}
                      stroke={colorV1.$grey04}
                    />
                    <XAxis dataKey={xDataKey} />
                    <YAxis tickFormatter={tickFormatter} width={YAxisWidth} domain={domain} />
                    <Rechart.Tooltip
                      isPercent={isPercent}
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
  title: [{}, null],
  data: [],
  xDataKey: 'name',
  yDataKey: [],
  theme: Themes.ThemeArrangePrimarySea,
  isPercent: false,
}

BarChartMulti.propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  data: PropTypes.arrayOf(PropTypes.any),
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isPercent: PropTypes.bool,
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
}

export default BarChartMulti
