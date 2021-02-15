import React from 'react'
import * as Rechart from 'recharts'

import _ from 'lodash'

import styled from 'styled-components'
import * as font from '@Styles/font'
import TooltipBox from '../tooltip/TooltipBox'
import * as commonTag from '../common/commonTag'
import { getColorsByTheme, Themes } from '../ChartColor'
import { color } from '@Styles/variables'
import ChartConfig from '../../helper/ChartConfig'

const Dot = styled(commonTag.Dot).attrs(() => ({}))`
  position: absolute;
  top: 5px;
  left: 0;
`

const size = {
  pie: {
    OffsetX: 18,
    outerRadius: 92,
  },
}

interface ILayout {
  layout: 'horizontal' | 'vertical';
}

const PieLegend = styled.div<ILayout>`
  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? 'margin-left: 56px;' : 'margin-top: 24px;')}
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
    margin-bottom: 16px;
  }
`

const Layout = styled.section<ILayout>`
  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? `
    display: flex;
  ` : '')}
  ${(props) => (props.layout === ChartConfig.Layout.VERTICAL ? `
    .recharts-responsive-container {
      margin: 0 auto;
    };
  ` : '')}
`

interface tooltipContentProps {
  active: boolean;
  payload: any;
  isPercent: boolean;
  textMap: any;
  dataKey: string;
  nameKey; string;
}

const tooltipContent = ({
  active, payload, dataKey, nameKey,
  isPercent, textMap,
}:tooltipContentProps) => {
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

interface PieChartProps extends ILayout {
  title?: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  theme: string;
  isPercent?: boolean;
  textMap?: any;
  legend?: {
    isPercent: boolean;
    datakey: string;
    nameKey: string;
    hide: boolean;
  };
}

const PieChart = ({
  title,
  data,
  dataKey,
  nameKey,
  layout,
  theme,
  isPercent,
  textMap,
  legend: _legend,
}:PieChartProps) => {
  // const colors = colorSet[theme] || colorSet.blue
  const colors = getColorsByTheme(theme, data.length)

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
      <commonTag.chartTitle>{title}</commonTag.chartTitle>
      <Layout layout={layout}>
        <Rechart.ResponsiveContainer
          width={size.pie.outerRadius * 2}
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
              innerRadius={48}
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
        <PieLegend layout={layout}>
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
                  <font.TextTag as="p" color={color.$grey09}>{label}</font.TextTag>
                  <font.TextTag bold>
                    {valueConvertText(entry[legend.dataKey])}
                  </font.TextTag>
                </li>
              )
            })}
          </ul>
        </PieLegend>
      </Layout>
    </div>
  )
}

PieChart.defaultProps = {
  title: null,
  data: [],
  dataKey: 'value',
  nameKey: 'name',
  layout: ChartConfig.Layout.HORIZONTAL,
  theme: Themes.ThemeComparePrimarySea,
  isPercent: false,
  textMap: {},
  legend: {
    hide: false,
  },
}

export default PieChart
