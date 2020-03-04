import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { colorV1 } from '@src/assets/styles/variables'

const colorSet = {
  basic: colorV1.$grey09,
  primary: colorV1.$pmblue,
}

const TextLinkTag = styled(font.TextTag).attrs(() => ({
  bold: true,
}))`
  color: ${(props) => (colorSet[props.variant])};
  &:hover {
    text-decoration: underline;
  }

  ${(props) => (props.underline ? 'text-decoration: underline' : '')};
  font-size: ${(props) => (props.fontSize)}px;
  cursor: pointer;
`

const TextLink = (props) => {
  const {
    as: propsAs,
    children,
    style,
    onClick,
    id,
    size,
    variant,
    underline,
  } = props

  const fontSize = {
    xlg: 18,
    md: 14,
    lg: 16,
  }[size]

  return (
    <TextLinkTag
      id={id}
      as={propsAs}
      variant={variant}
      underline={underline}
      fontSize={fontSize}
      style={style}
      onClick={onClick}
    >
      {children}
    </TextLinkTag>
  )
}

TextLink.defaultProps = {
  as: 'a',
  styled: {},
  onClick: () => {},
  id: undefined,
  size: 'md',
  variant: 'basic',
  underline: false,
}
TextLink.propTypes = {
  as: PropTypes.string,
  styled: PropTypes.shape({}),
  onClick: PropTypes.func,
  id: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  underline: PropTypes.bool,
}

export default TextLink
