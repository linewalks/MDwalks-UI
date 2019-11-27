import React from 'react';
import _ from 'lodash'
import { font } from '@src/index'
import PropTypes from 'prop-types'
import Item from '@Components/list/Item'
import IcnChecked from '@Components/list/check-box-checked-default.svg'
import IcnUnchecked from '@Components/list/check-box-unchecked-default.svg'

class CheckList extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props

    const selectedList = _.chain(data)
      .filter(({ checked }) => checked)
      .map(({ id }) => `${id}`)
      .value()

    this.state = {
      selectedList,
    }
  }

  onErrorTrigger() {
    const { onError, limit } = this.props
    if (_.isFunction(onError)) {
      onError({ limit })
    }
  }

  onChangeTrigger(id) {
    const { disabled, limit, onChange } = this.props
    if (disabled) return
    let { selectedList } = this.state

    if (selectedList.includes(`${id}`) === false && this.getCheckCount() >= limit) {
      this.onErrorTrigger()
      return
    }

    if (selectedList.includes(`${id}`)) {
      selectedList = _.without(selectedList, `${id}`)
    } else {
      selectedList.push(`${id}`)
    }

    this.setState({
      selectedList,
    })

    if (_.isFunction(onChange)) {
      onChange({ selectedList })
    }
  }

  getCheckCount() {
    const { selectedList } = this.state
    return _.filter(selectedList).length
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
    const {
      data, disabled, formatter, checkVisible,
    } = this.props
    const { selectedList } = this.state
    return (
      <>
        {
          data.map((item) => {
            const { id, name } = item
            const checked = selectedList.includes(`${id}`)
            const text = formatter ? formatter(item) : name

            if (!checkVisible && checked) return null;
            return (
              <Item size="16" opacity="6" as="div" key={`checkItem${id}`} disabled={disabled}>
                <label>
                  <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '4px' }} alt="" />
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

CheckList.defaultProps = {
  limit: 5,
  disabled: false,
  checkVisible: true,
  onChange: null,
  onError: null,
  formatter: null,
}

CheckList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  checkVisible: PropTypes.bool,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  formatter: PropTypes.func,
}

export default CheckList
