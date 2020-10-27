/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as font from '@src/assets/styles/font'
import * as variables from '@src/assets/styles/variables'
import ChartConfig from '@src/helper/ChartConfig'
import fontStyle from '@src/assets/styles/font.module.sass'

import IcnChecked from '@src/assets/svg/radiobox/btn_radiobutton_checked_24.svg'
import IcnUnchecked from '@src/assets/svg/radiobox/btn_radiobutton_unchecked_24.svg'
import IcnCheckedDisabled from '@src/assets/svg/radiobox/btn_radiobutton_checked_disabled_24.svg'
import IcnUncheckedDisabled from '@src/assets/svg/radiobox/btn_radiobutton_unchecked_disabled_24.svg'

const { colorV1 } = variables

const Outer = styled.section`
  display: flex;
  align-items: center;
`

const Inner = styled.div`
  display: inline-block;
  width: 100%;

  ${(props) => (props.align === 'center' ? `margin: 0 auto` : '')}
  ${(props) => (props.align === 'left' ? `margin-right: auto` : '')}
  ${(props) => (props.align === 'right' ? `margin-left: auto` : '')}

  margin-bottom: -24px;
`

const Box = styled.div`
  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? 'display: inline-block' : 'display: block')};
  ${(props) => (props.layout === ChartConfig.Layout.VERTICAL && 'width: inherit;')};
  padding: 12px 24px 12px 16px;
  height: 48px;

  &:hover {
    border-radius: 8px;
    background: ${colorV1.$pmblue02};
  }
`

const Label = styled.label.attrs(() => ({
  className: [fontStyle.fs16, fontStyle.fc_grey09].join(' '),
}))`
  display: flex;
  align-items: center;
  height: 100%;

  span {
    position: relative;
  }

  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
  }
  img {
    margin-right: 12px;
  }

  img:hover:not(:disabled) {
    box-shadow: 0 1px 8px 0 rgba(109, 120, 132, 0.36);
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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

  const getRadioIcon = (isDisabled, isSelected) => {
    if (isDisabled) {
      return isSelected ? IcnCheckedDisabled : IcnUncheckedDisabled
    }

    return isSelected ? IcnChecked : IcnUnchecked
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
                  </span>
                  <img src={getRadioIcon(disabled, checked)} width="24px" height="24px" style={{ borderRadius: '12px' }} alt="" />
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
