/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import * as font from '@src/assets/styles/font'
import PropTypes from 'prop-types'
import Item from '@Components/list/Item'
import IcnChecked from '@Components/list/check-box-checked-default.svg'
import IcnUnchecked from '@Components/list/check-box-unchecked-default.svg'
import ChartConfig from '@src/helper/ChartConfig'

const getSelectedListByChecked = (data) => _.chain(data)
  .filter(({ checked }) => checked)
  .map(({ id }) => `${id}`)
  .value()

const CheckList = ({
  data,
  layout,
  disabled,
  checkVisible,
  limit,
  onChange,
  onError,
  formatter,
}) => {
  const [selectedList, setSelectedList] = useState(getSelectedListByChecked(data))

  useEffect(() => {
    setSelectedList(getSelectedListByChecked(data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onErrorTrigger = () => {
    if (_.isFunction(onError)) {
      onError({ limit })
    }
  }

  const onChangeTrigger = (id) => {
    if (disabled) return

    if (selectedList.includes(`${id}`) === false && selectedList.length >= limit) {
      onErrorTrigger()
      return
    }

    let newSelectedList = [...selectedList]
    if (newSelectedList.includes(`${id}`)) {
      newSelectedList = _.without(newSelectedList, `${id}`)
    } else {
      newSelectedList.push(`${id}`)
    }

    setSelectedList(newSelectedList)

    if (_.isFunction(onChange)) {
      onChange({ newSelectedList })
    }
  }

  return (
    <>
      {
        data.map((item) => {
          const { id, name } = item
          const checked = selectedList.includes(`${id}`)
          const text = formatter ? formatter(item) : name

          if (!checkVisible && checked) return null;
          return (
            <Item key={`checkItem${id}`} disabled={disabled} layout={layout}>
              <label>
                <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
                <font.TextOverflow>{text}</font.TextOverflow>
                <input type="checkbox" disabled={disabled} checked={checked} onChange={() => onChangeTrigger(id)} />
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
  layout: ChartConfig.Layout.propTypes,
  disabled: PropTypes.bool,
  checkVisible: PropTypes.bool,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  formatter: PropTypes.func,
}

export default CheckList
