import React from 'react'
import styles from './BarGauge.css'

const BarGauge = ({score}) => {
  if (score >= 0 && score <=100) {
    return (
      <div className={styles.gauge_container}>
        <div className={styles.bar_gauge_fill} style={{width: `${score}%`}} />
      </div>
    );
  } else {
    return (
      <div>Invalid Score</div>
    )
  }
};

export default BarGauge;