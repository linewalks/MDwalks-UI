import React from 'react';
import isEmpty from 'lodash/isEmpty';
import visualAlert from '../../assets/svg/visual-alert.svg';
import styles from './Table.css'

const TBody = ({headers, rowData, isRowLink}) => {
  const renderPlaceholder = () => {
    return (
      <tr>
        <td colSpan={headers.length}>
          <img src={visualAlert} width="290px" height="230px" />
          <span className="body_r_20">There is no data<br />Please search again</span>
        </td>
      </tr>
    )
  }

  const goDetail = id => {
    window.location.href = `id/${id}`
  }

  const createBody = rowsData => {
    return rowsData.map((data, idx) => {
      return (
        <tr key={idx} className={styles.tr} onClick={isRowLink ? () => goDetail(data.subject_id) : null}>
          {Object.values(data).map((row, idx) => {
            // if (data.hasOwnProperty('risk_score') && idx === 2) {
            //   row = <BarGauge score={(row * 100).toFixed(2)} />
            // }

            if (row.match && row.match(/\d{4}-/)) {
              let d = new Date(row)
              row = `${d.getFullYear()}-${('0' + (d.getMonth() +1)).slice(-2)}-${('0' + d.getDate()).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
            }

            return <td className={styles.td} key={idx}>{row}</td>
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