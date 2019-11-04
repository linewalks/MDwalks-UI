import React from 'react';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import { tableHeaderConvert } from '@src/helper/chartUtility'

const Td = styled.td.attrs((props = {}) => {
  return {
    size: 16,
    bold: true,
    opacity: 6,
  }
})`
  ${font.Text}
  padding: ${props => props.subHeader ? '28px 24px' : '12px 22px'};
  text-align: center;
  background: ${color.$table_grey};
`

const Th = styled.th.attrs((props = {}) => {
  return {
    size: 16,
    bold: true,
    opacity: 6,
  }
})`
  ${font.Text}
  padding: 28px 24px;
  text-align: center;
  background: ${color.$table_grey};

  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
`

const Thead = styled.thead`
  border-bottom: 2px solid ${color.$line_dashboard_edge_grey};
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
                <Th colSpan={subHeaderColNum} key={idx} subHeader={true}>
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
    <Thead>
      {createHeader(headers, subHeaders)}
      {isEmpty(subHeaders) ? null : createSubHeader(subHeaders)}
    </Thead>
  )
};

export default THead;