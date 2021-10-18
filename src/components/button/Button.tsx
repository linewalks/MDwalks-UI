import React from 'react'
import _ from 'lodash'
import './Button.sass'
import clsx from 'clsx'
import DynamicTag from './DynamicTag'

interface ButtonProps {
  //BtnTagProps
  as?: React.ElementType
  id?: string
  disabled?: boolean
  size: string
  variant:
    | 'primary'
    | 'primary_line'
    | 'basic'
    | 'basic_line'
    | 'primary_light'
    | 'basic_light'
  style?: object
  // //ButtonProps
  isLoading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const {
    as: propsAs,
    isLoading,
    disabled,
    children,
    size,
    variant,
    style,
    onClick,
    id,
    ...rest
  } = props

  return (
    <DynamicTag
      id={id}
      disabled={disabled || isLoading}
      className={clsx(
        `mwc-button`,
        `mwc-button__${size}`,
        `mwc-button__${variant}`,
      )}
      // style={style}
      style={{ ...style }}
      onClick={onClick}
      as={propsAs}
      {...rest}
    >
      {isLoading ? 'loading' : children}
      {isLoading && (
        <span>
          <span className="loading-one">.</span>
          <span className="loading-two">.</span>
          <span className="loading-three">.</span>
        </span>
      )}
    </DynamicTag>
  )
}

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  size: 'md',
  variant: 'basic_line',
  style: {},
  onClick: () => {},
  id: undefined,
  as: 'button',
}

export default Button
