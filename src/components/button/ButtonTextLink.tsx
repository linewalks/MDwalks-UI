import React from 'react';
import styled from 'styled-components'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'
import { hexToRGB } from './utility'

interface BtnTextLinkProps {
  as?: React.ElementType;
  style?: object;
  onClick: () => void;
  id?: string;
  children: React.ReactNode;
}

const ButtonTextLinkTag = styled(font.TextTag).attrs(() => ({
  size: 16,
  bold: true,
}))`
  color: ${hexToRGB(color.$black, 0.6)};
  text-decoration: underline;
`

export const ButtonTextLink = (props: BtnTextLinkProps) => {
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

export default ButtonTextLink
