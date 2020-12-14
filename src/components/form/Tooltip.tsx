/* eslint-disable react/prop-types */
import React from 'react'
import * as antd from 'antd'
import styled from 'styled-components'

import { color } from '../../assets/styles/variables'

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
    border: 1px solid ${color.$grey08};
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: -0.5px;
    background-color: ${color.$white};
    color: ${color.$grey09};
  }

  .ant-tooltip-placement-bottomLeft {
    left: 0px !important; 
  }
`

interface TooltipProps {
  desc: string;
  children: React.ReactNode;
  innerStyle: {
    [styleKey:string]: string;
  }
}

const Tooltip = ({
  desc,
  children,
  innerStyle,
}: TooltipProps) => (
  <WrapTooltip>
    <antd.Tooltip getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement} placement="bottomLeft" title={desc}>
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

export default Tooltip
