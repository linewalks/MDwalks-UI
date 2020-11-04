import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'
import { tableSize } from '@src/assets/styles/tableProperties'

const TFootTag = styled.tfoot.attrs(({ size }) => ({
  ...tableSize[size].tfoot,
}))`
  td {
    ${font.Text}
    ${(({ padding }) => `padding: ${padding};`)}

    text-align: center;
    font-family: "Spoqa Han Sans";
  }
  tr {
    border-top: 1px solid ${color.$grey04};
  }
  tr:first-child {
    border-top: 1px solid ${color.$grey06};
  }
`

const TFoot = ({ footData, size }) => {
  const createFooter = () => (
    _.map(footData, (data, i) => {
      const trKey = `footer${data.join(' ')}${i}`
      return (
        <tr key={trKey}>
          {
            _.map(data, (row, j) => {
              let colSpan
              const text = _.isObject(row) ? row.text : row
              const tdKey = `footeritem${text}${j}`

              if (row.colSpan) {
                colSpan = row.colSpan
              }

              return (
                <td key={tdKey} colSpan={colSpan}>{text}</td>
              )
            })
          }
        </tr>
      )
    })
  )

  return (
    <>
      {_.isEmpty(footData) ? null : <TFootTag size={size}>{createFooter()}</TFootTag>}
    </>
  )
};

TFoot.defaultProps = {
  footData: undefined,
  size: 'medium',
}

TFoot.propTypes = {
  footData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
  ),
  size: PropTypes.string,
}

export default TFoot
