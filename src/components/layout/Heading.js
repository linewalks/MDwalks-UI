import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as font from '@src/assets/styles/font'

const Text = styled.header`
  ${font.Text}
`

const Heading = ({
  size = 22,
  children,
  style,
}) => (
  <Text size={size} bold style={style}>
    { children }
  </Text>
)

Heading.propTypes = {
  size: PropTypes.number.isRequired,
}

export default Heading
