import React from 'react'
import * as Rechart from 'recharts'

import _ from 'lodash'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Heading from '@Components/layout/Heading'
import * as font from '@src/assets/styles/font'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as cdmCommon from '@Components/common/cdmCommon'

const Dot = styled(cdmCommon.Dot).attrs(() => ({}))`
  position: absolute;
  top: 5px;
  left: 0;
`

const size = {
  Legend: {
    marginLeft: 56,
  },
  pie: {
    OffsetX: 18,
    outerRadius: 88,
  },
}

const PieLegend = styled.div`
  margin-left: ${size.Legend.marginLeft}px;
  width: 100%;
  display: flex;
  align-items: center;

  ul {
    width: 100%;
  }

  li {
    padding-left: 16px;
    position: relative;
    display: flex;

    span:last-child {
      margin-left: auto;
      padding-left: 16px;
    }
  }

  li:not(:last-child) {
    margin-bottom: 8px;
  }
`

const colorSet = {
  blue: ['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'],
  green: ['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'],
  compare: ['#63a3f3', '#d686c8'],
}

const tooltipContent = ({
  active, payload, dataKey, nameKey, isPercent,
}) => {
  if (active) {
    const converted = _.map(payload, (e) => e.payload)
    return (
      <TooltipBox payload={converted} isPercent={isPercent} dataKey={dataKey} nameKey={nameKey} />
    )
  }
  return null
}

tooltipContent.defaultProps = {
  active: false,
  payload: {},
  isPercent: false,
  dataKey: 'value',
  nameKey: 'name',
}

tooltipContent.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.shape({}),
  isPercent: PropTypes.bool,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
}

const PieChart = ({
  title,
  data,
  dataKey,
  nameKey,
  theme,
  colorList,
  isPercent,
  legend: _legend,
}) => {
  const colors = colorList || colorSet[theme] || colorSet.blue

  const defaultLegend = _.extend({
    isPercent: null,
    dataKey: null,
    nameKey: null,
  }, _legend)

  const legend = {
    isPercent: _.isNull(defaultLegend.isPercent) ? isPercent : defaultLegend.isPercent,
    dataKey: defaultLegend.dataKey || dataKey,
    nameKey: defaultLegend.nameKey || nameKey,
  }

  const valueConvertText = (value) => {
    if (legend.isPercent) {
      return <span style={{ whiteSpace: 'nowrap' }}>{`${(Number(value) * 100).toFixed(2)} %`}</span>
    }
    return Number(value).toLocaleString()
  }

  return (
    <div>
      <Heading size="18" style={{ marginBottom: '30px' }}>{title}</Heading>
      <section style={{ display: 'flex' }}>
        <Rechart.ResponsiveContainer
          width={size.pie.outerRadius * 2 + size.pie.OffsetX}
          height={size.pie.outerRadius * 2}
        >
          <Rechart.PieChart margin={{
            top: 0, right: 0, bottom: 0, left: 0,
          }}
          >
            <Rechart.Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={44}
              outerRadius={size.pie.outerRadius}
              fill="#8884d8"
              isAnimationActive={false}
            >
              {data.map((entry, index) => {
                const key = `cell-${index}`
                return (
                  <Rechart.Cell key={key} fill={colors[index]} />
                )
              })}
            </Rechart.Pie>
            <Rechart.Tooltip
              content={
                (props) => tooltipContent(_.extend(props, { dataKey, nameKey, isPercent }))
              }
            />
          </Rechart.PieChart>
        </Rechart.ResponsiveContainer>
        <PieLegend>
          <ul>
            {data.map((entry, index) => {
              const key = `label-${index}`
              return (
                <li key={key}>
                  <Dot color={colors[index]} />
                  <p>{entry[legend.nameKey]}</p>
                  <font.TextTag bold>
                    {valueConvertText(entry[legend.dataKey])}
                  </font.TextTag>
                </li>
              )
            })}
          </ul>
        </PieLegend>
      </section>
    </div>
  )
}

PieChart.defaultProps = {
  title: null,
  data: [],
  dataKey: 'value',
  nameKey: 'name',
  theme: 'blue',
  isPercent: false,
  colorList: null,
  legend: {},
}

PieChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  theme: PropTypes.oneOf(['blue', 'green', 'compare']),
  isPercent: PropTypes.bool,
  colorList: PropTypes.arrayOf(PropTypes.string),
  legend: PropTypes.shape({
    isPercent: PropTypes.bool,
    dataKey: PropTypes.string,
    nameKey: PropTypes.string,
  }),
}

export default PieChart