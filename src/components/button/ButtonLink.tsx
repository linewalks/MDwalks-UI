import React from 'react';
import styled from 'styled-components'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'
import { BtnDefaultCss, BtnSize, setBtnSize } from './Button'

interface BtnLinkProps {
  as?: React.ElementType;
  size: string;
  style?: object;
  onClick: () => void;
  id?: string;
  bold?: boolean;
  children: React.ReactNode;
}

const ButtonLinkTag = styled(font.TextTag).attrs((props: BtnLinkProps) => {
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

const ButtonLink = (props: BtnLinkProps) => {
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

export default ButtonLink
