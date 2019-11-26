import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as font from '@src/assets/styles/font'

const Text = styled.header`
  ${font.Text}
`

const Heading = ({
  size,
  children,
  style,
}) => (
  <Text size={size} bold style={style}>
    { children }
  </Text>
)

Heading.defaultProps = {
  size: '22',
}

Heading.propTypes = {
  size: PropTypes.string,
}

export default Heading
