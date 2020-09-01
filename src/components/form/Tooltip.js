/* eslint-disable react/prop-types */
import React from 'react'
import * as antd from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { color, colorV1 } from '@src/assets/styles/variables'

const WrapTooltip = styled.div`
  display: inline;
  position: relative;

  .ant-tooltip-arrow {
    visibility: hidden;
  }

  .ant-tooltip-inner {
    width: 360px;
    padding: 12px 14px;
    box-shadow: 0 1px 8px 0 rgba(109, 120, 132, 0.36);
    border: 1px solid ${colorV1.$grey08};
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: -0.5px;
    background-color: ${color.$primary_white};
    color: ${colorV1.$grey09};
  }

  .ant-tooltip-placement-bottomLeft {
    left: 0px !important; 
  }
`

const Tooltip = ({
  desc,
  children,
  innerStyle,
}) => (
  <WrapTooltip>
    <antd.Tooltip getPopupContainer={(triggerNode) => triggerNode.parentNode} placement="bottomLeft" title={desc}>
      <span style={innerStyle}>{children}</span>
    </antd.Tooltip>
  </WrapTooltip>
)

Tooltip.defaultProps = {
  desc: null,
  children: null,
  innerStyle: {
    fontWeight: 'bold',
  },
}

Tooltip.propTypes = {
  desc: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.elementType]),
  innerStyle: PropTypes.shape({}),
}

export default Tooltip
