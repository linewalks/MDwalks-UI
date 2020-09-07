import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { color, colorV1 } from '@src/assets/styles/variables'

import {
  getColorsByTheme,
  Themes,
} from '@Components/ChartColor'

const Container = styled.div`
  position: relative;
`

const FillContainer = styled.div`
  background: #f2f2f2;
  height: 12px;
  width: 100px;
  border-radius: 2px;
  overflow: hidden;
`

const fillLinear = keyframes`
  0% {
    width: 0;
  }
`

const Fill = styled.div`
  background-image: ${(props) => (props.theme ? `linear-gradient(to right, ${props.theme[0]}, ${props.theme[2]} 100px)` : 'auto')};
  height: 100%;
  width: ${(props) => (_.isNumber(props.score) ? `${props.score}%` : 'auto')};
  animation: ${fillLinear} 1.5;
`

const Threshold = styled.div`
  position: absolute;
  width: 3px;
  height: 16px;
  top: 0;
  left: ${(props) => (_.isNumber(props.threshold) && `${props.threshold}px`)};
  margin-top: -2px;
  margin-left: -1.5px;
  background-color: ${colorV1.$red01};
  border: 1px solid ${color.$primary_white};
  border-radius: 0.5px;
`

const BarGauge = ({ score, theme, threshold }) => {
  const colors = getColorsByTheme(theme)
  if (_.inRange(score, 0, 101)) {
    return (
      <Container>
        {threshold && _.inRange(threshold, 0, 101) && <Threshold threshold={threshold} />}
        <FillContainer>
          <Fill score={score} theme={colors} />
        </FillContainer>
      </Container>
    )
  }

  return (
    <div>Invalid Score</div>
  )
}

BarGauge.defaultProps = {
  theme: Themes.ThemeArrangeGradientPrimarySea,
  threshold: undefined,
}

BarGauge.propTypes = {
  score: PropTypes.number.isRequired,
  threshold: PropTypes.number,
  theme: PropTypes.oneOf([
    Themes.ThemeArrangeGradientPrimarySea,
    Themes.ThemeArrangeGradientSecondaryTeal,
  ]),
}

export default BarGauge
