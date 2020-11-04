// import React from 'react';
import styled, { css } from 'styled-components'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

import ChartConfig from '@src/helper/ChartConfig'

const CssEnable = css`
  label {
    cursor: pointer;
  }
  img:hover:not(:disabled) {
    box-shadow: 0 1px 8px 0 rgba(109, 120, 132, 0.36);
  }
  &:hover {
    background-color: ${(props) => (props.layout === ChartConfig.Layout.VERTICAL ? color.$pmblue02 : 'transparent')};
  }
`

const CssDisable = css`
  label {
    cursor: not-allowed;
  }
`
const Item = styled.div.attrs((props) => {
  const fontColorClassName = props.disabled ? fontStyle.fc_grey06 : fontStyle.fc_grey09
  return {
    className: [fontStyle.fs16, fontColorClassName].join(' '),
  }
})`
  label {
    display: block;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img {
      margin-right: 12px;
    }
  }
  input {
    display: none;
  }

  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? ' display: inline-block' : 'display: block')};
  ${(props) => (props.disabled ? CssDisable : CssEnable)}
`

export default Item
