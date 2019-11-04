import React from 'react'
import styled from 'styled-components'

import * as font from '@src/assets/styles/font'

const Text = styled.header`
  ${font.Text}
`

export default ({size=22, opacity, children, style={}}) => {
  return (
    <Text size={size} opacity={opacity} bold style={style}>
      { children }
    </Text>
  )
}