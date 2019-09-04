import React from 'react';
import isEmpty from 'lodash/isEmpty';
import THead from './THead';
import TBody from './TBody';
import styled from 'styled-components'

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`

export default ({ data, wrapTh, wrapTd, appendRow }) => {
  if(isEmpty(data)) {
    return (
      <div>
        There is no data<br />Please search agains
      </div>
    )
  } else {
    return (
      <Table>
        <THead {...data} wrapTh={wrapTh} />
        <TBody {...data} wrapTd={wrapTd} appendRow={appendRow}/>
      </Table>
    );
  }
};