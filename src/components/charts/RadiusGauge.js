import React from 'react';
import * as d3 from 'd3'
import PropTypes from 'prop-types'

import {
  getColorsByTheme,
  Themes,
  ColorSetMap,
} from '@Components/ChartColor'
import fontStyle from '@src/assets/styles/font.module.sass'
import { colorV1 } from '@src/assets/styles/variables'

const RadiusGauge = ({
  width, height, score, theme,
}) => {
  const cx = 150;
  const cy = 103;
  const radius = 103;
  const angleScale = d3.scaleLinear().domain([0, 1]).range([0, 180])

  const colors = getColorsByTheme(theme)
  const pinColor = ColorSetMap.sea200

  if (score >= 0 && score <= 1) {
    return (
      <svg width={width} height={height} transform="translate(-26, 20)">
        <defs>
          <linearGradient
            id="gaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            spreadMethod="pad"
          >
            <stop
              offset="0%"
              stopColor={colors[0]}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={colors[2]}
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        <g transform="translate(0, 20)">
          <path
            d={`M 50,160 A ${radius} ${radius} 0 1 1 250 160`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
          />
        </g>
        <path transform={`translate(75, 150) rotate(${angleScale(score)}, 75, 3.1)`} fill={pinColor} fillRule="evenodd" d="M1.605 4.5l64.83 2.434A3.437 3.437 0 0 0 70 3.5 3.437 3.437 0 0 0 66.434.066L1.605 2.5a1 1 0 0 0 0 1.998z" />
        <g
          transform="translate(0, 55)"
          className={fontStyle.fs13}
          style={{ textAnchor: 'middle', fill: colorV1.$grey08 }}
        >
          <text
            x={cx - Math.round(120 * Math.cos(0))}
            y={cy - Math.round(120 * Math.sin(0))}
            dx={0}
          >
            0
          </text>
          <text
            x={cx - Math.round(120 * Math.cos(Math.PI / 4))}
            y={cy - Math.round(120 * Math.sin(Math.PI / 4))}
            dx={-6}
          >
            0.25
          </text>
          <text
            x={cx + Math.round(120 * Math.cos(Math.PI / 2))}
            y={cy - Math.round(120 * Math.sin(Math.PI / 2))}
          >
            0.5
          </text>
          <text
            x={cx + Math.round(120 * Math.cos(Math.PI / 4))}
            y={cy - Math.round(120 * Math.sin(Math.PI / 4))}
            dx={6}
          >
            0.75
          </text>
          <text
            x={cx + Math.round(120 * Math.cos(0))}
            y={cy - Math.round(120 * Math.sin(0))}
            dx={6}
          >
            1.0
          </text>
        </g>
        <g
          transform="translate(150, 200)"
          className={`${fontStyle.fs32} ${fontStyle.bold}`}
          style={{ textAnchor: 'middle', fill: colorV1.$grey10 }}
        >
          <text>{`${score}`.slice(0, 4)}</text>
        </g>
      </svg>
    )
  }
  return (
    <div>Invalid Score</div>
  )
}

RadiusGauge.defaultProps = {
  width: undefined,
  height: undefined,
  score: undefined,
  theme: Themes.ThemeArrangeGradientPrimarySea,
}

RadiusGauge.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  score: PropTypes.number,
  theme: PropTypes.oneOf([
    Themes.ThemeArrangeGradientPrimarySea,
    Themes.ThemeArrangeGradientSecondaryTeal,
  ]),
}

export default RadiusGauge;
