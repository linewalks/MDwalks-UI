import React from 'react';
import _ from 'lodash'
import visualAlert from '@src/assets/svg/visual-alert.svg';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

// .td 가 존재하는 이유는 appendRow 에 스타일을 적용하지 않기 위해서 이다
const ListTBody = styled.tbody.attrs((props = {}) => {
  return {
    size: 18,
    opacity: 8,
  }
})`
  .tr:nth-child(even) .td, .even {
    background: ${color.$table_cell_grey};
  }

  .tr:nth-child(odd) .td, .odd {
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
const EmptyText = styled.span.attrs((props = {}) => {
  return {
    size: 16,
    opacity: 6,
  }
})`
  ${font.Text}
  margin: auto;
  display: block;
`

const TBody = ({headers, rowData, wrapTd, appendRow}) => {
  const renderEmpty = () => {
    return (
      <tr>
        <td colSpan={_.isEmpty(headers) ? 1 : headers.length}>
          <img src={visualAlert} width="290px" height="230px" alt="" />
          <EmptyText as="span">There is no data<br />Please search again</EmptyText>
        </td>
      </tr>
    )
  }

  const createBody = rowsData => {
    return rowsData.map((data, idx) => {
      return [
        <tr key={idx} className={"tr"}>
          {Object.values(data).map((row, idx) => {
            let { rowSpan, className } = row
            const props = {
              key: idx,
              rowSpan,
              className: `td ${className}`
            }
            row = _.isObject(row) ? row.text : row
            return <td {...props}>{
              wrapTd ? wrapTd({data, label: headers[idx], text: row}) : <div>{row}</div>
            }</td>
          })}
        </tr>,
        appendRow ? appendRow(data, idx) : null
      ]
    })
  }
  
  return (
    _.isEmpty(rowData)
    ? <EmptyTbody>{ renderEmpty() }</EmptyTbody>
    : <ListTBody>{ createBody(rowData) }</ListTBody>
  )
};

export default TBody;