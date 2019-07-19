import React from 'react';
import isEmpty from 'lodash/isEmpty';
import THead from './THead';
import TBody from './TBody';
import styles from './Table.css';

const Table = ({ data, wrapTh, wrapTd }) => {
  if(isEmpty(data)) {
    return (
      <div>
        There is no data<br />Please search agains
      </div>
    )
  } else {
    return (
      <table className={styles.table}>
        <THead {...data} wrapTh={wrapTh} />
        <TBody {...data} wrapTd={wrapTd} />
      </table>
    );
  }
};

export default Table;