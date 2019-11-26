import React from 'react';
import styled from 'styled-components'

import { color, size } from '@src/assets/styles/variables'
import * as font from '@src/assets/styles/font'

const FooterWrap = styled.footer`
  position: absolute
  bottom: 0
  height: ${size.$footer_height}
  padding: 0 30px
  width: 100%
  box-sizing: border-box
`

const FooterBox = styled.div`
  ${font.Text}
  border-top: 1px solid ${color.$line_search_grey}
  height: ${size.$footer_height}

  display: flex
  align-items: center

  span {
    padding-left: 30px
  }
`

const Footer = (props) => {
  const { style } = props
  return (
    <FooterWrap style={style}>
      <FooterBox size="12" opacity="6">
        <span>
          © 2019 linewalks. All rights reserved.
        </span>
      </FooterBox>
    </FooterWrap>
  )
}

export default Footer
