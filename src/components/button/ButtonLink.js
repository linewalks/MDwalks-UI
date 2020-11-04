import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import { BtnDefaultCss, BtnSize, setBtnSize } from '@Components/button/Button'

const ButtonLinkTag = styled(font.TextTag).attrs((props = {}) => {
  const { size, bold } = props
  const BtnSizeObject = size === 'md' ? BtnSize.middle : BtnSize.large
  const FontSize = size === 'md' ? 14 : 16

  return {
    size: FontSize,
    bold: bold || true,
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

  color: ${color.$pmblue};
  &:hover {
    color: ${color.$pmblue_dark};
  }

  &:first-child {
    padding-left: 0;
  }
`

const ButtonLink = (props) => {
  const {
    as: propsAs,
    children,
    size,
    style,
    onClick,
    id,
  } = props

  return (
    <ButtonLinkTag
      id={id}
      as={propsAs}
      size={size}
      style={style}
      onClick={onClick}
    >
      {children}
    </ButtonLinkTag>
  )
}

ButtonLink.defaultProps = {
  as: 'a',
  size: 'md',
  styled: {},
  onClick: () => {},
  id: undefined,
}
ButtonLink.propTypes = {
  as: PropTypes.string,
  size: PropTypes.string,
  styled: PropTypes.shape({}),
  onClick: PropTypes.func,
  id: PropTypes.string,
}

export default ButtonLink
