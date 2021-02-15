/* eslint-disable react/prop-types */
import React from 'react'
import * as antd from 'antd'
import styled from 'styled-components'

import { color } from '@Styles/variables'

interface WrapTooltipProps {
  width: number;
}

const WrapTooltip = styled.div<WrapTooltipProps>`
  display: inline;
  position: relative;

  .ant-tooltip-arrow {
    visibility: hidden;
  }

  .ant-tooltip-inner {
    width: ${(props) => (`${props.width}px`)};
    padding: 12px 14px;
    box-shadow: 0 1px 8px 0 rgba(109, 120, 132, 0.36);
    border: 1px solid ${color.$grey08};
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: -0.5px;
    background-color: ${color.$white};
    color: ${color.$grey09};
  }

  .ant-tooltip-placement-left,
  .ant-tooltip-placement-leftBottom,
  .ant-tooltip-placement-leftTop {
    left: ${(props) => (`-${props.width + 5}px`)} !important;
  }
`

type PlacementProps = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  desc: string;
  children: React.ReactNode;
  innerStyle: {
    [styleKey:string]: string;
  }
  placement: PlacementProps;
  width: number;
}

const Tooltip = ({
  desc,
  children,
  innerStyle,
  placement,
  width,
}: TooltipProps) => (
  <WrapTooltip width={width}>
    <antd.Tooltip
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
      placement={placement}
      title={desc}
    >
      <span className="tooltip-span-child" style={innerStyle}>{children}</span>
    </antd.Tooltip>
  </WrapTooltip>
)

Tooltip.defaultProps = {
  desc: null,
  children: null,
  innerStyle: {
    fontWeight: 'bold',
  },
  placement: 'bottomLeft',
  width: 180,
}

export default Tooltip
