import styled, { css } from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

const CssEnable = css`
  label {
    cursor: pointer;
  }
  img:hover:not(:disabled) {
    box-shadow: 0 2px 6px 0 rgba(0, 45, 79, 0.16);
  }
  &:hover {
    background-color: ${color.$secondary_blue};
  }
`

const CssDiable = css`
  img {
    opacity: 0.4;
  }
`

const Item = styled(font.TextTag).attrs(() => ({
  size: 16,
  opacity: 8,
}))`
  label {
    display: block;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img {
      margin-right: 12px;
    }
  }
  input {
    display: none;
  }

  ${(props) => (props.disabled ? CssDiable : CssEnable)}
`

export default Item
