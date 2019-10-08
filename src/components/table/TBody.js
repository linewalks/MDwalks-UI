import React from 'react';
import isEmpty from 'lodash/isEmpty';
import visualAlert from '../../assets/svg/visual-alert.svg';
import styled from 'styled-components'
import { color } from '../../assets/styles/variables'

const ListTBody = styled.tbody`
  .tr {
    cursor: pointer;
  }

  .tr:nth-child(even) .td {
    background: ${color.$primary_white};
  }

  .tr:nth-child(odd) .td {
    background: ${color.$table_cell_grey};;
  }

  /* after the first non-.parent, toggle colors */
  tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: ${color.$primary_white};
  }
  tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: ${color.$table_cell_grey};;
  }

  /* after the second non-.parent, toggle again */
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: ${color.$table_cell_grey};;
  }
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: ${color.$primary_white};
  }

  .td {
    text-align: center;
    font-size: 18px;
    font-family: "Spoqa Han Sans";
  }

  .td:first-child, .td:last-child {
    white-space: nowrap;
    width: 1%;
  }

  .td > a > div, .td > div {
    padding: 24px;
  }

  .td:first-child > a > div,
  .td:first-child > div {
    padding-left: 0
  }

  .td:last-child > a > div,
  .td:last-child > div {
    padding-right: 0
  }

  .td:first-child {
    padding-left: 50px;
  }

  .td:last-child {
    padding-right: 50px;
  }
`

const EmptyTbody = styled.tbody`
  td {
    padding: 80px;
    margin: 0 auto;
    text-align: center;
    font-family: "Spoqa Han Sans";
  }
`
const BodyR20 = styled.span`
  font-size: 20px;
  margin: auto;
  color: #161616;
  display: block;
  font-size: 20px;
  opacity: 0.6;
  font-family: "Spoqa Han Sans";
`

const TBody = ({headers, rowData, wrapTd, appendRow}) => {
  const renderPlaceholder = () => {
    return (
      <tr>
        <td colSpan={isEmpty(headers) ? 1 : headers.length}>
          <img src={visualAlert} width="290px" height="230px" />
          <BodyR20 as="span">There is no data<br />Please search again</BodyR20>
        </td>
      </tr>
    )
  }

  const createBody = rowsData => {
    return rowsData.map((data, idx) => {
      return [
        <tr key={idx} className={"tr"}>
          {Object.values(data).map((row, idx) => {
            return <td className={"td"} key={idx}>{
              wrapTd ? wrapTd({data, label: headers[idx], text: row}) : <div>{row}</div>
            }</td>
          })}
        </tr>,
        appendRow ? appendRow(data, idx) : null
      ]
    })
  }
  
  return (
    isEmpty(rowData)
    ? <EmptyTbody>{ renderPlaceholder() }</EmptyTbody>
    : <ListTBody>{ createBody(rowData) }</ListTBody>
  )
};

export default TBody;