import React from 'react'
import styled from 'styled-components'

import * as font from '../../assets/styles/font'

const Text = styled.header`
  ${font.Text}
`

export default ({size=22, children, style={}}) => {
  return (
    <Text size={size} bold style={style}>
      { children }
    </Text>
  )
}