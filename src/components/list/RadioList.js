import React from 'react';
import _ from 'lodash'
import { font } from '@src/index'
import PropTypes from 'prop-types'
import Item from '@Components/list/Item'
import IcnChecked from '@Components/list/radio-button-checked-default.svg'
import IcnUnchecked from '@Components/list/radio-button-unchecked-default.svg'

class RadioList extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props
    // true 가 두개이면 가장 마지막 것을 select 할 까?
    let selectedList = _.chain(data)
      .filter(({ checked }) => checked)
      .map(({ id }) => `${id}`)
      .value()

    if (selectedList.length > 1) {
      selectedList = selectedList.slice(0, 1)
    }

    this.state = {
      selectedList,
    }
  }

  onChangeTrigger(id) {
    const { disabled, onChange } = this.props
    if (disabled) return
    let { selectedList } = this.state

    if (selectedList.includes(`${id}`)) {
      return
    }

    selectedList = [`${id}`]

    this.setState({
      selectedList,
    })

    if (_.isFunction(onChange)) {
      onChange({ selectedList })
    }
  }

  unCheckedById(id) {
    const { onChange } = this.props
    let { selectedList } = this.state
    if (selectedList.includes(`${id}`)) {
      selectedList = _.without(selectedList, `${id}`)
      this.setState({
        selectedList,
      })

      if (_.isFunction(onChange)) {
        onChange({ selectedList })
      }
    }
  }

  render() {
    const { data, disabled, formatter } = this.props
    const { selectedList } = this.state
    return (
      <>
        {
          data.map((item) => {
            const { id, name } = item
            const checked = selectedList.includes(`${id}`)
            const text = formatter ? formatter(item) : name

            return (
              <Item size="16" opacity="6" as="div" key={`checkItem${id}`} disabled={disabled}>
                <label>
                  <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '12px' }} alt="" />
                  <font.TextOverflow>{text}</font.TextOverflow>
                  <input type="checkbox" disabled={disabled} checked={checked} onChange={() => this.onChangeTrigger(id)} />
                  {/* <img src={IcnAddSm} width="24px" height="24px" alt="" /> */}
                </label>
              </Item>
            )
          })
        }
      </>
    )
  }
}

RadioList.defaultProps = {
  disabled: false,
  onChange: null,
  formatter: null,
}

RadioList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
}

export default RadioList
