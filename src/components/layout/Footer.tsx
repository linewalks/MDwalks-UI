import React from 'react';
import styled from 'styled-components'

import { color, size } from '@Styles/variables'
import * as font from '@Styles/font'

const FooterWrap = styled.footer`
  position: absolute;
  bottom: 0;
  height: ${size.$footer_height};
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`

const FooterBox = styled.div<font.IText>`
  ${font.Text}
  border-top: 1px solid ${color.$grey04};
  height: ${size.$footer_height};

  display: flex;
  align-items: center;

  p {
    padding-left: 32px;
  }
`

interface FooterProps {
  style: object;
}

const Footer = ({ style }: FooterProps) => (
  <FooterWrap style={style}>
    <FooterBox size="12" opacity={6} style={{ color: color.$grey08 }}>
      <p>
        © 2020 linewalks. All rights reserved.
      </p>
    </FooterBox>
  </FooterWrap>
)

export default Footer
