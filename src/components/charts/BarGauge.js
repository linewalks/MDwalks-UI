import React from 'react'
import _ from 'lodash'
import styles from '@Charts/BarGauge.module.css'

class BarGauge extends React.Component {
  render() {
    const score = this.props.score

    if (_.inRange(score, 0, 101)) {
      return (
        <div className={styles.gauge_container}>
          <div className={styles.bar_gauge_fill} style={{ width: `${score}%`}}></div>
        </div>
      );
    } else {
      return (
        <div>Invalid Score</div>
      )
    }
  }
}

export default BarGauge;