/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import Item from './Item'
import * as font from '@Styles/font'
import IcnChecked from '../../assets/svg/checkbox/btn_checkbox_checked_24.svg'
import IcnUnchecked from '../../assets/svg/checkbox/btn_checkbox_unchecked_24.svg'
import IcnCheckedDisabled from '../../assets/svg/checkbox/btn_checkbox_checked_disabled_24.svg'
import IcnUncheckedDisabled from '../../assets/svg/checkbox/btn_checkbox_unchecked_disabled_24.svg'
import IcnCheckedSm from '../../assets/svg/checkbox/btn_checkbox_checked_16.svg'
import IcnUncheckedSm from '../../assets/svg/checkbox/btn_checkbox_unchecked_16.svg'
import IcnCheckedDisabledSm from '../../assets/svg/checkbox/btn_checkbox_checked_disabled_16.svg'
import IcnUncheckedDisabledSm from '../../assets/svg/checkbox/btn_checkbox_unchecked_disabled_16.svg'

const IcnList = {
  sm: {
    default: {
      checked: IcnCheckedSm,
      unchecked: IcnUncheckedSm,
    },
    disabled: {
      checked: IcnCheckedDisabledSm,
      unchecked: IcnUncheckedDisabledSm,
    },
  },
  md: {
    default: {
      checked: IcnChecked,
      unchecked: IcnUnchecked,
    },
    disabled: {
      checked: IcnCheckedDisabled,
      unchecked: IcnUncheckedDisabled,
    },
  },
}

interface CheckBoxProps {
  text: string;
  disabled: boolean;
  onChange: (e:React.FormEventHandler<HTMLInputElement>) => void;
  formatter: (text:string) => (string | React.ReactNode);
  defaultChecked: boolean;
  size: 'sm' | 'md';
}

const CheckBox = ({
  text,
  disabled,
  onChange,
  formatter,
  defaultChecked,
  size,
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(defaultChecked)
  const newText = formatter ? formatter(text) : text

  const handleOnChange = (evt) => {
    setChecked(evt.target.checked)
    onChange(evt.target.checked)
  }

  const getCheckIcon = (isDisabled, isChecked) => {
    if (isDisabled) {
      return isChecked ? IcnList[size].disabled.checked : IcnList[size].disabled.unchecked
    }

    return isChecked ? IcnList[size].default.checked : IcnList[size].default.unchecked
  }

  const getImgSize = () => (size === 'sm' ? '16px' : '24px')

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  return (
    <Item disabled={disabled}>
      <label>
        <img src={getCheckIcon(disabled, checked)} width={getImgSize()} height={getImgSize()} style={{ borderRadius: '4px' }} alt="" />
        <font.TextOverflow style={{ fontSize: size === 'sm' ? 14 : 16 }}>{newText}</font.TextOverflow>
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
  size: 'md',
}

export default CheckBox
