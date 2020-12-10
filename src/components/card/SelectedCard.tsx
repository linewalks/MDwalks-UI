import React from 'react';
import styled from 'styled-components'
import backgroundArrow from '../../assets/svg/icn_chevron_filled_right_16.svg'
import * as font from '../../assets/styles/font'
import { color } from '../../assets/styles/variables'

const Wrap1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

interface ArrowProps {
  isLastHighlighted: boolean;
  style?: object;
}

export const Arrow = styled.article<ArrowProps>`
  display: inline-block;
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: center;
  padding-right: 24px;
  margin-right: 8px;

  &:last-child div {
    background-color: ${(props) => (props.isLastHighlighted ? '#ff4757' : color.$white)};
  }
`

const CardContatiner = styled.div`
  display: inline-block;
  border: 1px solid ${color.$grey05};
  border-radius: 20px;
  background-color: ${color.$white};
  padding: 8px 16px;
`

export const Card = styled(font.TextTag).attrs({
  size: '16',
  bold: true,
  style: {
    color: color.$grey09,
  },
})``

interface SelectedCardProps extends ArrowProps {
  selectedElement: string[];
}

const SelectedCard = ({ selectedElement, isLastHighlighted }: SelectedCardProps) => (
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

export default SelectedCard
