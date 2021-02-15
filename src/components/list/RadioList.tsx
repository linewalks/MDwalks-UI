/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'
import ChartConfig from '../../helper/ChartConfig'
import fontStyle from '../../assets/styles/font.module.sass'

import IcnChecked from '../../assets/svg/radiobox/btn_radiobutton_checked_24.svg'
import IcnUnchecked from '../../assets/svg/radiobox/btn_radiobutton_unchecked_24.svg'
import IcnCheckedDisabled from '../../assets/svg/radiobox/btn_radiobutton_checked_disabled_24.svg'
import IcnUncheckedDisabled from '../../assets/svg/radiobox/btn_radiobutton_unchecked_disabled_24.svg'

const Outer = styled.section`
  display: flex;
  align-items: center;
`

const autoMargin = {
  center: 'margin: 0 auto',
  left: 'margin-right: auto',
  right: 'margin-left: auto',
}

const Inner = styled.div<{ align: 'center' | 'left' | 'right' }>`
  display: inline-block;
  width: 100%;
  ${({ align }) => autoMargin[align]};
  margin-bottom: -24px;
`

const Box = styled.div<{ layout: 'horizontal' | 'vertical' }>`
  ${(props) => (props.layout === ChartConfig.Layout.HORIZONTAL ? 'display: inline-block' : 'display: block')};
  ${(props) => (props.layout === ChartConfig.Layout.VERTICAL && 'width: inherit;')};
  padding: 12px 24px 12px 16px;
  height: 48px;

  &:hover {
    border-radius: 8px;
    background: ${color.$pmblue02};
  }
`

const Label = styled.label.attrs(() => ({
  className: [fontStyle.fs16, fontStyle.fc_grey09].join(' '),
}))<{ disabled: boolean }>`
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
interface RadioListDataProps {
  id: number | string;
  name: string;
  disabled?: boolean;
}

interface RadioListProps {
  data: RadioListDataProps[];
  selected: number[] | string[];
  disabled: boolean;
  onChange: (id: string) => void;
  formatter?: (item: RadioListDataProps) => string | React.ReactNode;
  align: 'center' | 'left' | 'right';
  layout: 'horizontal' | 'vertical';
}

const RadioList = ({
  data,
  selected,
  disabled,
  onChange,
  formatter,
  align,
  layout,
}: RadioListProps) => {
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

export default RadioList
