import React from 'react';
import styled, { css } from 'styled-components'
import backgroundArrow from '../../assets/svg/icn-12-px.svg';
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'

import { darken, hexToRGB } from './utility'

const BtnDefault = css`
  border:0 none;background-color:transparent;cursor:pointer

  img {
    vertical-align: middle
  }

  &:hover {
    text-decoration: none
  }

  &:disabled {
    cursor: not-allowed
  }
`

const BtnLarge = styled(font.TextTag).attrs({
  size: 18,
  bold: true
})`
  ${BtnDefault}

  height: 42px;
  border-radius: 21px;
  padding-left: 26px;
  padding-right: 26px;

  transition: background-color 0.3s, color 0.3s ease;

  &:not(:last-child) {
    margin-right: 10px
  }

  img:first-child {
    margin-right: 8px
  }

  img:last-child {
    margin-left: 8px
  }
`

const BtnPrimary = styled(BtnLarge)`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  background-color: ${color.$solid_default};
  color: ${color.$primary_white};

  &:hover:not(:disabled) {
    background-color: ${darken(color.$solid_default, 24)}
  }

  &:disabled {
    color: ${hexToRGB(color.$primary_white, 0.8)};
    background-color: ${hexToRGB(color.$solid_default, 0.2)};
  }
`

const BtnPrimaryText = styled(BtnLarge)`
  color: ${color.$solid_default};
  &:hover {
    color: #0070c6
  }
`

const BtnSecondary = styled(BtnLarge)`
  background-color: ${hexToRGB(color.$black, 0.1)};
  color: ${hexToRGB(color.$black, 0.6)};
  &:hover:not(:disabled) {
    background-color: ${hexToRGB(color.$black, 0.18)};
  }
  
  &:disabled {
    color: ${hexToRGB(color.$black, 0.2)};
    background-color: ${hexToRGB(color.$black, 0.1)};
  }
`

// const btnLight = styled
//   @extend .btn-middle
//   @extend .black_opacity_6
//   border: 1px solid $line_btn_grey
//   background-color: $primary_white

// .btn-light:disabled
//   opacity: 0.4

const BtnMiddle = styled(font.TextTag).attrs({
  size: 14,
  bold: false
})`
  ${BtnDefault}

  height: 34px;
  border-radius: 17px;
  padding: 7px 18px;

  transition: background-color 0.3s, color 0.3s ease;

  img:first-child {
    margin-right: 6px
  }

  img:last-child {
    margin-left: 6px
  }
`

const BtnLight = styled(BtnMiddle)`
  background-color: ${color.$primary_white};
  color: ${hexToRGB(color.$black, 0.6)};
  border: 1px solid ${color.$line_btn_grey};
`


export const primary = (props) => {
  let className = (props.className || '').split(/\s+/g)
  // className.unshift('btn-primary')

  return <BtnPrimary as="button" {...props} className={className.join(' ')}>
    { props.children }
  </BtnPrimary>
}

export const primaryText = (props) => {
  let className = (props.className || '').split(/\s+/g)
  // className.unshift('btn-primary-text')

  return <BtnPrimaryText as="button" {...props} className={className.join(' ')}>
    { props.children }
  </BtnPrimaryText>
}

export const secondary = (props) => {
  let className = (props.className || '').split(/\s+/g)
  // className.unshift('btn-secondary')
  
  return <BtnSecondary as="button" {...props} className={className.join(' ')}>
    { props.children }
  </BtnSecondary>
}

export const light = (props) => {
  let className = (props.className || '').split(/\s+/g)
  // className.unshift('btn-light')
  
  return <BtnLight {...props} className={className.join(' ')}>
    { props.children }
  </BtnLight>
}