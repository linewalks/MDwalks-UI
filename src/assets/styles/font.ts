import styled from 'styled-components'
import { hexToRGB } from '../../components/button/utility'
import { color } from './variables'

const font = {
  base: {
    size: 14,
  },
}

interface IText {
  size: string | number;
  bold?: boolean;
  opacity: number;
  color: string;
}

export const Text = (props: IText) => `
  font-size: ${props.size ? `${props.size}px` : `${font.base.size}px`};

  font-weight: ${props.bold ? 'bold' : 'normal'};
  letter-spacing: -0.5px;
  color: ${hexToRGB(props.color ? props.color : color.$black, props.opacity ? +(props.opacity * 0.1).toFixed(2) : 1)};
`;

export const TextTag = styled.span`
  ${Text}
`

interface ITextOverflow {
  width: string;
}

export const TextOverflow = styled.p<ITextOverflow>`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => (props.width)};
`

TextOverflow.defaultProps = {
  width: '100%',
}

interface ITextOverflowMulti extends ITextOverflow{
  line: number;
}

export const TextOverflowMulti = styled.p<ITextOverflowMulti>`
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
