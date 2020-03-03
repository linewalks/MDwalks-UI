import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import icnSelectOpenSm from '@src/assets/svg/icn_select_open_sm.svg';
import icnSelectOpenXs from '@src/assets/svg/icn_select_open_xs.svg';

const SelectSize = {
  xLarge: {
    fontSize: 16,
    height: '64px',
    minWidth: '200px',
    padding: '20px 64px 20px 24px',
    iconSize: '24px',
    marginRight: '0px',
    borderRadius: '10px',
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
    background: url(${props.SizeObject.backgroundImage}) no-repeat ${color.$primary_white} ${props.SizeObject.backgroundPosition};

    border: 1px solid ${color.$line_search_grey}
  }

  &:not(:last-child) {
    margin-right: ${props.SizeObject.marginRight};
  }

  option {
    background-color: #ffffff;
  }

  display: inline-block;
`

// size : xlg, lg, md
const Box = styled.div.attrs(({ size = 'md', disabled }) => {
  const SizeObject = ({
    xlg: SelectSize.xLarge,
    md: SelectSize.middle,
  })[size] || SelectSize.large

  return {
    size: SizeObject.fontSize,
    opacity: disabled ? 2 : 8,
    SizeObject,
  }
})`
  select {
    ${font.Text}
    &:focus {
      box-shadow: 0 2px 6px 0 rgba(0, 45, 79, 0.16);
    }

    &:disabled {
      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.2);
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
    color: rgba(0, 0, 0, 0.3);
  }

  ${setSelectSize}
`

const SelectBox = ({ style, children, size }) => (
  <Box style={style} size={size}>
    {children}
  </Box>
)

SelectBox.defaultProps = {
  size: 'md',
}

SelectBox.propTypes = {
  size: PropTypes.string,
}

export default SelectBox
