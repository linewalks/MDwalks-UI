import React from 'react';
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import fontStyle from '@src/assets/styles/font.module.sass'

import icnMoreModalMdDefault from '@src/assets/svg/icn-more-modal-md-default.svg';

const Wrap1200 = styled.div`
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto
`

const hover = css`
  transition: transform 0.1s ease-in-out;
  &:hover {
    box-shadow: 0 8px 40px 0 rgba(117, 127, 139, 0.2);
    transform: translateY(-4px);
  }
`

export const Article = styled.article`
  width: 282px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(117, 127, 139, 0.36);
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

  ${(props) => {
    if (props.events) return hover
    return null
  }}
`

export const EventElement = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.onClick ? 'pointer' : '')};
`

const DT = styled.dt.attrs(() => ({
  className: [fontStyle.fs16, fontStyle.fc_grey08, fontStyle.bold].join(' '),
}))`
`

const DD = styled.dd.attrs(() => ({
  className: [fontStyle.fs40, fontStyle.fc_grey10, fontStyle.bold].join(' '),
}))`
`

const Icon = styled.img`
  position: absolute;
  right: 8px;
  top: 8px;
`

const SummaryCard = ({ className, data, events }) => {
  const summaryData = Object.entries(data);
  return (
    <Wrap1200>
      {summaryData.map(([name, value], idx) => {
        const key = `SummaryCard${idx}`
        return (
          <Article key={key} className={className} events={events[name]}>
            <EventElement onClick={events[name] ? () => { events[name]() } : null}>
              <dl>
                <DD>{value}</DD>
                <DT>{name}</DT>
              </dl>
              {
                events[name] && (
                  <Icon src={icnMoreModalMdDefault} width="34px" height="34px" alt="open modal" />
                )
              }
            </EventElement>
          </Article>
        )
      })}
    </Wrap1200>
  );
};

SummaryCard.defaultProps = {
  className: '',
  data: {},
  events: {},
}

SummaryCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({}),
  events: PropTypes.shape({}),
}

export default SummaryCard
