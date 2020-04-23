import React from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import _ from 'lodash'

import styled from 'styled-components'

import * as variables from '@src/assets/styles/variables'
import Heading from '@Components/layout/Heading'
import * as font from '@src/assets/styles/font'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as cdmCommon from '@Components/common/cdmCommon'
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'

import PropTypes from 'prop-types'
import { getColorsByTheme } from '@Components/ChartColor'

const Box = styled.article`
  &:not(:last-child) {
    border-right: 1px dashed rgba(0, 45, 79, 0.2)
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
                <ResponsiveContainer width="100%" height={415}>
                  <BarChart
                    data={value}
                    height={415}
                    margin={{
                      top: 0, right: 0, bottom: 0, left: (i === 0 ? 0 : YAxisWidth * -1),
                    }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke={variables.color.$line_graph_xy_grey}
                    />

                    <XAxis tickLine={false} tickMargin={10} dataKey={xDataKey} stroke="rgba(0, 0, 0, 0.6)" />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={tickFormatter} tickMargin={10} width={YAxisWidth} domain={domain} stroke="rgba(0, 0, 0, 0.4)" />
                    <Tooltip
                      isPercent={isPercent}
                      content={TooltipBox}
                    />
                    {
                      newYDataKey.map((entry, index) => <Bar key={`bar${entry}`} dataKey={entry} fill={colors[index]} />)
                    }
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', paddingLeft: i === 0 ? YAxisWidth : 0, paddingTop: '16px' }}>
                  <font.TextTag opacity="4">{key}</font.TextTag>
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
  theme: 'theme-arrange-primary-sea',
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
    'theme-arrange-primary-sea', 'theme-arrange-secondary-teal', 'theme-arrange-tertiary-rose',
    'theme-arrange-quaternary-gold', 'theme-arrange-quinary-berry',
  ]),
}

export default BarChartMulti
