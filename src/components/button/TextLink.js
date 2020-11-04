import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

const colorSet = {
  basic: color.$grey09,
  primary: color.$pmblue,
}

const TextLinkTag = styled(font.TextTag).attrs(() => ({
  bold: true,
}))`
  &, &:hover {
    color: ${(props) => (colorSet[props.variant])};
  }

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

const TextLink = (props) => {
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
TextLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  style: PropTypes.shape({}),
  size: PropTypes.string,
  variant: PropTypes.string,
  underline: PropTypes.bool,
  hasIcon: PropTypes.bool,
}

TextLink.Icon = Icon

export default TextLink
