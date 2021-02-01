import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import _ from 'lodash'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'
import fontStyle from '../../assets/styles/font.module.sass'

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

interface BtnTagProps {
  id?: string;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
  size: string;
  variant: 'primary' | 'primary_line' | 'basic' | 'basic_line' | 'primary_light' | 'basic_light';
  style?: object;
  bold?: boolean;
}

const ButtonTag = styled.span`
`

interface ButtonProps extends BtnTagProps {
  isLoading?: boolean | string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
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

  const className = [
    'mdwalks_btn_common',
    `mdwalks_btn_${size}`,
    `mdwalks_btn_${variant}`
  ].join(' ')

  return (
    <ButtonTag
      className={className}
      id={id}
      as={propsAs}
      disabled={disabled || showLoading}
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

export default Button
