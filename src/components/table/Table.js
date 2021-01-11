import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

import TBody from '@Components/table/TBody';
import styled, { css } from 'styled-components'
import { color } from '@src/assets/styles/variables'
import * as commonTag from '@Components/common/commonTag'
import THead from './THead.tsx'
import TFoot from './TFoot.tsx'

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

const TableBox = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  border-bottom: 1px solid ${color.$grey06};

  ${(props) => (props.notBottom ? 'border-bottom: none' : '')};

  ${(props) => (props.className.split(' ').includes('sideFit') ? sideFit : null)}
`

const WrapScrollTables = styled.div`
  border-bottom: 1px solid ${color.$grey06};
`

const Columns = ({ columns }) => (
  !_.isEmpty(columns) && (
    <colgroup>
      {
        _.map(columns, (width, i) => {
          const key = `columns${i}`
          return (<col key={key} style={{ width }} />)
        })
      }
    </colgroup>
  )
)

Columns.defaultProps = {
  columns: {},
}

Columns.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
}

const Table = ({
  data, rowSpanCount, wrapTh, wrapTd, appendRow, className,
  loading, scroll, columns, size, placeholder, defaultSort,
  sortOrderList, resetSort, setResetSort,
}) => {
  if (_.isEmpty(data)) {
    return (
      <div>
        There is no data
        <br />
        Please search agains
      </div>
    )
  }

  if (!_.isEmpty(scroll)) {
    return (
      <WrapScrollTables>
        <TableBox className={className} notBottom>
          <Columns columns={columns} />
          <THead
            headers={data.headers}
            subHeaders={data.subHeaders}
            wrapTh={wrapTh}
            loading={loading}
            size={size}
            sortOrderList={sortOrderList}
            defaultSort={defaultSort}
            resetSort={resetSort}
            setResetSort={setResetSort}
          />
        </TableBox>
        <commonTag.WrapperScrollBars scroll={scroll}>
          <TableBox className={className} notBottom>
            <Columns columns={columns} />
            <TBody
              headers={data.headers}
              subHeaders={data.subHeaders}
              rowData={data.rowData}
              wrapTd={wrapTd}
              appendRow={appendRow}
              rowSpanCount={rowSpanCount}
              size={size}
              placeholder={placeholder}
            />
          </TableBox>
        </commonTag.WrapperScrollBars>
        <TableBox className={className} notBottom>
          <Columns columns={columns} />
          <TFoot footData={data.footData} size={size} />
        </TableBox>
      </WrapScrollTables>
    )
  }

  return (
    <TableBox className={className}>
      <Columns columns={columns} />
      <THead
        headers={data.headers}
        subHeaders={data.subHeaders}
        wrapTh={wrapTh}
        loading={loading}
        size={size}
        sortOrderList={sortOrderList}
        defaultSort={defaultSort}
        resetSort={resetSort}
        setResetSort={setResetSort}
      />
      <TBody
        headers={data.headers}
        subHeaders={data.subHeaders}
        rowData={data.rowData}
        wrapTd={wrapTd}
        appendRow={appendRow}
        rowSpanCount={rowSpanCount}
        size={size}
        placeholder={placeholder}
      />
      <TFoot footData={data.footData} size={size} />
    </TableBox>
  );
};

Table.defaultProps = {
  data: {},
  rowSpanCount: undefined,
  wrapTh: undefined,
  wrapTd: undefined,
  appendRow: undefined,
  className: '',
  loading: false,
  scroll: {},
  columns: [],
  size: 'medium',
  placeholder: undefined,
  sortOrderList: ['desc', 'asc', ''],
  defaultSort: {},
  resetSort: false,
  setResetSort: () => {},
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  data: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape(),
      ]),
    ),
    subHeaders: PropTypes.shape({}),
    rowData: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
    ),
    footData: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
    ),
  }),
  rowSpanCount: PropTypes.number,
  wrapTh: PropTypes.func,
  wrapTd: PropTypes.func,
  appendRow: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
  scroll: PropTypes.shape({
    y: PropTypes.number,
  }),
  size: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sortOrderList: PropTypes.arrayOf(PropTypes.string),
  defaultSort: PropTypes.shape({
    text: PropTypes.string,
    order: PropTypes.number,
  }),
  resetSort: PropTypes.bool,
  setResetSort: PropTypes.func,
}

export default Table
