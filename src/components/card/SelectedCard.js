import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import backgroundArrow from '@src/assets/svg/icn_chevron_filled_right_16.svg';
import * as font from '@src/assets/styles/font'
import { color, colorV1 } from '@src/assets/styles/variables'

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
  padding-right: 24px;
  margin-right: 8px;

  &:last-child div {
    background-color: ${(props) => (props.isLastHighlighted ? '#ff4757' : color.$primary_white)};
  }
`

const CardContatiner = styled.div`
  display: inline-block;
  border: 1px solid ${colorV1.$grey05};
  border-radius: 20px;
  background-color: ${color.$primary_white};
  padding: 8px 16px;
`

export const Card = styled(font.TextTag).attrs({
  size: '16',
  bold: true,
  style: {
    color: colorV1.$grey09,
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
