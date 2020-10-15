/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Item from '@Components/list/Item'
import IcnChecked from '@src/assets/svg/checkbox/btn_checkbox_checked_24.svg'
import IcnUnchecked from '@src/assets/svg/checkbox/btn_checkbox_unchecked_24.svg'
import IcnCheckedDisabled from '@src/assets/svg/checkbox/btn_checkbox_checked_disabled_24.svg'
import IcnUncheckedDisabled from '@src/assets/svg/checkbox/btn_checkbox_unchecked_disabled_24.svg'
import ChartConfig from '@src/helper/ChartConfig'
import * as font from '@src/assets/styles/font'

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
}) => {
  const handleOnChange = (id) => {
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
      return isChecked ? IcnCheckedDisabled : IcnUncheckedDisabled
    }

    return isChecked ? IcnChecked : IcnUnchecked
  }

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
                <img src={getCheckIcon(isDisabled, checked)} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
                <font.TextOverflow>{text}</font.TextOverflow>
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
}

CheckList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  layout: PropTypes.string,
  disabled: PropTypes.bool,
  checkVisible: PropTypes.bool,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  formatter: PropTypes.func,
}

export default CheckList
