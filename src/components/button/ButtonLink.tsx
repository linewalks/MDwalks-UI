import React from 'react'
import styled from 'styled-components'
import * as font from '@Styles/font'
import { color } from '@Styles/variables'
import { css } from 'styled-components'

//스타일드 컴포넌트로 구성되어있던 Button.tsx에서 가져옴 - BtnDefaultCss, BtnSize, setBtnSize
export const BtnDefaultCss = css`
  border: 0 none;
  background-color: transparent;
  cursor: pointer;
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

interface BtnLinkProps {
  as?: React.ElementType
  size: string
  style?: object
  onClick: () => void
  id?: string
  bold?: boolean
  children: React.ReactNode
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
  const { as: propsAs, children, size, style, onClick, id } = props

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
