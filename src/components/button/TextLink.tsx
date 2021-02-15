import React from 'react';
import styled from 'styled-components'
import * as font from '@Styles/font'
import { color } from '@Styles/variables'

const colorSet = {
  basic: color.$grey09,
  primary: color.$pmblue,
}

interface TextLinkTagProps {
  variant: string;
  underline: string;
  fontSize: number;
}

const TextLinkTag = styled(font.TextTag).attrs(() => ({
  bold: true,
}))<TextLinkTagProps>`
  color: ${(props) => (colorSet[props.variant])};

  &:hover {
    text-decoration: underline;
  }

  ${(props) => (props.underline ? 'text-decoration: underline' : '')};
  font-size: ${(props) => (props.fontSize)}px;
  cursor: pointer;
`

const Icon = styled.img``

const TextLinkIconTag = styled(TextLinkTag)`
  display: inline-block;

  vertical-align: middle;
  > div {
    display: flex;
    align-items: center;
  }

  ${Icon} {
    &:first-child {
      margin-right: 8px;
    }
    &:last-child {
      margin-left: 8px;
    }
  }
`
interface TextLinkProps extends TextLinkTagProps {
  href: string;
  target: string;
  rel: string;
  style: object;
  size: string;
  hasIcon: boolean;
  children: React.ReactNode;
  as: React.ElementType;
  src: string;
}

const TextLink = (props: TextLinkProps) => {
  const {
    href,
    target,
    rel,
    children,
    style,
    size,
    variant,
    underline,
    hasIcon,
  } = props

  const fontSize = {
    xlg: 18,
    md: 14,
    lg: 16,
  }[size]

  if (hasIcon) {
    return (
      <TextLinkIconTag
        href={href}
        target={target}
        rel={rel}
        as="a"
        variant={variant}
        underline={underline}
        fontSize={fontSize}
        style={style}
      >
        <div>
          {children}
        </div>
      </TextLinkIconTag>
    )
  }

  return (
    <TextLinkTag
      href={href}
      target={target}
      rel={rel}
      as="a"
      variant={variant}
      underline={underline}
      fontSize={fontSize}
      style={style}
    >
      {children}
    </TextLinkTag>
  )
}

TextLink.defaultProps = {
  href: undefined,
  target: undefined,
  rel: undefined,
  style: {},
  size: 'md',
  variant: 'basic',
  underline: false,
  hasIcon: false,
}

TextLink.Icon = Icon

export default TextLink
