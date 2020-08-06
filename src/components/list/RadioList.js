/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as font from '@src/assets/styles/font'
import ChartConfig from '@src/helper/ChartConfig'
import fontStyle from '@src/assets/styles/font.module.sass'

import IcnChecked from '@Components/list/radio-button-checked-default.svg'
import IcnUnchecked from '@Components/list/radio-button-unchecked-default.svg'

const Outer = styled.section`
  display: flex;
  align-items: center;
`

const Inner = styled.div`
  display: inline-block;

  ${(props) => (props.align === 'center' ? `margin: 0 auto` : '')}
  ${(props) => (props.align === 'left' ? `margin-right: auto` : '')}
  ${(props) => (props.align === 'right' ? `margin-left: auto` : '')}

  margin-bottom: -24px;
`

const Box = styled.div`
  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? ' display: inline-block' : 'display: block')};
  margin-bottom: 24px;

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

const RadioList = ({
  data,
  selected,
  disabled,
  onChange,
  formatter,
  align,
  layout,
}) => {
  const onChangeTrigger = (id) => {
    if (disabled) return
    if (_.isEqual(id, selected)) return
    onChange(id)
  }

  return (
    <Outer>
      <Inner align={align}>
        {
          data.map((item) => {
            const { id, name } = item
            const checked = _.isEqual(id, selected)
            const text = formatter ? formatter(item) : name

            const itemDisabled = disabled || (item.disabled === true)

            return (
              <Box key={`${name}${id}`} layout={layout}>
                <Label disabled={itemDisabled}>
                  <span>
                    <input type="radio" disabled={itemDisabled} checked={checked} onChange={() => onChangeTrigger(id)} />
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

RadioList.defaultProps = {
  selected: null,
  disabled: false,
  onChange: () => {},
  formatter: null,
  align: 'center',
  layout: ChartConfig.Layout.VERTICAL,
}

RadioList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  layout: PropTypes.string,
}

export default RadioList
