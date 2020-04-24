/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import _ from 'lodash'
import * as font from '@src/assets/styles/font'
import PropTypes from 'prop-types'
import IcnChecked from '@Components/list/radio-button-checked-default.svg'
import IcnUnchecked from '@Components/list/radio-button-unchecked-default.svg'
import styled from 'styled-components'
import fontStyle from '@src/assets/styles/font.module.sass'

const Outer = styled.section`
  display: flex;
  align-items: center;
`

const Inner = styled.div`
  display: inline-block;

  ${(props) => (props.align === 'center' ? `margin: 0 auto` : '')}
  ${(props) => (props.align === 'left' ? `margin-right: auto` : '')}
  ${(props) => (props.align === 'right' ? `margin-left: auto` : '')}
`

const Box = styled.div`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 24px;
  }
`

const Label = styled.label.attrs(() => ({
  className: [fontStyle.fs16, fontStyle.fc_grey09, fontStyle.bold].join(' '),
}))`
  display: flex;
  align-items: center;

  span {
    position: relative;
    font-size: 0;
  }
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
  }
  img {
    margin-right: 12px;
  }
  cursor: pointer;
  ${(props) => (props.disabled ? 'cursor: not-allowed;' : '')}
`

class RadioBox extends React.Component {
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

  onChange({ selectedList }) {
    const { data, onChange } = this.props
    const targetId = _.first(selectedList)
    const target = _.find(data, (obj) => (String(obj.id) === targetId))

    onChange(_.extend({ id: '', name: '' }, target))
  }

  onChangeTrigger(id) {
    const { disabled } = this.props
    if (disabled) return
    let { selectedList } = this.state

    if (selectedList.includes(`${id}`)) {
      return
    }

    selectedList = [`${id}`]

    this.setState({
      selectedList,
    })

    this.onChange({ selectedList })
  }

  unCheckedAll() {
    const selectedList = []
    this.setState({
      selectedList,
    })

    this.onChange({ selectedList })
  }

  // unCheckedById(id) {
  //   let { selectedList } = this.state
  //   if (selectedList.includes(`${id}`)) {
  //     selectedList = _.without(selectedList, `${id}`)
  //     this.setState({
  //       selectedList,
  //     })

  //     this.onChange({ selectedList })
  //   }
  // }

  render() {
    const {
      data,
      disabled,
      formatter,
      align,
    } = this.props
    const { selectedList } = this.state
    return (
      <Outer>
        <Inner align={align}>
          {
            data.map((item) => {
              const { id, name } = item
              const checked = selectedList.includes(`${id}`)
              const text = formatter ? formatter(item) : name

              const itemDisabled = disabled || (item.disabled === true)

              return (
                <Box key={`${name}${id}`}>
                  <Label disabled={itemDisabled}>
                    <span>
                      <input type="radio" disabled={itemDisabled} checked={checked} onChange={() => this.onChangeTrigger(id)} />
                      <img src={checked ? IcnChecked : IcnUnchecked} width="24px" height="24px" style={{ borderRadius: '12px' }} alt="" />
                    </span>
                    <font.TextOverflow>{text}</font.TextOverflow>
                  </Label>
                </Box>
              )
            })
          }
        </Inner>
      </Outer>
    )
  }
}

RadioBox.defaultProps = {
  disabled: false,
  onChange: () => {},
  formatter: null,
  align: 'center',
}

RadioBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  align: PropTypes.oneOf(['center', 'left', 'right']),
}

export default RadioBox
