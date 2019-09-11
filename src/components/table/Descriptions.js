import React from 'react';
import styled from 'styled-components'

import { color, size } from '../../assets/styles/variables'

const TableWrap = styled.div`
  border: 1px solid ${color.$line_search_grey}
  border-radius: 10px
  overflow: hidden
`

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`
const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${color.$line_search_grey}
  }
`

const Th = styled.th`
  &:not(:last-child) {
    border-right: 1px solid ${color.$line_search_grey}
  }
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-family: "Spoqa Han Sans";
  background: #f2f2f2;
  font-weight: bold;
  text-align: left;
  padding: 24px;
`

const Td = styled.td`
  &:not(:last-child) {
    border-right: 1px solid ${color.$line_search_grey}
  }

  color: #161616;
  font-size: 18px;
  font-family: "Spoqa Han Sans";
  background: #ffffff;
  font-weight: normal;
  text-align: right;
  padding: 24px;
`

export default ({ data, row=2 }) => {

  const createTable = () => {
    let table = []

    for (let i = 0 ; i < data.length ; i += row) {
      let children = []
      for (let j = i ; j < i + row && j < data.length ; j++) {
        children.push(<Th key={`th${j}`}>{Object.keys(data[j])[0]}</Th>)
        children.push(<Td key={`td${j}`}>{Object.values(data[j])[0]}</Td>)
      }
      table.push(<Tr key={i.toString()}>{children}</Tr>)
    }
    return table
  }

  return (
    <TableWrap>
      <Table>
        {createTable()}
      </Table>
    </TableWrap>
  );
};