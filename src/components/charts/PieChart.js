import React from 'react'
import * as Rechart from 'recharts'

import _ from 'lodash'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Heading from '@Components/layout/Heading'
import * as font from '@src/assets/styles/font'
import TooltipBox from '@Components/tooltip/TooltipBox'
import * as cdmCommon from '@Components/common/cdmCommon'
import { getColorsByTheme, Themes } from '@Components/ChartColor'

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

const tooltipContent = ({
  active, payload, dataKey, nameKey,
  isPercent, textMap,
}) => {
  if (active) {
    const converted = _.map(payload, (e) => e.payload)
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

tooltipContent.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.shape({}),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
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
  textMap,
  legend: _legend,
}) => {
  // const colors = colorList || colorSet[theme] || colorSet.blue
  const colors = colorList || getColorsByTheme(theme, data.length)

  // console.log(data.length)
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
              textMap={textMap}
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
              let label = entry[legend.nameKey]
              if (textMap[label]) {
                label = textMap[label]
              }
              return (
                <li key={key}>
                  <Dot color={colors[index]} />
                  <p>{label}</p>
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
  theme: Themes.ThemeComparePrimarySea,
  isPercent: false,
  textMap: {},
  colorList: null,
  legend: {},
}

PieChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
  ]),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
  colorList: PropTypes.arrayOf(PropTypes.string),
  legend: PropTypes.shape({
    isPercent: PropTypes.bool,
    dataKey: PropTypes.string,
    nameKey: PropTypes.string,
  }),
}

export default PieChart
