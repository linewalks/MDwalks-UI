import React from 'react';
import _ from 'lodash'
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'
import EmptyPlaceHolder from './EmptyPlaceHolder'

// .td 가 존재하는 이유는 appendRow 에 스타일을 적용하지 않기 위해서 이다
const ListTBody = styled.tbody.attrs((props = {}) => {
  return {
    size: 18,
    opacity: 8,
  }
})`
  .tr:nth-child(even) .td {
    background: ${color.$table_cell_grey};
  }

  .tr:nth-child(odd) .td {
    background: ${color.$primary_white};
  }

  .tr .td.even {
    background: ${color.$table_cell_grey};
  }

  .tr .td.odd {
    background: ${color.$primary_white};
  }

  /* after the first non-.parent, toggle colors */
  tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: ${color.$table_cell_grey};
  }
  tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: ${color.$primary_white};
  }

  /* after the second non-.parent, toggle again */
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: ${color.$primary_white};
  }
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: ${color.$table_cell_grey};
  }

  .td {
    ${font.Text}
    text-align: center;
  }

  .td > a > div, .td > div {
    padding: 24px;
  }
`

const EmptyTbody = styled.tbody`
  td {
    padding: 68px;
    text-align: center;
  }
`

const TBody = ({headers, subHeaders = {}, rowData, wrapTd, appendRow, rowSpanCount = 0}) => {
  let singlevelHeader = headers

  if (subHeaders && wrapTd) {
    singlevelHeader = _.map(singlevelHeader, (header) => {
      if (subHeaders[header]) {
        return _.map(subHeaders[header], (text) => `${header}-${text}`)
      }
      return header
    })

    singlevelHeader = _.flatten(singlevelHeader)
  }

  const createBody = rowsData => {
    return rowsData.map((data, idx) => {
      return [
        <tr key={idx} className={"tr"}>
          {_.chain(Object.values(data)).reverse().map((row, idx) => {
            if (_.isUndefined(row) || _.isNull(row)) {
              row = ''
            }
            let { rowSpan, className = '' } = row
            idx = singlevelHeader.length - idx - 1

            let text = !_.isUndefined(rowSpan) ? row.text : row

            let props = {
              key: idx,
              className: `td ${className}`
            }

            if (rowSpan) {
              props.rowSpan = rowSpan
            }

            return <td {...props}>{
              wrapTd ? wrapTd({data, label: singlevelHeader[idx], text, idx}) : <div>{text}</div>
            }</td>
          }).reverse().value()}
        </tr>,
        appendRow ? appendRow(data, idx) : null
      ]
    })
  }
  
  return (
    _.isEmpty(rowData)
    ? (
      <EmptyTbody>
        <tr>
          <td colSpan={_.isEmpty(headers) ? 1 : headers.length}>
            <EmptyPlaceHolder />
          </td>
        </tr>
      </EmptyTbody>
    ) : <ListTBody>{ createBody(rowData) }</ListTBody>
  )
};

export default TBody;