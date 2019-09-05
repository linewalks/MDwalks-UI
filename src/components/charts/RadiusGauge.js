import React from 'react';
import * as d3 from 'd3'

const styles = {
  gauge_point: {
    "textAnchor":"middle", // like text-align but not support tag g 
    "opacity":"0.4",
    "fontFamily":"'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'",
    "fontSize":"11px",
    "fontWeight":"normal",
    "fontStyle":"normal",
    "fontStretch":"normal",
    "letterSpacing":"-0.5px",
    "fill":"'#000000'"
  },
  gauge_score: {
    "textAnchor":"middle",
    "fontFamily":"'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'",
    "fontSize":"32px",
    "fontWeight":"bold",
    "fontStyle":"normal",
    "fontStretch":"normal",
    "letterSpacing":"-0.5px",
    "fill":"'#000000'"
  }
}

const RadiusGauge = ({width, height, score }) => {
  const cx = 150;
  const cy = 103;
  const radius = 103;
  const angleScale = d3.scaleLinear().domain([0, 1]).range([0, 180])

  if (score >= 0 && score <= 1) {
    return (
      <svg width={width} height={height}  transform={'translate(-26, 20)'}>
        <defs>
          <linearGradient 
            id={'gaugeGradient'}
            x1={"0%"} 
            y1={"0%"}
            x2={"100%"} 
            y2={"0%"}
            spreadMethod={"pad"}>
            <stop 
              offset={"0%"}   
              stopColor={"#189bff"} 
              stopOpacity={1}
            />
            <stop 
              offset={"100%"} 
              stopColor={"#002d4f"} 
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        <g transform={'translate(0, 20)'}>
          <path 
            d={`M 50,160 A ${radius} ${radius} 0 1 1 250 160`}
            fill={'none'}
            stroke={'url(#gaugeGradient)'}
            strokeWidth={'10'}
          />
        </g>
        <path transform={`translate(75, 150) rotate(${angleScale(score)}, 75, 3.1)`} fill="#189BFF" fillRule="evenodd" d="M1.605 4.5l64.83 2.434A3.437 3.437 0 0 0 70 3.5 3.437 3.437 0 0 0 66.434.066L1.605 2.5a1 1 0 0 0 0 1.998z" />
        <g transform={'translate(0, 55)'} style={styles.gauge_point}>
          <text x={cx - Math.round(120 * Math.cos(0))} y={cy - Math.round(120 * Math.sin(0))}>0</text>
          <text x={cx - Math.round(120 * Math.cos(Math.PI / 4))} y={cy - Math.round(120 * Math.sin(Math.PI / 4))}>0.25</text>
          <text x={cx + Math.round(120 * Math.cos(Math.PI / 2))} y={cy - Math.round(120 * Math.sin(Math.PI / 2))}>0.5</text>
          <text x={cx + Math.round(120 * Math.cos(Math.PI / 4))} y={cy - Math.round(120 * Math.sin(Math.PI / 4))}>0.75</text>
          <text x={cx + Math.round(120 * Math.cos(0))} y={cy - Math.round(120 * Math.sin(0))}>1.0</text>
        </g>
        <g transform={'translate(150, 200)'} style={styles.gauge_score}>
          <text>{`${score}`.slice(0, 4)}</text>
        </g>  
      </svg>
    )
  } else {
    return (
      <div>Invalid Score</div>
    )
  }

  
};

export default RadiusGauge;