import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colorV1 } from '@src/assets/styles/variables'
import * as font from '@src/assets/styles/font'

const Text = styled.header`
  ${font.Text};
  color: ${colorV1.$grey10};
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
