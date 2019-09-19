import styled from 'styled-components'

const font = {
  base: {
    size: 14
  }
}

export const Text = props => `
  font-size: ${props.size ? props.size + 'px' : font.base.size + 'px'};

  font-weight: ${props.bold ? 'bold' : 'normal'};
  letter-spacing: -0.5px;
  color: rgba(0, 0, 0, ${props.opacity ? (props.opacity * 0.1).toFixed(2) : 1});
`;

export const TextTag = styled.span`
  ${Text}
`