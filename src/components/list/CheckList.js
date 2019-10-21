import React, { useState, Component } from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import { Heading, font, variables, Button, ButtonLink, Modal } from '../../index'

import IcnAddSm from './icn-add-sm.svg'

const Item = styled(font.TextTag).attrs((props = {}) => {
  return {
    size: 16,
    opacity: 8,
  }
})`
  &:hover {
    background-color: ${variables.color.$secondary_blue};
  }

  label {
    cursor: pointer;
    display: block;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img {
      margin-left: auto;
    }
  }
  input {
    display: none;
  }
`

class CheckList extends React.Component {
  constructor(props) {
    super(props)

    let checkState = {}
    this.props.data.forEach((value) => {
      checkState[value.id] = !!value.checked
    })

    this.state = {
      checkState
    }
  }

  getCheckCount() {
    return _.filter(this.state.checkState).length
  }

  onErrorTrigger() {
    _.isFunction(this.props.onError) && this.props.onError({limit: this.props.limit})
  }

  onChangeTrigger(id) {
    if (this.props.disabled) return
    let checkState = this.state.checkState

    if (checkState[id] === false && this.getCheckCount() >= this.props.limit) {
      return this.onErrorTrigger()
    }

    checkState[id] = !checkState[id]

    this.setState({
      checkState      
    })

    _.isFunction(this.props.onChange) && this.props.onChange(checkState)
  }

  unCheckedById(id) {
    let checkState = this.state.checkState
    if (true == checkState[id]) {
      checkState[id] = false
      this.setState({
        checkState
      })

      _.isFunction(this.props.onChange) && this.props.onChange(checkState)
    }
  }

  render() {
    const { data, disabled, checkVisible } = this.props
    const { checkState } = this.state
    return (
      <React.Fragment>
        {
          data.map(({id, name, checked}) => {
            if (!checkVisible && true == checkState[id]) return null;
            return (
              <Item size="16" opacity="6" as="div" key={`checkItem${id}`}>
                <label>
                  {name}
                  <input type="checkbox" disabled={disabled} checked={checkState[id]} onChange={() => this.onChangeTrigger(id)} />
                  <img src={IcnAddSm} width="24px" height="25px" />
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

