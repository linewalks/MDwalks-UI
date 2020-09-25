/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Item from '@Components/list/Item'
import IcnChecked from '@Components/list/check-box-checked-default.svg'
import IcnUnchecked from '@Components/list/check-box-unchecked-default.svg'
import * as font from '@src/assets/styles/font'

const CheckBox = ({
  text, disabled, onChange, formatter, defaultChecked,
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  const newText = formatter ? formatter(text) : text

  const handleOnChange = (evt) => {
    setChecked(evt.target.checked)
    onChange(evt.target.checked)
  }

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  return (
    <Item disabled={disabled}>
      <label>
        <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
        <font.TextOverflow>{newText}</font.TextOverflow>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={handleOnChange} />
      </label>
    </Item>
  );
};

CheckBox.defaultProps = {
  disabled: false,
  onChange: null,
  formatter: null,
  defaultChecked: false,
}

CheckBox.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  defaultChecked: PropTypes.bool,
}

export default CheckBox
