import React from 'react';
import styled from 'styled-components'
import * as font from '@Styles/font'
import { color } from '@Styles/variables'

import icnSelectOpenSm from '../../assets/svg/icn_chevron_down_24.svg'
import icnSelectOpenXs from '../../assets/svg/icn_chevron_down_16.svg'

const SelectSize = {
  xLarge: {
    fontSize: 16,
    height: '64px',
    minWidth: '200px',
    padding: '20px 64px 20px 24px',
    iconSize: '24px',
    marginRight: '0px',
    borderRadius: '8px',
    backgroundImage: icnSelectOpenSm,
    backgroundPosition: 'calc(100% - 20px) center',
  },
  large: {
    fontSize: 16,
    height: '42px',
    minWidth: '90px',
    padding: '9px 42px 9px 20px',
    iconSize: '16px',
    marginRight: '8px',
    borderRadius: '21px',
    backgroundImage: icnSelectOpenXs,
    backgroundPosition: 'calc(100% - 13px) center',
  },
  middle: {
    fontSize: 14,
    height: '34px',
    minWidth: '80px',
    padding: '7px 34px 7px 18px',
    iconSize: '16px',
    marginRight: '8px',
    borderRadius: '21px',
    backgroundImage: icnSelectOpenXs,
    backgroundPosition: 'calc(100% - 13px) center',
  },
}

const setSelectSize = (props) => `
  select {
    height: ${props.SizeObject.height};
    padding: ${props.SizeObject.padding};
    min-width: ${props.SizeObject.minWidth};
    border-radius: ${props.SizeObject.borderRadius};
    background: url(${props.SizeObject.backgroundImage}) no-repeat ${color.$white} ${props.SizeObject.backgroundPosition};

    border: 1px solid ${color.$grey05}
  }

  &:not(:last-child) {
    margin-right: ${props.SizeObject.marginRight};
  }

  option {
    background-color: ${color.$white};
  }

  display: inline-block;
`

// size : xlg, lg, md
const Box = styled.div.attrs(({ size = 'md' }: { size: string; }) => {
  const SizeObject = ({
    xlg: SelectSize.xLarge,
    md: SelectSize.middle,
  })[size] || SelectSize.large

  return {
    size: SizeObject.fontSize,
    SizeObject,
  }
})`
  select {
    ${font.Text}
    &:focus {
      border: 2px solid ${color.$pmblue};
      box-shadow: 0 2px 18px 0 rgba(109, 120, 132, 0.28);
    }

    &:disabled {
      background-color: ${color.$grey03};
      border-color: ${color.$grey05};
      color: ${color.$grey06};
    }

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    -moz-appearance: textfield;

    option[value=""][hidden] {
      display: none;
    }
  }

  option {
    ${font.Text}
  }

  select:invalid {
    color: ${color.$grey10};
    border: 2px solid ${color.$red01};
  }

  ${setSelectSize}
`

interface SelectBoxProps {
  style: object;
  children: React.ReactNode;
  size: 'md' | 'lg' | 'xlg';
}

const SelectBox = ({ style, children, size }: SelectBoxProps) => (
  <Box style={style} size={size}>
    {children}
  </Box>
)

SelectBox.defaultProps = {
  size: 'md',
}

export default SelectBox
