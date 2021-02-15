/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import Item from './Item'
import IcnChecked from '../../assets/svg/checkbox/btn_checkbox_checked_24.svg'
import IcnUnchecked from '../../assets/svg/checkbox/btn_checkbox_unchecked_24.svg'
import IcnCheckedDisabled from '../../assets/svg/checkbox/btn_checkbox_checked_disabled_24.svg'
import IcnUncheckedDisabled from '../../assets/svg/checkbox/btn_checkbox_unchecked_disabled_24.svg'
import IcnCheckedSm from '../../assets/svg/checkbox/btn_checkbox_checked_16.svg'
import IcnUncheckedSm from '../../assets/svg/checkbox/btn_checkbox_unchecked_16.svg'
import IcnCheckedDisabledSm from '../../assets/svg/checkbox/btn_checkbox_checked_disabled_16.svg'
import IcnUncheckedDisabledSm from '../../assets/svg/checkbox/btn_checkbox_unchecked_disabled_16.svg'
import ChartConfig from '../../helper/ChartConfig'
import * as font from '../../assets/styles/font'

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

interface CheckListDataProps {
  id: number;
  name: string;
  disabled?: boolean;
}

interface CheckListProps {
  data: CheckListDataProps[];
  selected: number[];
  layout: 'horizontal' | 'vertical';
  disabled: boolean;
  checkVisible: boolean;
  limit: number;
  onChange: (id: number, selectedList: number[]) => void;
  onError: () => void;
  formatter: (string) => (string | React.ReactNode);
  size: 'sm' | 'md';
}

const CheckList = ({
  data,
  selected,
  layout,
  disabled,
  checkVisible,
  limit,
  onChange,
  onError,
  formatter,
  size,
}: CheckListProps) => {
  const handleOnChange = (id: number) => {
    if (disabled) return
    if (_.find(data, (item) => item.id === id).disabled) return
    if (!_.includes(selected, id) && selected.length >= limit) {
      if (_.isFunction(onError)) {
        onError({ limit })
      }
      return
    }

    const newSelected = [...selected]
    if (!selected.includes(id)) {
      onChange(id, [...newSelected, id])
    } else {
      onChange(id, _.without(newSelected, id))
    }
  }

  const getCheckIcon = (isDisabled, isChecked) => {
    if (isDisabled) {
      return isChecked ? IcnList[size].disabled.checked : IcnList[size].disabled.unchecked
    }

    return isChecked ? IcnList[size].default.checked : IcnList[size].default.unchecked
  }

  const getImgSize = () => (size === 'sm' ? '16px' : '24px')

  return (
    <>
      {
        !_.isEmpty(data) && data.map((item) => {
          const { id, name } = item
          const checked = _.includes(selected, id)
          const text = formatter ? formatter(item) : name
          const isDisabled = item.disabled || false

          if (!checkVisible && checked) return null
          return (
            <Item key={`checkItem${id}`} disabled={disabled || isDisabled} layout={layout}>
              <label>
                <img src={getCheckIcon(isDisabled, checked)} width={getImgSize()} height={getImgSize()} style={{ borderRadius: '4px' }} alt="" />
                <font.TextOverflow style={{ fontSize: size === 'sm' ? 14 : 16 }}>{text}</font.TextOverflow>
                <input type="checkbox" disabled={disabled || isDisabled} checked={checked} onChange={() => handleOnChange(id)} />
              </label>
            </Item>
          )
        })
      }
    </>
  )
}

CheckList.defaultProps = {
  layout: ChartConfig.Layout.VERTICAL,
  limit: 5,
  disabled: false,
  checkVisible: true,
  onChange: null,
  onError: null,
  formatter: null,
  size: 'md',
}

export default CheckList
