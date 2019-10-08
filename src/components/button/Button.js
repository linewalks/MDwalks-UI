import React from 'react';
import styled, { css } from 'styled-components'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'

import { darken, hexToRGB } from './utility'

const BtnDefaultCss = css`
  border:0 none;
  background-color:transparent;
  cursor:pointer
  transition: background-color 0.3s, color 0.3s ease;
  
  img {
    vertical-align: middle
  }

  &:hover {
    text-decoration: none
  }

  &:disabled {
    cursor: not-allowed
  }
`

const BtnSize = {
  large: {
    minWidth: '100px',
    height: '42px',
    borderRadius: '21px',
    padding: '10px 20px',
    img: {
      margin: '8px',
    },
    marginRight: '8px',
  },
  middle: {
    minWidth: '90px',
    height: '34px',
    borderRadius: '17px',
    padding: '7px 18px',
    img: {
      margin: '6px',
    },
    marginRight: '8px',
  }
}

const setBtnSize = props => `
  height: ${props.BtnSizeObject.height};
  border-radius: ${props.BtnSizeObject.borderRadius};
  padding: ${props.BtnSizeObject.padding};
  min-width: ${props.BtnSizeObject.minWidth};

  &:not(:last-child) {
    margin-right: ${props.BtnSizeObject.marginRight};
  }

  img:first-child {
    margin-right: ${props.BtnSizeObject.img.margin};
  }

  img:last-child {
    margin-left: ${props.BtnSizeObject.img.margin};
  }
`

const BtnColor = {
  primary: {
    boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
    backgroundColor: color.$solid_default,
    color: color.$primary_white,
    hover: {
      boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
      backgroundColor: darken(color.$solid_default, 24),
      color: color.$primary_white,
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$solid_default, 0.2),
      color: hexToRGB(color.$primary_white, 0.8),
    }
  },
  secondary: {
    boxShasdow: 'none',
    backgroundColor: hexToRGB(color.$black, 0.1),
    color: hexToRGB(color.$black, 0.6),
    hover: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$black, 0.18),
      color: hexToRGB(color.$black, 0.6),
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$black, 0.1),
      color: hexToRGB(color.$black, 0.2),
    }
  },
  light: {
    boxShasdow: 'none',
    backgroundColor: color.$primary_white,
    color: hexToRGB(color.$black, 0.6),
    border: `1px solid ${color.$line_btn_grey}`,
    hover: {
      boxShasdow: 'none',
      backgroundColor: `#f0f0f0`,
      color: `#c3c3c3`,
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: color.$primary_white,
      color: `#c3c3c3`,
    }
  }
}

const setBtnColor = props => `
  box-shadow: ${props.BtnColorObject.boxShasdow};
  background-color: ${props.BtnColorObject.backgroundColor};
  color: ${props.BtnColorObject.color};

  border: ${props.BtnColorObject.border ? props.BtnColorObject.border : 'none'};

  &:hover:not(:disabled) {
    box-shadow: ${props.BtnColorObject.hover.boxShasdow};
    background-color: ${props.BtnColorObject.hover.backgroundColor};
    color: ${props.BtnColorObject.hover.color};
  }

  &:disabled {
    box-shadow: ${props.BtnColorObject.disabled.boxShasdow};
    background-color: ${props.BtnColorObject.disabled.backgroundColor};
    color: ${props.BtnColorObject.disabled.color};
  }
`

const ButtonTag = styled(font.TextTag).attrs((props = {}) => {
  props.size = props.size || 'md'
  const BtnSizeObject = props.size === 'md' ? BtnSize.middle : BtnSize.large

  const BtnColorObject = 
    props.variant === 'primary' ? BtnColor.primary :
    props.variant === 'secondary' ? BtnColor.secondary : BtnColor.light

  return {
    size: props.size === 'md' ? 14 : 18,
    // bold: props.size === 'md' ? false : true,
    bold: false,
    BtnSizeObject,
    BtnColorObject,
  }
})`
  ${BtnDefaultCss}
  ${setBtnSize}
  ${setBtnColor}
`

const ButtonLinkTag = styled(font.TextTag).attrs((props = {}) => {
  const BtnSizeObject = BtnSize.middle

  return {
    size: 16,
    bold: props.bold || false,
    BtnSizeObject,
  }
})`
  ${BtnDefaultCss}
  ${setBtnSize}
  padding: 8px;
  line-height: 1;
  display: inline-block;
  box-sizing: border-box;

  color: ${color.$solid_default};
  &:hover {
    color: ${color.$solid_hover};
  }

  &:first-child {
    padding-left: 0;
  }
`

const ButtonTextLinkTag = styled(font.TextTag).attrs((props = {}) => {
  return {
    size: 16,
    bold: true,
  }
})`
  color: hexToRGB(color.$black, 0.6);
  text-decoration: underline;
`

export const ButtonLink = (props) => {
  return <ButtonLinkTag as="a" {...props}>{props.children}</ButtonLinkTag>
}

export const ButtonTextLink = (props) => {
  return <ButtonTextLinkTag as={props.as || "a"} {...props}>{props.children}</ButtonTextLinkTag>
}

export default (props) => {
  return <ButtonTag as={props.as || "button"} {...props}>{props.children}</ButtonTag>
}