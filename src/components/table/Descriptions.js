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
  text-align: left;
  padding: 24px;
`

/**
  -------------------
  |  a  |  b  |  c  |  rowCurrent : 0
  -------------------
  |  d  |  e        |  rowCurrent : 1
  -------------------

  cellTotal : 5
  cellCount : 3
  cellCurrent
    a : 0, d : 3, e : 4
*/

export const isLastRow = ({cellTotal, cellCount, rowCurrent}) => {
  let rowCount = (() => {
    if (cellTotal % cellCount === 0) {
      return cellTotal / cellCount
    } else {
      return Math.floor(cellTotal / cellCount) + 1
    }
  })()

  return rowCount === rowCurrent + 1
}

export const isLastCell = ({cellTotal, cellCurrent}) => {
  return cellTotal === cellCurrent
}

export const hasRow = ({cellTotal, cellCount, cellCurrent}) => {
  if (!isLastCell(cellTotal, cellCurrent)) return false
  if (cellCount === 1) return false
  return cellTotal === cellCurrent + 1
}

export const getColspan = ({cellTotal, cellCount, cellCurrent}) => {
  if (!hasRow({cellTotal, cellCount, cellCurrent})) return 0
  return cellTotal - cellCurrent + 1
}

export default ({ data, cellCount = 2 }) => {
  const createTable = () => {
    let table = []
    let props = {}

    for (let i = 0 ; i < data.length ; i += cellCount) {
      let children = []
      for (let j = i ; j < i + cellCount && j < data.length ; j++) {
        props = {cellTotal: data.length, cellCount, cellCurrent: j}
        children.push(<Th key={`th${j}`}>{Object.keys(data[j])[0]}</Th>)

        if (hasRow(props)) {
          children.push(<Td key={`td${j}`} colSpan={getColspan(props) * 2 - 1}>{Object.values(data[j])[0]}</Td>)
        } else {
          children.push(<Td key={`td${j}`}>{Object.values(data[j])[0]}</Td>)
        }
      }
      table.push(<Tr key={i.toString()}>{children}</Tr>)
    }
    return (
      <Table>
        <tbody>
          {table}
        </tbody>
      </Table>
    )
  }

  return (
    <TableWrap>
      {createTable()}
    </TableWrap>
  );
};