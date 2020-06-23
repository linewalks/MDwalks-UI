import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { colorV1 } from '@src/assets/styles/variables'
import { tableSize } from '@src/assets/styles/tableProperties'


const TableWrap = styled.div`
  border: 1px solid ${colorV1.$grey05};
  border-radius: 8px;
  overflow: hidden;
`

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`
const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${colorV1.$grey04};
  }
`

const Th = styled.th`
  color: ${colorV1.$grey08};
  ${`font-size: ${tableSize.medium.thead.size}px`};
  font-family: "Spoqa Han Sans";
  background: ${colorV1.$grey03};
  font-weight: bold;
  text-align: left;
  padding: ${tableSize.medium.thead.padding};
`

const Td = styled.td`
  color: ${colorV1.$grey10};
  ${`font-size: ${tableSize.medium.tbody.size}px`};
  font-family: "Spoqa Han Sans";
  background: #ffffff;
  font-weight: normal;
  text-align: left;
  padding: ${tableSize.medium.tbody.padding};
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

export const isLastRow = ({ cellTotal, cellCount, rowCurrent }) => {
  const rowCount = (() => {
    if (cellTotal % cellCount === 0) {
      return cellTotal / cellCount
    }
    return Math.floor(cellTotal / cellCount) + 1
  })()

  return rowCount === rowCurrent + 1
}

export const isLastCell = ({ cellTotal, cellCurrent }) => cellTotal === cellCurrent

export const hasRow = ({ cellTotal, cellCount, cellCurrent }) => {
  if (!isLastCell(cellTotal, cellCurrent)) return false
  if (cellCount === 1) return false
  return cellTotal === cellCurrent + 1
}

export const getColspan = ({ cellTotal, cellCount }) => {
  if (cellTotal % cellCount === 0) return 0
  return (cellCount - (cellTotal % cellCount)) * 2 + 1
}

const Descriptions = ({ data, cellCount = 2, colWidths = [] }) => {
  const createTable = () => {
    const table = []
    let props = {}
    let thWidth
    let tdWidth

    for (let i = 0; i < data.length; i += cellCount) {
      const children = []
      for (let j = i; j < i + cellCount && j < data.length; j += 1) {
        props = { cellTotal: data.length, cellCount, cellCurrent: j }
        thWidth = colWidths[(j - i) * 2]
        tdWidth = colWidths[(j - i) * 2 + 1]

        thWidth = thWidth ? `${thWidth}px` : 'auto'
        tdWidth = tdWidth ? `${tdWidth}px` : 'auto'

        children.push(<Th key={`th${j}`} width={thWidth}>{Object.keys(data[j])[0]}</Th>)

        if (hasRow(props)) {
          children.push(<Td key={`td${j}`} width={tdWidth} colSpan={getColspan(props)}>{Object.values(data[j])[0]}</Td>)
        } else {
          children.push(<Td key={`td${j}`} width={tdWidth}>{Object.values(data[j])[0]}</Td>)
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

Descriptions.defaultProps = {
  data: [],
  cellCount: 2,
  colWidths: [],
}

Descriptions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  cellCount: PropTypes.number,
  colWidths: PropTypes.arrayOf(PropTypes.number),
}

export default Descriptions
