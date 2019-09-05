import React from 'react';
import styled from 'styled-components'
import backgroundArrow from '../../assets/svg/icn-12-px.svg';

const Wrap_1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

const Arrow = styled.article`
  display: inline-block;
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 15px;
  padding-right: 18px;
  margin-right: 8px;
`

const Card_contatiner = styled.div`
  display: inline-block;
  border-radius: 25px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);
  background-color: #002b4f;
  padding: 11px 24px 10px;
`

const Card = styled.span`
  color: #ffffff;
  line-height: 1;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const styles = {

}

const SelectedCard = ({ selectedElement }) => {
  return (
    <Wrap_1200>
      {selectedElement.map((element, idx) => {
        return (
          <Arrow key={idx} style={idx !== selectedElement.length - 1 ? {backgroundImage:`url(${backgroundArrow})`} : null}>
            <Card_contatiner key={idx}>
              <Card className={styles.card} key={idx}>{element}</Card>
            </Card_contatiner>
          </Arrow>
        )
      })}
    </Wrap_1200>
  );
};

export default SelectedCard;