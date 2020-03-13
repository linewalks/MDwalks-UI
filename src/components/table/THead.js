import React from 'react';
import PropTypes from 'prop-types'

import _ from 'lodash'
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

const Td = styled.td.attrs(() => ({
  size: 16,
  bold: true,
  opacity: 6,
}))`
  ${font.Text}
  padding: 12px 22px;
  text-align: center;
  background: ${color.$table_grey};
`

const Th = styled.th.attrs(() => ({
  size: 16,
  bold: true,
  opacity: 6,
}))`
  ${font.Text}
  padding: 28px 24px;
  text-align: center;
  background: ${color.$table_grey};

  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
`

const Thead = styled.thead`
  border-bottom: 2px solid ${color.$line_dashboard_edge_grey};
`

const TrEmpty = () => (
  <tr>
    <th>&nbsp;</th>
  </tr>
)

const createSubHeader = (subHeaderData) => {
  const subTitleGroup = Object.values(subHeaderData).join().split(',')
  return (
    <tr>
      {subTitleGroup.map((subTitle, i) => {
        const key = `subheader_${subTitle}${i}`
        return <Td key={key}>{subTitle}</Td>
      })}
    </tr>
  )
}

const THead = ({ headers, wrapTh, subHeaders }) => {
  const createHeader = (headerData) => (
    <tr>
      {headerData.map((row) => {
        let rowSpan
        let colSpan

        const text = _.isObject(row) ? row.text : row

        if (row.colSpan) {
          colSpan = row.colSpan
        }

        if (subHeaders && subHeaders[text]) {
          colSpan = subHeaders[text].length
        } else if (subHeaders) {
          rowSpan = 2
        }

        return (
          <Th colSpan={colSpan} rowSpan={rowSpan} key={`header_${text}`}>
            {wrapTh ? wrapTh({ text }) : <div>{text}</div>}
          </Th>
        )
      })}
    </tr>
  )

  if (isEmpty(subHeaders) && isEmpty(headers)) {
    return (
      <Thead>
        <TrEmpty />
      </Thead>
    )
  }

  return (
    <Thead>
      {createHeader(headers)}
      {isEmpty(subHeaders) ? null : createSubHeader(subHeaders)}
    </Thead>
  )
};

THead.defaultProps = {
  headers: undefined,
  wrapTh: undefined,
  subHeaders: undefined,
}

THead.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(),
    ]),
  ),
  wrapTh: PropTypes.func,
  subHeaders: PropTypes.shape({}),
}

export default THead
