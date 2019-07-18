import React from 'react';
import isEmpty from 'lodash/isEmpty';
import visualAlert from '../../assets/svg/visual-alert.svg';
import styles from './Table.css'

const TBody = ({headers, rowData, wrapTd}) => {
  const renderPlaceholder = () => {
    return (
      <tr>
        <td colSpan={isEmpty(headers) ? 1 : headers.length}>
          <img src={visualAlert} width="290px" height="230px" />
          <span className="body_r_20">There is no data<br />Please search again</span>
        </td>
      </tr>
    )
  }

  const createBody = rowsData => {
    return rowsData.map((data, idx) => {
      return (
        <tr key={idx} className={styles.tr}>
          {Object.values(data).map((row, idx) => {
            return <td className={styles.td} key={idx}>{
              wrapTd ? wrapTd({data, label: headers[idx], text: row}) : <div>{row}</div>
            }</td>
          })}
        </tr>
      )
    })
  }
  
  return (
    <tbody className={isEmpty(rowData) ? styles.empty_table_grey_list : null}>
      {isEmpty(rowData) ? renderPlaceholder() : createBody(rowData)}
    </tbody>
  )
};

export default TBody;