import React from 'react';
import THead from './THead';
import TBody from './TBody';
import styles from './Table.css';

const Table = ({ data, isRowLink }) => {
  return (
    <table className={styles.table}>
      <THead {...data} />
      <TBody {...data} isRowLink={isRowLink} />
    </table>
  );
};

export default Table;