import styled from 'styled-components'
import PropTypes from 'prop-types'
import { hexToRGB } from '@Components/button/utility'
import { color } from '@src/assets/styles/variables'

const font = {
  base: {
    size: 14,
  },
}

export const Text = (props) => `
  font-size: ${props.size ? `${props.size}px` : `${font.base.size}px`};

  font-weight: ${props.bold ? 'bold' : 'normal'};
  letter-spacing: -0.5px;
  color: ${hexToRGB(props.color ? props.color : color.$black, props.opacity ? (props.opacity * 0.1).toFixed(2) : 1)};
`;

export const TextTag = styled.span`
  ${Text}
`

export const TextOverflow = styled.p`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => (props.width)};
`

TextOverflow.defaultProps = {
  width: '100%',
}

TextOverflow.propTypes = {
  width: PropTypes.string,
}

export const TextOverflowMulti = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.line)};
  width: ${(props) => (props.width)};
  overflow: hidden;
`

TextOverflowMulti.defaultProps = {
  width: '100%',
  line: 2,
}

TextOverflowMulti.propTypes = {
  width: PropTypes.string,
  line: PropTypes.number,
}
