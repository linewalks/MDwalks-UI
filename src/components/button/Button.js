import React from 'react';
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import { hexToRGB } from '@Components/button/utility'

const BtnDefaultCss = css`
  border:0 none;
  background-color:transparent;
  cursor:pointer;
  transition: background-color 0.3s, color 0.3s ease, border-color 0.3s ease;
  line-height: 1.34em;

  img {
    vertical-align: middle;
  }

  &:hover {
    text-decoration: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const BtnSize = {
  xLarge: {
    minWidth: '100%',
    height: '60px',
    borderRadius: '10px',
    padding: '16px 20px',
    img: {
      margin: '8px',
    },
    marginRight: '0',
  },
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
  },
}

const setBtnSize = (props) => `
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
    boxShasdow: `none`,
    backgroundColor: color.$solid_default,
    color: color.$primary_white,
    hover: {
      boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
      backgroundColor: color.$solid_hover,
      color: color.$primary_white,
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$btn_lightshaded_default, 0.48),
      color: hexToRGB(color.$black, 0.2),
    },
  },
  primary_line: {
    boxShasdow: `none`,
    backgroundColor: color.$primary_white,
    color: color.$solid_default,
    border: `1px solid ${color.$solid_default}`,
    hover: {
      boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
      backgroundColor: color.$primary_white,
      color: color.$solid_hover,
      border: `1px solid ${color.$solid_default}`,
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$btn_lightshaded_default, 0.48),
      color: hexToRGB(color.$black, 0.2),
      border: `1px solid ${hexToRGB(color.$line_btn_grey, 0.48)}`,
    },
  },
  basic: {
    boxShasdow: 'none',
    backgroundColor: hexToRGB(color.$black, 0.1),
    color: hexToRGB(color.$black, 0.6),
    hover: {
      boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
      backgroundColor: hexToRGB(color.$black, 0.18),
      color: hexToRGB(color.$black, 0.6),
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$btn_lightshaded_default, 0.48),
      color: hexToRGB(color.$black, 0.2),
    },
  },
  basic_line: {
    boxShasdow: 'none',
    backgroundColor: color.$primary_white,
    color: hexToRGB(color.$black, 0.6),
    border: `1px solid ${hexToRGB(color.$black, 0.1)}`,
    hover: {
      boxShasdow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
      backgroundColor: color.$primary_white,
      color: hexToRGB(color.$black, 0.6),
      border: `1px solid ${hexToRGB(color.$black, 0.1)}`,
    },
    disabled: {
      boxShasdow: 'none',
      backgroundColor: hexToRGB(color.$btn_lightshaded_default, 0.48),
      color: hexToRGB(color.$black, 0.2),
      border: `1px solid ${hexToRGB(color.$line_btn_grey, 0.48)}`,
    },
  },
}

const setBtnColor = (props) => `
  box-shadow: ${props.BtnColorObject.boxShasdow};
  background-color: ${props.BtnColorObject.backgroundColor};
  color: ${props.BtnColorObject.color};

  border: ${props.BtnColorObject.border ? props.BtnColorObject.border : 'none'};

  &:hover:not(:disabled) {
    box-shadow: ${props.BtnColorObject.hover.boxShasdow};
    background-color: ${props.BtnColorObject.hover.backgroundColor};
    color: ${props.BtnColorObject.hover.color};
    border: ${props.BtnColorObject.hover.border ? props.BtnColorObject.hover.border : 'none'};
  }

  &:disabled {
    box-shadow: ${props.BtnColorObject.disabled.boxShasdow};
    background-color: ${props.BtnColorObject.disabled.backgroundColor};
    color: ${props.BtnColorObject.disabled.color};
    border: ${props.BtnColorObject.disabled.border ? props.BtnColorObject.disabled.border : 'none'};
  }
`

const fade = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

const LoadingBase = css`
  opacity: 0;
  animation: ${fade} 1.3s infinite;
`

const LoadingOne = styled.span`
  ${LoadingBase}
  animation-delay: 0.0s
`

const LoadingTwo = styled.span`
  ${LoadingBase}
  animation-delay: 0.2s
`

const LoadingThree = styled.span`
  ${LoadingBase}
  animation-delay: 0.3s
`


const ButtonTag = styled(font.TextTag).attrs((props = {}) => {
  const size = props.size || 'md'

  const BtnSizeObject = {
    xlg: BtnSize.xLarge,
    md: BtnSize.middle,
    lg: BtnSize.large,
  }[size]

  const { variant } = props

  const BtnColorObject = {
    primary: BtnColor.primary,
    primary_line: BtnColor.primary_line,
    basic: BtnColor.basic,
  }[variant] || BtnColor.basic_line

  const fontSize = {
    xlg: 18,
    md: 14,
    lg: 16,
  }[size]

  return {
    size: fontSize,
    bold: props.bold || true,
    BtnSizeObject,
    BtnColorObject,
  }
})`
  ${BtnDefaultCss}
  ${setBtnSize}
  ${setBtnColor}
`

const ButtonLinkTag = styled(font.TextTag).attrs((props = {}) => {
  const size = props.size || 'md'
  const BtnSizeObject = props.size === 'md' ? BtnSize.middle : BtnSize.large

  return {
    size: size === 'md' ? 14 : 16,
    bold: props.bold || true,
    BtnSizeObject,
  }
})`
  ${BtnDefaultCss}
  ${setBtnSize}
  min-width: auto;
  padding-left: 8px;
  padding-right: 8px;
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

const ButtonTextLinkTag = styled(font.TextTag).attrs(() => ({
  size: 16,
  bold: true,
}))`
  color: ${hexToRGB(color.$black, 0.6)};
  text-decoration: underline;
`

export const ButtonLink = (props) => {
  const { as: propsAs, children, size } = props
  return <ButtonLinkTag as={propsAs} size={size}>{children}</ButtonLinkTag>
}

ButtonLink.defaultProps = {
  as: 'a',
  size: 'md',
}
ButtonLink.propTypes = {
  as: PropTypes.string,
  size: PropTypes.string,
}

export const ButtonTextLink = (props) => {
  const { as: propsAs, children } = props
  return <ButtonTextLinkTag as={propsAs}>{children}</ButtonTextLinkTag>
}

ButtonTextLink.defaultProps = {
  as: 'a',
}
ButtonTextLink.propTypes = {
  as: PropTypes.string,
}

const Button = (props) => {
  const {
    isLoading,
    as: propsAs,
    disabled,
    children,
    size,
    variant,
  } = props

  const showLoading = isLoading === 'true'

  return (
    <ButtonTag as={propsAs} disabled={disabled || showLoading} size={size} variant={variant}>
      {showLoading ? 'loading' : children}

      {
        showLoading
        && (
        <span>
          <LoadingOne>.</LoadingOne>
          <LoadingTwo>.</LoadingTwo>
          <LoadingThree>.</LoadingThree>
        </span>
        )
      }
    </ButtonTag>
  )
}

Button.defaultProps = {
  isLoading: 'false',
  disabled: false,
  as: 'button',
  size: 'md',
  variant: 'basic_line',
}

Button.propTypes = {
  isLoading: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
}

export default Button
