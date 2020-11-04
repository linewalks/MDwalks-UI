import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

export const BtnDefaultCss = css`
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

export const setBtnSize = (props) => `
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
    backgroundColor: color.$pmblue,
    color: color.$white,
    hover: {
      backgroundColor: color.$pmblue_dark,
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
  primary_line: {
    backgroundColor: color.$white,
    color: color.$pmblue,
    border: `1px solid ${color.$pmblue}`,
    hover: {
      boxShadow: '0 1px 8px 0 rgba(109, 120, 132, 0.36)',
      border: `1px solid ${color.$pmblue}`,
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
  basic: {
    backgroundColor: color.$grey04,
    color: color.$grey09,
    hover: {
      backgroundColor: color.$grey05,
      color: color.$grey09,
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
  basic_line: {
    backgroundColor: color.$white,
    color: color.$grey09,
    border: `1px solid ${color.$grey05}`,
    hover: {
      boxShadow: '0 1px 8px 0 rgba(109, 120, 132, 0.36)',
      border: `1px solid ${color.$grey05}`,
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
  primary_light: {
    backgroundColor: color.$white,
    color: color.$pmblue,
    hover: {
      boxShadow: '0 1px 8px 0 rgba(109, 120, 132, 0.36)',
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
  basic_light: {
    backgroundColor: color.$white,
    color: color.$grey09,
    hover: {
      boxShadow: '0 1px 8px 0 rgba(109, 120, 132, 0.36)',
    },
    disabled: {
      backgroundColor: color.$grey03,
      color: color.$grey06,
    },
  },
}

const setBtnColor = (props) => `
  box-shadow: ${props.BtnColorObject.boxShadow || 'none'};
  background-color: ${props.BtnColorObject.backgroundColor};
  color: ${props.BtnColorObject.color};

  border: ${props.BtnColorObject.border || 'none'};

  &:hover:not(:disabled) {
    box-shadow: ${props.BtnColorObject.hover.boxShadow || 'none'};
    background-color: ${props.BtnColorObject.hover.backgroundColor};
    color: ${props.BtnColorObject.hover.color};
    border: ${props.BtnColorObject.hover.border || 'none'};
  }

  &:disabled {
    box-shadow: ${props.BtnColorObject.disabled.boxShadow || 'none'};
    background-color: ${props.BtnColorObject.disabled.backgroundColor};
    color: ${props.BtnColorObject.disabled.color};
    border: ${props.BtnColorObject.disabled.border || 'none'};
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
  const { variant, bold } = props

  const BtnSizeObject = {
    xlg: BtnSize.xLarge,
    md: BtnSize.middle,
    lg: BtnSize.large,
  }[size]

  const BtnColorObject = {
    primary: BtnColor.primary,
    primary_line: BtnColor.primary_line,
    basic: BtnColor.basic,
    primary_light: BtnColor.primary_light,
    basic_light: BtnColor.basic_light,
  }[variant] || BtnColor.basic_line

  const fontSize = {
    xlg: 18,
    md: 14,
    lg: 16,
  }[size]

  return {
    size: fontSize,
    bold: bold || true,
    BtnSizeObject,
    BtnColorObject,
  }
})`
  ${BtnDefaultCss}
  ${setBtnSize}
  ${setBtnColor}
`

const Button = (props) => {
  const {
    isLoading,
    as: propsAs,
    disabled,
    children,
    size,
    variant,
    style,
    onClick,
    id,
  } = props

  let showLoading = isLoading

  if (_.isString(isLoading)) {
    showLoading = isLoading === 'true'
  }

  return (
    <ButtonTag
      id={id}
      as={propsAs}
      disabled={disabled || showLoading}
      size={size}
      variant={variant}
      style={style}
      onClick={onClick}
    >
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
  style: {},
  onClick: () => {},
  id: undefined,
}

Button.propTypes = {
  isLoading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  disabled: PropTypes.bool,
  as: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
  id: PropTypes.string,
}

export default Button
