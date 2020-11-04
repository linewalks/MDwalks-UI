import React from 'react';
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import {
  getColorsByTheme,
  Themes,
  ColorSetMap,
} from '@Components/ChartColor'
import _ from 'lodash'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

const RadiusGauge = ({
  width,
  height,
  score,
  threshold,
  theme,
}) => {
  const cx = 150;
  const cy = 103;
  const radius = 103;
  const angleScale = d3.scaleLinear().domain([0, 1]).range([0, 180])
  const colors = getColorsByTheme(theme)
  const pinColor = ColorSetMap.sea300
  const inRange = (number) => number >= 0 && number <= 1

  if (inRange(score)) {
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
            strokeWidth="14"
          />
        </g>
        {
          _.isNumber(threshold)
          && inRange(threshold) && (
            <g transform={`translate(75, 150) rotate(${angleScale(threshold)}, 75, 3.1)`}>
              <path
                fill={color.$red01}
                fillRule="nonzero"
                d="M46.25-44.75v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2c0 .276.224.5.5.5s.5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5zm0 5v2h1v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5z"
                transform="translate(-1444 -882) translate(1281 684) translate(21 192) translate(122 9) rotate(-90 46.75 1)"
              />
            </g>
          )
        }
        <g transform={`translate(75, 150) rotate(${angleScale(score)}, 75, 3.1)`}>
          <path fill={pinColor} fillRule="evenodd" d="M.966 2.98L72.896.002c2.176-.09 4.012 1.627 4.1 3.834L77 4c0 2.21-1.765 4-3.943 4l-.16-.003L.967 5.02C.41 4.998-.023 4.522 0 3.958c.021-.531.441-.957.965-.979z" />
          <circle fill={pinColor} fillRule="evenodd" cx="73" cy="4" r="4" transform="rotate(-90 73 4)" />
        </g>
        <g
          transform="translate(0, 55)"
          className={fontStyle.fs13}
          style={{ textAnchor: 'middle', fill: color.$grey08 }}
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
          style={{ textAnchor: 'middle', fill: color.$grey10 }}
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
  threshold: undefined,
  theme: Themes.ThemeArrangeGradientPrimarySea,
}

RadiusGauge.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  score: PropTypes.number,
  threshold: PropTypes.number,
  theme: PropTypes.oneOf([
    Themes.ThemeArrangeGradientPrimarySea,
    Themes.ThemeArrangeGradientSecondaryTeal,
  ]),
}

export default RadiusGauge;
