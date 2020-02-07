import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

const Wrap1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

export const Article = styled.article`
  width: 282px;
  height: 170px;
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);
  background-color: #ffffff;
  font-size: 0;
  display: inline-block;
  text-align: center;
  margin-right: 24px;

  &:last-child {
    margin-right: 0;
  }

  dl {
    width: 100%;
    text-align: right;
    padding-right: 44px;

    margin: 0;
  }
`

export const EventElement = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.onClick ? 'pointer' : '')};
`

const BodyB16 = styled(font.TextTag).attrs({
  size: '16',
  bold: true,
  opacity: 4,
})``

const BodyB42 = styled(font.TextTag).attrs({
  size: '42',
  bold: true,
  style: {
    color: color.$primary_navy,
    display: 'block',
    marginInlineStart: '40px',
    margin: 0,
  },
})``

const SummaryCard = ({ data, events }) => {
  const summaryData = Object.entries(data);
  return (
    <Wrap1200>
      {summaryData.map(([name, value], idx) => {
        const key = `SummaryCard${idx}`
        return (
          <Article key={key}>
            <EventElement onClick={events[name] ? () => { events[name]() } : null}>
              <dl>
                <BodyB42 as="dd">{value}</BodyB42>
                <BodyB16 as="dt">{name}</BodyB16>
              </dl>
            </EventElement>
          </Article>
        )
      })}
    </Wrap1200>
  );
};

SummaryCard.defaultProps = {
  data: {},
  events: {},
}

SummaryCard.propTypes = {
  data: PropTypes.shape({}),
  events: PropTypes.shape({}),
}

export default SummaryCard
