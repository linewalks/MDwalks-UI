/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Item from '@Components/list/Item'
import * as font from '@src/assets/styles/font'
import IcnChecked from '@src/assets/svg/checkbox/btn_checkbox_checked_24.svg'
import IcnUnchecked from '@src/assets/svg/checkbox/btn_checkbox_unchecked_24.svg'
import IcnCheckedDisabled from '@src/assets/svg/checkbox/btn_checkbox_checked_disabled_24.svg'
import IcnUncheckedDisabled from '@src/assets/svg/checkbox/btn_checkbox_unchecked_disabled_24.svg'

const CheckBox = ({
  text, disabled, onChange, formatter, defaultChecked,
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  const newText = formatter ? formatter(text) : text

  const handleOnChange = (evt) => {
    setChecked(evt.target.checked)
    onChange(evt.target.checked)
  }

  const getCheckIcon = (isDisabled, isChecked) => {
    if (isDisabled) {
      return isChecked ? IcnCheckedDisabled : IcnUncheckedDisabled
    }

    return isChecked ? IcnChecked : IcnUnchecked
  }

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  return (
    <Item disabled={disabled}>
      <label>
        <img src={getCheckIcon(disabled, checked)} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
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
