import React from 'react';
import isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components'
import { color } from '../../assets/styles/variables'

import { tableHeaderConvert } from '../../helper/chartUtility'

const Cell = css`
  padding: 28px 24px;
  text-align: center;
  background: ${color.$table_grey}
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-family: "Spoqa Han Sans";
  border-bottom: 2px solid ${color.$line_dashboard_edge_grey};
`

const Td = styled.td`
  ${Cell}
  &:last-child {
    padding-right: 50px;
  }
`

const Th = styled.th`
  ${Cell}
  &:first-child {
    border-radius: 10px 0 0 0; 
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }

  &:first-child, &:last-child {
    white-space: nowrap;
    width: 1%;
  }

  &:first-child {
    padding-left: 50px;
  }

  &:last-child {
    padding-right: 50px;
  }
`

const BodyB16 = styled.span`
  font-weight: bold;
  letter-spacing: -0.5px;
`

const THead = ({ headers, wrapTh, subHeaders }) => {
  const createHeader = (headerData, subHeaderData) => {
    if (isEmpty(subHeaderData)) {
      if (isEmpty(headerData)) {
        return (
          <tr>
            <th></th>
          </tr>
        )
      } else {
        return (
          <tr>
            {headerData.map((header, idx) => {
              return (
                <Th key={header}>
                  {wrapTh ? wrapTh({text: tableHeaderConvert(header)}) : <div>{tableHeaderConvert(header)}</div>}
                </Th>
              )
            })}
          </tr>
        )
      }
    } else {
      return (
       <tr>
         {headerData.map((header, idx) => {
            if (idx === 0) {
              return (
                <Th rowSpan={2} key={idx}>
                  {wrapTh ? wrapTh({text: header}) : <div>{header}</div>}
                </Th>
              )
            } else {
              const subHeaderColNum = subHeaders[header].length
              return (
                <Th colSpan={subHeaderColNum} key={idx}>
                  {wrapTh ? wrapTh({text: header}) : <div>{header}</div>}
                </Th>
              )
            }
          })}
       </tr> 
      )
    }
  }

  const createSubHeader = subHeaderData => {
    const subTitleGroup = Object.values(subHeaderData).join().split(',')
    return (
      <tr>
        {subTitleGroup.map((subTitle, idx) => {
          return <Td key={idx}>{subTitle}</Td>
        })}
      </tr>
    )
  }

  return (
    <BodyB16 as="thead">
      {createHeader(headers, subHeaders)}
      {isEmpty(subHeaders) ? null : createSubHeader(subHeaders)}
    </BodyB16>
  )
};

export default THead;