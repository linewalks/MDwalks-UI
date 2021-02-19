import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import { color, size } from '@Styles/variables'
import * as font from '@Styles/font'

const WrapFooter = styled.footer`
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
  style: {
    [key:string]: string;
  },
  text: string;
}

const getFullYear = () => {
  const date = new Date()
  return date.getFullYear()
}

const Footer = ({ style, text }: FooterProps) => (
  <WrapFooter style={style}>
    <FooterBox size="12" opacity={6} style={{ color: color.$grey08 }}>
      <p>
        {
          _.isEmpty(text)
            ? `© ${getFullYear()} linewalks.  All rights reserved.`
            : text
        }
      </p>
    </FooterBox>
  </WrapFooter>
)

export default Footer
