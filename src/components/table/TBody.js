import React from 'react';
import isEmpty from 'lodash/isEmpty';
import visualAlert from '../../assets/svg/visual-alert.svg';
import styled from 'styled-components'

const BodyR20 = styled.span`
  font-size: 20px;
`

const ListTBody = styled.tbody`
  .tr {
    cursor: pointer;
  }

  .tr:nth-child(even) .td {
    background: #ffffff;
  }

  .tr:nth-child(odd) .td {
    background: #fafafa;
  }

  /* after the first non-.parent, toggle colors */
  tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: #ffffff;
  }
  tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: #fafafa;
  }

  /* after the second non-.parent, toggle again */
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(odd) td {
      background-color: #fafafa;
  }
  tr:not(.tr) ~ tr:not(.tr) ~ .tr:nth-child(even) td {
      background-color: #ffffff;
  }

  .td {
    text-align: center;
    font-size: 18px;
    font-family: "Spoqa Han Sans";
  }

  .td > a > div, .td > div {
    padding: 24px;
  }

  .td:first-child, .td:last-child {
    white-space: nowrap;
    width: 1%;
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

  span {
    margin: auto;
    color: #161616;
    display: block;
    font-size: 20px;
    opacity: 0.6;
    font-family: "Spoqa Han Sans";
  }
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