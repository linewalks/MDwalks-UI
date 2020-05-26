import React from 'react'
import styled from 'styled-components'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as commonTag from '@Components/common/commonTag'

const Dot = styled(commonTag.Dot).attrs(() => ({
}))`
  position: absolute;
  top: 3px;
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
    align-items: top;

    span:last-child {
      margin-left: auto;
      padding-left: 16px;
    }
  }

  li:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const valueConvertText = (value, { isPercent, convert }) => {
  if (convert) {
    return convert(value)
  }

  if (isPercent) {
    return <span style={{ whiteSpace: 'nowrap' }}>{`${(Number(value) * 100).toFixed(2)} %`}</span>
  }

  if (_.isString(value)) {
    return value
  }

  return Number(value).toLocaleString()
}

valueConvertText.defaultProps = {
  isPercent: false,
  convert: null,
}

valueConvertText.propTypes = {
  value: PropTypes.number.isRequired,
  isPercent: PropTypes.bool,
  convert: PropTypes.func,
}

const TooltipBox = ({
  payload, dataKey = 'value', nameKey = 'name',
  width, isPercent = false, textMap,
}) => {
  if (!_.isArray(payload)) return null

  return (
    <TooltipBoxTag style={{ width }}>
      <ul>
        {
          payload.map(({ fill, convert, ...props }, i) => {
            const key = `tooltip${i}`
            let label = props[nameKey]

            if (textMap[label]) {
              label = textMap[label]
            }
            return (
              <li key={key}>
                <Dot color={fill} />
                <span>{label}</span>
                <span className={fontStyle.bold}>
                  {valueConvertText(props[dataKey], { isPercent, convert })}
                </span>
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
  dataKey: 'value',
  nameKey: 'name',
  width: 250,
  isPercent: false,
  textMap: {},
}

TooltipBox.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
  // convert: PropTypes.func,
}

export default TooltipBox
