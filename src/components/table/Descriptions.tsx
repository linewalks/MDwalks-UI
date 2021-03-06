import React from 'react';
import styled from 'styled-components'
import { color } from '@Styles/variables'
import { tableSize } from '@Styles/tableProperties'

const TableWrap = styled.div`
  border: 1px solid ${color.$grey05};
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
    border-bottom: 1px solid ${color.$grey04};
  }
`

interface ITh {
  width: string;
}

const Th = styled.th<ITh>`
  color: ${color.$grey08};
  font-size: ${tableSize.medium.thead.size}px;
  font-family: "Spoqa Han Sans";
  background: ${color.$grey03};
  font-weight: bold;
  text-align: left;
  padding: ${tableSize.medium.thead.padding};
`

interface ITd {
  width: string;
  colSpan?: number;
}

const Td = styled.td<ITd>`
  color: ${color.$grey10};
  font-size: ${tableSize.medium.tbody.size}px;
  font-family: "Spoqa Han Sans";
  background: ${color.$white};;
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

interface ICell {
  cellTotal?: number;
  cellCount?: number;
  cellCurrent?: number;
  rowCurrent?: number;
}

export const isLastRow = ({ cellTotal, cellCount, rowCurrent }:ICell) => {
  const rowCount = (() => {
    if (cellTotal % cellCount === 0) {
      return cellTotal / cellCount
    }
    return Math.floor(cellTotal / cellCount) + 1
  })()

  return rowCount === rowCurrent + 1
}

export const isLastCell = ({ cellTotal, cellCurrent }:ICell) => cellTotal === cellCurrent

export const hasRow = ({ cellTotal, cellCount, cellCurrent }:ICell) => {
  if (isLastCell({ cellTotal, cellCurrent })) return false
  if (cellCount === 1) return false
  return cellTotal === (cellCurrent + 1)
}

export const getColspan = ({ cellTotal, cellCount }:ICell) => {
  if (cellTotal % cellCount === 0) return 0
  return (cellCount - (cellTotal % cellCount)) * 2 + 1
}

interface DescriptionsProps {
  data: any[];
  cellCount: number;
  colWidths: number[];
}

const Descriptions = ({ data, cellCount = 2, colWidths = [] }:DescriptionsProps) => {
  const createTable = () => {
    const table = []
    let props:ICell = {}
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

export default Descriptions
