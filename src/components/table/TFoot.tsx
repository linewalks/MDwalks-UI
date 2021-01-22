import React from 'react';
import _ from 'lodash';
import styled from 'styled-components'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'
import { tableSize } from '../../assets/styles/tableProperties'

interface ISize {
  size: 'small' | 'medium';
}

const TFootTag = styled.tfoot.attrs(({ size }:ISize) => ({
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

interface TFootProps extends ISize {
  footData: any[];
}

interface IRow {
  colSpan?: number;
  text?: string;
}

const TFoot = ({ footData, size }:TFootProps) => {
  const createFooter = () => (
    _.map(footData, (data, i) => {
      const trKey = `footer${data.join(' ')}${i}`
      return (
        <tr key={trKey}>
          {
            _.map(data, (row:IRow, j) => {
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

export default TFoot
