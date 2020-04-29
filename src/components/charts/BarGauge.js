import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  getColorsByTheme,
  Themes,
} from '@Components/ChartColor'

const Container = styled.div`
  background: #f2f2f2;
  position: relative;
  height: 6px;
  width: 100px;
  border-radius: 2px;
  overflow: hidden;
`

const Fill = styled.div`
  background-image: ${(props) => (props.theme ? `linear-gradient(to right, ${props.theme[0]}, ${props.theme[2]} 100px)` : 'auto')};
  height: 100%;
  width: ${(props) => (_.isNumber(props.score) ? `${props.score}%` : 'auto')};
`

const BarGauge = ({ score, theme }) => {
  const colors = getColorsByTheme(theme)
  if (_.inRange(score, 0, 101)) {
    return (
      <Container>
        <Fill score={score} theme={colors} />
      </Container>
    )
  }

  return (
    <div>Invalid Score</div>
  )
}

BarGauge.defaultProps = {
  theme: Themes.ThemeArrangeGradientPrimarySea,
}

BarGauge.propTypes = {
  score: PropTypes.number.isRequired,
  theme: PropTypes.oneOf([
    Themes.ThemeArrangeGradientPrimarySea,
    Themes.ThemeArrangeGradientSecondaryTeal,
  ]),
}

export default BarGauge
