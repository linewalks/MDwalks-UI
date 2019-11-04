import React from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import { font, variables } from '@src/index'

import IcnAddSm from '@Components/list/icn-add-sm.svg'

const Item = styled(font.TextTag).attrs((props = {}) => {
  return {
    size: 16,
    opacity: 8,
  }
})`
  label {
    cursor: pointer;
    display: block;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img {
      margin-left: auto;
      visibility: hidden;
    }
  }
  &:hover {
    background-color: ${variables.color.$secondary_blue};
    label img {
      visibility: visible;
    }
  }
  input {
    display: none;
  }
`

class CheckList extends React.Component {
  constructor(props) {
    super(props)

    let selectedList = _.chain(this.props.data)
      .filter(({ checked }) => checked)
      .map(({ id }) => `${id}`)
      .value()

    this.state = {
      selectedList
    }
  }

  getCheckCount() {
    return _.filter(this.state.selectedList).length
  }

  onErrorTrigger() {
    _.isFunction(this.props.onError) && this.props.onError({limit: this.props.limit})
  }

  onChangeTrigger(id) {
    if (this.props.disabled) return
    let { selectedList } = this.state

    if (selectedList.includes(`${id}`) === false && this.getCheckCount() >= this.props.limit) {
      return this.onErrorTrigger()
    }

    if (selectedList.includes(`${id}`)) {
      selectedList = _.without(selectedList, `${id}`)
    } else {
      selectedList.push(`${id}`)
    }

    this.setState({
      selectedList
    })

    _.isFunction(this.props.onChange) && this.props.onChange({selectedList})
  }

  unCheckedById(id) {
    let { selectedList } = this.state
    if (selectedList.includes(`${id}`)) {
      selectedList = _.without(selectedList, `${id}`)
      this.setState({
        selectedList
      })

      _.isFunction(this.props.onChange) && this.props.onChange({selectedList})
    }
  }

  render() {
    const { data, disabled, checkVisible } = this.props
    const { selectedList } = this.state
    return (
      <React.Fragment>
        {
          data.map(({id, name}) => {

            const checked = selectedList.includes(`${id}`)

            if (!checkVisible && checked) return null;
            return (
              <Item size="16" opacity="6" as="div" key={`checkItem${id}`}>
                <label>
                  <font.TextOverflow>{name}</font.TextOverflow>
                  <input type="checkbox" disabled={disabled} checked={checked} onChange={() => this.onChangeTrigger(id)} />
                  <img src={IcnAddSm} width="24px" height="24px" alt="" />
                </label>
              </Item>
            )
          })
        }
      </React.Fragment>
    )
  }
}

CheckList.defaultProps = {
  limit: 5,
  disabled: false,
  checkVisible: true,
}

export default CheckList

