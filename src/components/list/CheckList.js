/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

import Item from '@Components/list/Item'
import IcnChecked from '@Components/list/check-box-checked-default.svg'
import IcnUnchecked from '@Components/list/check-box-unchecked-default.svg'
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

  return (
    <>
      {
        !_.isEmpty(data) && data.map((item) => {
          const { id, name } = item
          const checked = _.includes(selected, id)
          const text = formatter ? formatter(item) : name

          if (!checkVisible && checked) return null;
          return (
            <Item key={`checkItem${id}`} disabled={disabled} layout={layout}>
              <label>
                <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
                <font.TextOverflow>{text}</font.TextOverflow>
                <input type="checkbox" disabled={disabled} checked={checked} onChange={() => handleOnChange(id)} />
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
