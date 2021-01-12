import React from 'react';
import _ from 'lodash'
import styled, { css } from 'styled-components'
import { color } from '../../assets/styles/variables'
import * as commonTag from '../common/commonTag'
import THead from './THead'
import TBody from './TBody'
import TFoot from './TFoot'

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

interface ITableBox {
  notBottom?: boolean;
  className?: string;
}

const TableBox = styled.table<ITableBox>`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  border-bottom:   ${(props) => (props.notBottom ? 'none' : `1px solid ${color.$grey06}`)};

  ${(props) => (props.className.split(' ').includes('sideFit') ? sideFit : null)}
`

const WrapScrollTables = styled.div`
  border-bottom: 1px solid ${color.$grey06};
`

interface IColumns {
  columns?: number[];
}

const Columns = ({ columns }:IColumns) => (
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

interface TableProps extends IColumns {
  data: {
    headers: any[];
    subHeaders?: {
      [key:string]: string[];
    };
    rowData: any[];
    footData: any[];
  };
  wrapTh: () => void;
  wrapTd: (data:any) => React.ReactNode;
  appendRow: () => void;
  className?: string;
  loading: boolean;
  scroll?: {
    y: number;
  };
  placeholder?: React.ReactNode | string;
  sortOrderList?: string[];
  defaultSort?: {
    text: string;
    order: number;
  };
  resetSort?: boolean;
  setResetSort?: () => void;
  size: 'small' | 'medium';
}

const Table = ({
  data, wrapTh, wrapTd, appendRow, className,
  loading, scroll, columns, size, placeholder, defaultSort,
  sortOrderList, resetSort, setResetSort,
}:TableProps) => {
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

export default Table
