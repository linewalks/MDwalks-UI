import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { tableHeaderConvert } from '../../helper/chartUtility';
import styled from 'styled-components'

const Th = styled.th`
  padding: 28px 24px;
  text-align: center;
  background: #f2f2f2;
  border-bottom: 2px solid #d4d4d4;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-family: "Spoqa Han Sans";

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

const THead = ({ headers, subHeaders }) => {
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
                <Th key={header}>{tableHeaderConvert(header)}</Th>
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
                  {header}
                </Th>
              )
            } else {
              const subHeaderColNum = subHeaders[header].length
              return (
                <Th colSpan={subHeaderColNum} key={idx}>
                  {header}
                </Th>
              )
            }
          })}
       </tr> 
      )
    }
  }

  const createSubHeader = subHeaderData => {
    const subTitleGroup = Object.values(subHeaderData)
    .join()
    .split(',')
    return (
      <tr>
        {subTitleGroup.map((subTitle, idx) => {
          return <td key={idx}>{subTitle}</td>
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