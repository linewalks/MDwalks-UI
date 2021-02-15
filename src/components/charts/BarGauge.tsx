import React from 'react'
import _ from 'lodash'
import styled, { keyframes } from 'styled-components'
import { color } from '@Styles/variables'

import {
  getColorsByTheme,
  Themes,
} from '../ChartColor'

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

interface IFill {
  score: number;
  theme: string;
}

const Fill = styled.div<IFill>`
  background-image: ${(props) => (props.theme ? `linear-gradient(to right, ${props.theme[0]}, ${props.theme[2]} 100px)` : 'auto')};
  height: 100%;
  width: ${(props) => (_.isNumber(props.score) ? `${props.score}%` : 'auto')};
  animation: ${fillLinear} 1.5;
`

interface IThreshold {
  threshold: number;
}

const Threshold = styled.div<IThreshold>`
  position: absolute;
  width: 3px;
  height: 16px;
  top: 0;
  left: ${(props) => `${props.threshold}px`};
  margin-top: -2px;
  margin-left: -1.5px;
  background-color: ${color.$red01};
  border: 1px solid ${color.$white};
  border-radius: 0.5px;
`

interface BarGaugeProps {
  score: number;
  threshold?: number;
  theme: 'theme-arrange-gradient-primary-sea' | 'theme-arrange-gradient-secondary-teal';
}

const BarGauge = ({ score, theme, threshold }:BarGaugeProps) => {
  const colors = getColorsByTheme(theme)
  if (_.inRange(score, 0, 101)) {
    return (
      <Container>
        {_.isNumber(threshold)
          && _.inRange(threshold, 0, 101)
          && <Threshold threshold={threshold} />}
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

export default BarGauge
