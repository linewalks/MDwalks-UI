import React from 'react';
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty';
import THead from '@Components/table/THead';
import TBody from '@Components/table/TBody';
import TFoot from '@Components/table/TFoot';
import styled, { css } from 'styled-components'
import * as variables from '@src/assets/styles/variables'

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

  border-bottom: 1px solid ${variables.color.$line_search_grey};

  ${(props) => (props.className.split(' ').includes('sideFit') ? sideFit : null)}
`

const Table = ({
  data, rowSpanCount, wrapTh, wrapTd, appendRow, className, loading,
}) => {
  if (isEmpty(data)) {
    return (
      <div>
        There is no data
        <br />
        Please search agains
      </div>
    )
  }

  return (
    <TableBox className={className}>
      <THead
        headers={data.headers}
        subHeaders={data.subHeaders}
        wrapTh={wrapTh}
        loading={loading}
      />
      <TBody
        headers={data.headers}
        subHeaders={data.subHeaders}
        rowData={data.rowData}
        wrapTd={wrapTd}
        appendRow={appendRow}
        rowSpanCount={rowSpanCount}
      />
      <TFoot footData={data.footData} />
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
}

Table.propTypes = {
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
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ),
  }),
  rowSpanCount: PropTypes.number,
  wrapTh: PropTypes.func,
  wrapTd: PropTypes.func,
  appendRow: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
}

export default Table
