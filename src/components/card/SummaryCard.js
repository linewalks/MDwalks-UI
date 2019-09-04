import React from 'react';
import styled from 'styled-components'

const Wrap_1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

const Article = styled.article`
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

  > div {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-position-x: 12px;
    background-position-y: 52px;
  }

  dl {
    width: 100%;
    text-align: right;
    padding-right: 44px;

    margin: 0;
  }

  dt {
    color: rgba(0, 0, 0, 0.4);
  }

  dd {
    display: block;
    margin-inline-start: 40px;
    margin: 0;
  }
`

const Body_b_16 = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const Summary_b_42 = styled.div`
  font-size: 42px;
  font-weight: bold;
  letter-spacing: -0.5px;
  color: #002d4f;
`

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
    <Wrap_1200>
      {summaryData.map(([name, value], idx) => {
        return (
          <Article key={idx}>
            <div>
              <dl>
                <Summary_b_42 as="dd">
                  {value}
                </Summary_b_42>
                <Body_b_16 as="dt">{name}</Body_b_16>
              </dl>
            </div>
          </Article>
        )
      })}
    </Wrap_1200>
  );
};

export default SummaryCard;