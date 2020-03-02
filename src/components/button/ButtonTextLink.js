import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import { hexToRGB } from '@Components/button/utility'

const ButtonTextLinkTag = styled(font.TextTag).attrs(() => ({
  size: 16,
  bold: true,
}))`
  color: ${hexToRGB(color.$black, 0.6)};
  text-decoration: underline;
`

export const ButtonTextLink = (props) => {
  const {
    as: propsAs,
    children,
    style,
    onClick,
    id,
  } = props
  return (
    <ButtonTextLinkTag
      id={id}
      as={propsAs}
      style={style}
      onClick={onClick}
    >
      {children}
    </ButtonTextLinkTag>
  )
}

ButtonTextLink.defaultProps = {
  as: 'a',
  styled: {},
  onClick: () => {},
  id: undefined,
}
ButtonTextLink.propTypes = {
  as: PropTypes.string,
  styled: PropTypes.shape({}),
  onClick: PropTypes.func,
  id: PropTypes.string,
}

export default ButtonTextLink
