import React from 'react';
import isEmpty from 'lodash/isEmpty';
import THead from './THead';
import TBody from './TBody';
import TFoot from './TFoot';
import styled, { css } from 'styled-components'
import * as variables from '../../assets/styles/variables'

const sideFit = css`
  tbody {
    .td:first-child, .td:last-child {
      white-space: nowrap;
      width: 1%;
    }

    .td:first-child > a > div,
    .td:first-child > div {
      padding-left: 0
    }

    .td:last-child > a > div,
    .td:last-child > div {
      padding-right: 0
    }

    .td:first-child {
      padding-left: 50px;
    }

    .td:last-child {
      padding-right: 50px;
    }
  }

  thead td {
    &:last-child {
      padding-right: 50px;
    }
  }
  thead th {
    &:first-child {
      border-radius: 10px 0 0 0;
    }

    &:last-child {
      border-radius: 0 10px 0 0;
    }

    &:first-child, &:last-child {
      white-space: nowrap;
      width: 1%;
    }

    &:first-child {
      padding-left: 50px;
    }

    &:last-child {
      padding-right: 50px;
    }
  }
`
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  border-bottom: 1px solid ${variables.color.$line_search_grey};

  ${props => props.className.split(' ').includes('sideFit') ? sideFit : null}
`

export default ({ data, wrapTh, wrapTd, appendRow, className = '' }) => {
  if(isEmpty(data)) {
    return (
      <div>
        There is no data<br />Please search agains
      </div>
    )
  } else {
    return (
      <Table className={className}>
        <THead {...data} wrapTh={wrapTh} />
        <TBody {...data} wrapTd={wrapTd} appendRow={appendRow}/>
        <TFoot {...data} />
      </Table>
    );
  }
};