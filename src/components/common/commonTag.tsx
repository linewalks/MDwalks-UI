import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'
import { color } from '@Styles/variables'
import fontStyle from '@Styles/font.module.sass'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { getColorsByTheme, Themes } from '@Components/ChartColor'

const LegendWrap = styled.section`
  display: flex;
  > article:not(:last-child) {
    margin-right: 24px;
  }
`

export const BoxShadow = styled.article`
  display: block;
  padding: 0 0px 10px;

  &:first-child:not(:only-child) {
    padding-right: 20px;
  }

  &:last-child:not(:only-child) {
    padding-left: 20px;
  }
`

export const BoxShadowInner = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 8px 0 rgba(109, 120, 132, 0.36);

  background-color: ${color.$white};
  padding: 30px;
`

export const Dot = styled.span`
  background-color: ${(props) => props.color};
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
`

export const Legend = styled.article.attrs({
  className: [fontStyle.fs14, fontStyle.fc_grey08].join(' '),
})`
  margin-bottom: 30px;
  > span:not(:last-child) {
    margin-right: 24px;
  }
`

interface ILegendListData {
  text: string;
  color?: string[] | string[][];
}

interface LegendListProps {
  data: ILegendListData[];
  textMap: any;
  hide: boolean;
  theme: any;
  themes: string[];
}

export const LegendList = ({
  data, textMap, hide, theme, themes,
}:LegendListProps) => {
  if (hide) {
    return null
  }

  let colors: string | string[] = ''
  let newLegendData

  if (!_.isUndefined(themes)) {
    colors = _.map(themes, (t) => (getColorsByTheme(t, data.length)))
    newLegendData = _.chain(data)
      .map(
        ({ text, color: innerColor }, index) => (
          { color: innerColor || _.map(colors, (c) => c[index]), text }
        ),
      )
      .value()
  } else {
    colors = getColorsByTheme(theme, data.length)
    newLegendData = _.chain(data)
      .map(({ text, color: innerColor }, index) => ({ color: innerColor || colors[index], text }))
      .value()
  }

  const legends = newLegendData && newLegendData.map(({ color: innerColor, text }, index) => {
    const lKey = `legend_${text}_${index}`

    let drawText = text

    if (textMap[drawText]) {
      drawText = textMap[drawText]
    }

    const drawLegendColor = _.concat([], innerColor)

    return (
      <Legend key={lKey}>
        <div>
          {
            _.map(drawLegendColor, (c, i) => {
              const key = `${index}${c}${i}`
              const isLast = drawLegendColor.length === i + 1
              const marginRight = isLast ? '8px' : '4px'
              return (<Dot key={key} color={c} style={{ marginRight }} />)
            })
          }
          <span>{drawText}</span>
        </div>
      </Legend>
    )
  })

  return (
    <LegendWrap>
      {legends}
    </LegendWrap>
  )
}

LegendList.defaultProps = {
  data: [],
  textMap: {},
  hide: false,
  theme: Themes.ThemeArrangePrimarySea,
  themes: undefined,
}

LegendList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  })),
  textMap: PropTypes.shape({}),
  hide: PropTypes.bool,
  themes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
  ]),
  theme: PropTypes.oneOf([
    'blue', 'green', 'compare',
    Themes.ThemeArrangePrimarySea, Themes.ThemeArrangeSecondaryTeal,
    Themes.ThemeArrangeTertiaryRose, Themes.ThemeArrangeQuaternaryGold,
    Themes.ThemeArrangeQuinaryBerry,
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTeal3,
  ]),
}

export const WrapperScrollBars = ({ scroll, children }) => (
  !_.isUndefined(scroll.y)
    ? <Scrollbars style={{ height: scroll.y }}>{children}</Scrollbars>
    : children
)

WrapperScrollBars.defaultProps = {
  scroll: {},
}

WrapperScrollBars.propTypes = {
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
}

const ChartTitleTag = styled.header.attrs(() => ({
  className: [fontStyle.fs18, fontStyle.fc_grey09, fontStyle.bold].join(' '),
}))`
  margin-bottom: 30px;
`

export const chartTitle = ({ children }) => {
  if (!children) {
    return null
  }
  return <ChartTitleTag>{children}</ChartTitleTag>
}
