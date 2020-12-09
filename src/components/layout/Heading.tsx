import React from 'react'
import styled from 'styled-components'
import { color } from '../..//assets/styles/variables'
import * as font from '../..//assets/styles/font'

interface TextProps {
  size: string;
  bold: boolean;
}

const Text = styled.header<TextProps>`
  ${font.Text};
  color: ${color.$grey10};
`

interface HeadingProps {
  size: string;
  children: React.ReactNode;
  style: object;
}

const Heading = ({
  size,
  children,
  style,
}: HeadingProps) => (
  <Text size={size} bold style={style}>
    { children }
  </Text>
)

Heading.defaultProps = {
  size: '22',
}

export default Heading
