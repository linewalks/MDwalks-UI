import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'
import { color } from '@src/assets/styles/variables'
import fontStyle from '@src/assets/styles/font.module.sass'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.2);

  background-color: ${color.$primary_white};
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
  className: [fontStyle.fs14, fontStyle.fc_grey08],
})`
  margin-bottom: 30px;
  > span:not(:last-child) {
    margin-right: 24px;
  }
`

export const LegendList = ({ data, textMap, hide }) => {
  if (hide) {
    return null
  }

  const legends = data && data.map(({ color: legendColor, text }, index) => {
    const lKey = `legend_${text}_${index}`

    let drawText = text

    if (textMap[drawText]) {
      drawText = textMap[drawText]
    }

    const drawLegendColor = _.concat([], legendColor)

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
}

LegendList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  textMap: PropTypes.shape({}),
  hide: PropTypes.bool,
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
