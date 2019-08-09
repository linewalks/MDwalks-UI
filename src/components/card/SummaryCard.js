import React from 'react';
import styles from './SummaryCard.css';

const SummaryCard = ({data}) => {
  let summaryData = Object.entries(data);
  
  if (summaryData.length === 0) {
    summaryData = [{
      "Event Occurrence": 0,
      "Number of Patients": 0,
      "Average Mortality Rate": 0.0,
      "Average Length of Stay": 0
    }]
  }

  return (
    <div className={styles.wrap_1200}>
      {summaryData.map(([name, value], idx) => {
        return (
          <article key={idx} className={styles.article}>
            <div>
              <dl>
                <dd className={styles.summary_b_42}>
                  {value}
                </dd>
                <dt className={styles.body_b_16}>{name}</dt>
              </dl>
            </div>
          </article>
        )
      })}
    </div>
  );
};

export default SummaryCard;