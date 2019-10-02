import React from 'react';
import styled from 'styled-components'
import backgroundArrow from '../../assets/svg/icn-12-px.svg';
import * as font from '../../assets/styles/font'

const Wrap1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

export const Arrow = styled.article`
  display: inline-block;
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: center;
  padding-right: 18px;
  margin-right: 8px;
`

const CardContatiner = styled.div`
  display: inline-block;
  border-radius: 25px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);
  background-color: #002b4f;
  padding: 11px 24px 10px;
`


const CardContatinerHighlighted = styled.div`
  display: inline-block;
  border-radius: 25px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);
  background-color: #ff4757;
  padding: 11px 24px 10px;
`

export const Card = styled(font.TextTag).attrs({
  size: '20',
  bold: true,
  style: {
    color: '#ffffff'
  }
})``

const SelectedCard = ({ selectedElement }) => {
  return (
    <Wrap1200>
      {selectedElement.map((element, idx) => {
        const isLast = idx === selectedElement.length - 1
        return (
          <Arrow key={`SelectedCard${idx}`} 
           style={isLast ? null : {backgroundImage:`url(${backgroundArrow})`}}>
            {isLast ? 
              <CardContatinerHighlighted>
                <Card>{element}</Card>
              </CardContatinerHighlighted> : 
              <CardContatiner>
                <Card>{element}</Card>
              </CardContatiner>}
            
          </Arrow>
        )
      })}
    </Wrap1200>
  )
}

export default SelectedCard