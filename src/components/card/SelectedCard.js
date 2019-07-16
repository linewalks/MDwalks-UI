import React from 'react';
import styles from './SelectedCard.css';
import backgroundArrow from '../../assets/svg/icn-12-px.svg';

const SelectedCard = ({ selectedElement }) => {
  return (
    <div className={styles.wrap_1200}>
      {selectedElement.map((element, idx) => {
        return (
          <article key={idx} className={styles.arrow} style={idx !== selectedElement.length - 1 ? {backgroundImage:`url(${backgroundArrow})`} : null}>
            <div className={styles.card_contatiner} key={idx}>
              <span className={styles.card} key={idx}>{element}</span>
            </div>
          </article>
        )
      })}
    </div>
  );
};

export default SelectedCard;