import React from 'react';
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styles from '@Charts/RadiusGauge.module.css'

const RadiusGauge = ({ width, height, score }) => {
  const cx = 150;
  const cy = 103;
  const radius = 103;
  const angleScale = d3.scaleLinear().domain([0, 1]).range([0, 180])

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
              stopColor="#189bff"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="#002d4f"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        <g transform="translate(0, 20)">
          <path
            d={`M 50,160 A ${radius} ${radius} 0 1 1 250 160`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
          />
        </g>
        <path transform={`translate(75, 150) rotate(${angleScale(score)}, 75, 3.1)`} fill="#189BFF" fillRule="evenodd" d="M1.605 4.5l64.83 2.434A3.437 3.437 0 0 0 70 3.5 3.437 3.437 0 0 0 66.434.066L1.605 2.5a1 1 0 0 0 0 1.998z" />
        <g transform="translate(0, 55)" className={styles.gauge_point}>
          <text
            x={cx - Math.round(120 * Math.cos(0))}
            y={cy - Math.round(120 * Math.sin(0))}
          >
            0
          </text>
          <text
            x={cx - Math.round(120 * Math.cos(Math.PI / 4))}
            y={cy - Math.round(120 * Math.sin(Math.PI / 4))}
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
          >
            0.75
          </text>
          <text
            x={cx + Math.round(120 * Math.cos(0))}
            y={cy - Math.round(120 * Math.sin(0))}
          >
            1.0
          </text>
        </g>
        <g transform="translate(150, 200)" className={styles.gauge_score}>
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
}

RadiusGauge.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  score: PropTypes.number,
}

export default RadiusGauge;
