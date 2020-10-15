import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import backgroundArrow from '@src/assets/svg/icn_chevron_filled_right_16.svg';
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'
import { hexToRGB } from '@Components/button/utility'

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

  &:last-child div {
    background-color: ${(props) => (props.isLastHighlighted ? '#ff4757' : '#002b4f')};
  }
`

const CardContatiner = styled.div`
  display: inline-block;
  border-radius: 25px;
  box-shadow: 0 4px 10px 0 ${hexToRGB(color.$primary_navy, 0.16)};
  background-color: #002b4f;
  padding: 11px 24px 10px;
`

export const Card = styled(font.TextTag).attrs({
  size: '20',
  bold: true,
  style: {
    color: '#ffffff',
  },
})``

const SelectedCard = ({ selectedElement, isLastHighlighted }) => (
  <Wrap1200>
    {
      selectedElement.map((element, idx) => {
        const isLast = idx === selectedElement.length - 1
        return (
          <Arrow
            key={`SelectedCard${element}`}
            isLastHighlighted={isLastHighlighted}
            style={isLast ? null : { backgroundImage: `url(${backgroundArrow})` }}
          >
            <CardContatiner>
              <Card>{element}</Card>
            </CardContatiner>
          </Arrow>
        )
      })
    }
  </Wrap1200>
)

SelectedCard.defaultProps = {
  selectedElement: [],
  isLastHighlighted: false,
}

SelectedCard.propTypes = {
  selectedElement: PropTypes.arrayOf(PropTypes.string),
  isLastHighlighted: PropTypes.bool,
}

export default SelectedCard
