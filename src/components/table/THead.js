import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { tableHeaderConvert } from '../../helper/chartUtility';
import styles from './Table.css'

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
                <th key={header} className={styles.th}>{tableHeaderConvert(header)}</th>
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
                <th rowSpan={2} key={idx}  className={styles.th}>
                  {header}
                </th>
              )
            } else {
              const subHeaderColNum = subHeaders[header].length
              return (
                <th colSpan={subHeaderColNum} key={idx}  className={styles.th}>
                  {header}
                </th>
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
    <thead className={styles.body_b_16}>
      {createHeader(headers, subHeaders)}
      {isEmpty(subHeaders) ? null : createSubHeader(subHeaders)}
    </thead>
  )
};

export default THead;