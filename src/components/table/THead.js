import React from 'react';
import PropTypes from 'prop-types'

import _ from 'lodash'
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import { tableHeaderConvert } from '@src/helper/chartUtility'

const Td = styled.td.attrs(() => ({
  size: 16,
  bold: true,
  opacity: 6,
}))`
  ${font.Text}
  padding: ${(props) => (props.subHeader ? '28px 24px' : '12px 22px')};
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

const THead = ({ headers, wrapTh, subHeaders }) => {
  const createHeader = (headerData, subHeaderData) => {
    if (isEmpty(subHeaderData)) {
      if (isEmpty(headerData)) {
        return (
          <tr>
            <th>&nbsp;</th>
          </tr>
        )
      }
      return (
        <tr>
          {headerData.map((row) => {
            const { colSpan } = row
            const text = !_.isUndefined(colSpan) ? row.text : row

            return (
              <Th key={text} colSpan={colSpan}>
                {wrapTh
                  ? wrapTh({ text: tableHeaderConvert(text) })
                  : <div>{tableHeaderConvert(text)}</div>}
              </Th>
            )
          })}
        </tr>
      )
    }

    return (
      <tr>
        {headerData.map((header) => {
          if (!subHeaders[header]) {
            return (
              <Th rowSpan={2} key={`header_${header}`}>
                {wrapTh ? wrapTh({ text: header }) : <div>{header}</div>}
              </Th>
            )
          }

          const subHeaderColNum = subHeaders[header].length
          return (
            <Th colSpan={subHeaderColNum} key={`header_${header}`} subHeader>
              {wrapTh ? wrapTh({ text: header }) : <div>{header}</div>}
            </Th>
          )
        })}
      </tr>
    )
  }

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

  return (
    <Thead>
      {createHeader(headers, subHeaders)}
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
