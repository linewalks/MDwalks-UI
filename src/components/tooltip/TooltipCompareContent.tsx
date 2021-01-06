import React from 'react'
import _ from 'lodash'
import TooltipBox from './TooltipBox'

interface TooltipCompareContentProps {
  active: boolean;
  payload: any[];
  isPercent: boolean;
  textMap: any;
  dataKey: string;
  nameKey: string;
  colorObject: string[][];
  colorKeyMap: string[];
}

const TooltipCompareContent = ({
  active, payload, dataKey, nameKey,
  isPercent, textMap, colorObject, colorKeyMap,
}: TooltipCompareContentProps) => {
  if (active) {
    const converted = _.map(payload, (e, i) => {
      const index = _.findIndex(colorKeyMap, (name) => (name === e.payload.name))
      const fill = colorObject[index][i]
      return { ...e, fill }
    })

    return (
      <TooltipBox
        payload={converted}
        isPercent={isPercent}
        dataKey={dataKey}
        nameKey={nameKey}
        textMap={textMap}
      />
    )
  }
  return null
}

TooltipCompareContent.displayName = 'TooltipCompareContent'

TooltipCompareContent.defaultProps = {
  active: false,
  payload: [],
  isPercent: false,
  textMap: {},
  dataKey: 'value',
  nameKey: 'name',
  colorObject: [],
  colorKeyMap: [],
}

export default TooltipCompareContent
