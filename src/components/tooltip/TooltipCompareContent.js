import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

import TooltipBox from '@Components/tooltip/TooltipBox'

const TooltipCompareContent = ({
  active, payload, dataKey, nameKey,
  isPercent, textMap, colorObject, colorKeyMap,
}) => {
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

TooltipCompareContent.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  isPercent: PropTypes.bool,
  textMap: PropTypes.shape({}),
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  colorObject: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  colorKeyMap: PropTypes.arrayOf(PropTypes.string),
}

export default TooltipCompareContent
