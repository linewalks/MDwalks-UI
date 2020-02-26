import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

import styles from '@Charts/BarGauge.module.css'

const BarGauge = ({ score }) => {
  if (_.inRange(score, 0, 101)) {
    return (
      <div className={styles.gauge_container}>
        <div className={styles.bar_gauge_fill} style={{ width: `${score}%` }} />
      </div>
    )
  }

  return (
    <div>Invalid Score</div>
  )
}

BarGauge.defaultProps = {
}

BarGauge.propTypes = {
  score: PropTypes.number.isRequired,
}

export default BarGauge
