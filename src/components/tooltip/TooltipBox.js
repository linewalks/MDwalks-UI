import React from 'react'
import styled from 'styled-components'
import { color } from '@src/assets/styles/variables'
import * as font from '@src/assets/styles/font'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as commonTag from '@Components/common/cdmCommon'

const Dot = styled(commonTag.Dot).attrs(() => ({
}))`
  position: absolute;
  top: 5px;
  left: 0;
`

const TooltipBoxTag = styled.div`
  width: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 45, 79, 0.2);
  border: solid 1px ${color.$menu_grey};
  background-color: rgba(255, 255, 255, 1);

  padding: 12px 14px;

  li {
    padding-left: 16px;
    position: relative;
    display: flex;

    span:last-child {
      margin-left: auto;
      padding-left: 16px;
    }
  }

  li:not(:last-child) {
    margin-bottom: 8px;
  }
`
const valueConvertText = (value, isPercent = false, showOrigin = false) => {
  if (showOrigin) {
    return value
  }

  let newValue = null

  if (isPercent) {
    return <span style={{ whiteSpace: 'nowrap' }}>{`${(Number(value) * 100).toFixed(2)} %`}</span>
  }

  if (typeof value === 'string' && (value.indexOf('e') !== -1)) {
    newValue = value
  } else {
    newValue = Number(value).toLocaleString()
  }

  return newValue
}

const TooltipBox = ({
  payload, isPercent = false, dataKey = 'value', nameKey = 'name', width,
}) => {
  if (!_.isArray(payload)) return null

  return (
    <TooltipBoxTag style={{ width }}>
      <ul>
        {
          payload.map(({ fill, showOrigin = false, ...props }, i) => {
            const key = `li_${i}`
            return (
              <li key={key}>
                <Dot color={fill} />
                <span>{props[nameKey]}</span>
                <font.TextTag bold>
                  {valueConvertText(props[dataKey], isPercent, showOrigin)}
                </font.TextTag>
              </li>
            )
          })
        }
      </ul>
    </TooltipBoxTag>
  )
}

TooltipBox.defaultProps = {
  payload: {},
  isPercent: false,
  dataKey: 'value',
  nameKey: 'name',
  width: 250,
}

TooltipBox.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  isPercent: PropTypes.bool,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default TooltipBox
