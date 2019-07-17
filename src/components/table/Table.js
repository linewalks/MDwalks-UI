import React from 'react';
import isEmpty from 'lodash/isEmpty';
import THead from './THead';
import TBody from './TBody';
import styles from './Table.css';

const Table = ({ data, isRowLink }) => {
  if(isEmpty(data)) {
    return (
      <div>
        There is no data<br />Please search agains
      </div>
    )
  } else {
    return (
      <table className={styles.table}>
        <THead {...data} />
        <TBody {...data} isRowLink={isRowLink} />
      </table>
    );
  }
};

export default Table;