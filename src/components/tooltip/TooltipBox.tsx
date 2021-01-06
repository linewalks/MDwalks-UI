import React from 'react'
import styled from 'styled-components'
import fontStyle from '../../assets/styles/font.module.sass'
import { color } from '../../assets/styles/variables'
import _ from 'lodash'
import * as commonTag from '../common/commonTag'

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
  border: solid 1px ${color.$grey08};
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

interface IConvertUtil {
  isPercent: boolean;
  convert: (value: number) => string;
}

export const valueConvertText = (value: number, { isPercent, convert }: IConvertUtil): string | React.ReactNode=> {
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

interface TooltipBoxProps {
  payload: { [key: string]: any; }[];
  dataKey: string;
  nameKey: string;
  width: string | number;
  isPercent: boolean;
  textMap: any;
}

const TooltipBox = ({
  payload, dataKey = 'value', nameKey = 'name',
  width, isPercent = false, textMap,
}: TooltipBoxProps) => {
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

export default TooltipBox
