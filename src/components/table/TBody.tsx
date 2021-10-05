import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import * as font from '@Styles/font'
import { color } from '@Styles/variables'
import { tableSize } from '@Styles/tableProperties'
import EmptyPlaceHolder from './EmptyPlaceHolder'

interface ISize {
  size: 'small' | 'medium'
}
// .td 가 존재하는 이유는 appendRow 에 스타일을 적용하지 않기 위해서 이다
const ListTBody = styled.tbody.attrs(({ size }: ISize) => ({
  ...tableSize[size].tbody,
}))`
  .td[rowspan] {
    border-left: 1px solid ${color.$grey04};
    border-right: 1px solid ${color.$grey04};
  }

  .td[rowspan]:first-child {
    border-left: none;
  }

  .td[rowspan]:last-child {
    border-right: none;
  }

  ${({ isHaveRowSpan }) =>
    isHaveRowSpan ? `` : `.tr:hover { background: ${color.$grey01}; }`}

  .tr:not(:first-child) {
    border-top: 1px solid ${color.$grey04};
  }

  .td {
    ${font.Text}
    text-align: center;
  }

  .td > a > div,
  .td > div {
    ${({ padding }) => `padding: ${padding};`}
  }
`

const EmptyTbody = styled.tbody`
  td {
    padding: 34px;
    text-align: center;
  }
`

interface TBodyProps extends ISize {
  headers: any[]
  subHeaders: any
  rowData: any[]
  wrapTd: (data: any) => React.ReactNode
  appendRow: (data: any, idx: number) => void
  placeholder: React.ReactNode | string
  emptyImgSrc: string
}

const TBody = ({
  headers,
  subHeaders,
  rowData,
  wrapTd,
  appendRow,
  size,
  placeholder,
  emptyImgSrc,
}: TBodyProps) => {
  let singlevelHeader = headers

  if (subHeaders && wrapTd) {
    singlevelHeader = _.map(singlevelHeader, (header) => {
      if (subHeaders[header]) {
        return _.map(subHeaders[header], (text) => `${header}-${text}`)
      }
      return header
    })

    singlevelHeader = _.flatten(singlevelHeader)
  }

  const createBody = (rowsData) =>
    rowsData.map((data, idx) => [
      <tr key={data} className="tr">
        {_.chain(Object.values(data))
          .reverse()
          .map((row: any | { rowSpan: number; className: string }, i) => {
            const { rowSpan, className = '' } = row || ''
            const drawIdx = singlevelHeader.length - i - 1

            const text = !_.isUndefined(rowSpan) ? row.text : row

            return (
              <td key={drawIdx} className={`td ${className}`} rowSpan={rowSpan}>
                {wrapTd ? (
                  wrapTd({
                    data,
                    label: singlevelHeader[drawIdx],
                    text,
                    idx: drawIdx,
                  })
                ) : (
                  <div>{text}</div>
                )}
              </td>
            )
          })
          .reverse()
          .value()}
      </tr>,
      appendRow ? appendRow(data, idx) : null,
    ])

  const EmptyPlaceHolderGetColSpan = () => {
    let colSpan
    if (_.isEmpty(headers)) {
      colSpan = 1
      return colSpan
    }

    colSpan =
      _.size(headers) -
      _.size(subHeaders) +
      _.chain(subHeaders).map().flattenDeep().size().value()

    return colSpan
  }

  const isHaveRowSpan = _.some(_.flattenDeep(rowData), (item) =>
    _.has(item, 'rowSpan'),
  )

  return _.isEmpty(rowData) ? (
    <EmptyTbody>
      <tr>
        <td colSpan={EmptyPlaceHolderGetColSpan()}>
          <EmptyPlaceHolder text={placeholder} imgSrc={emptyImgSrc} />
        </td>
      </tr>
    </EmptyTbody>
  ) : (
    <ListTBody isHaveRowSpan={isHaveRowSpan} size={size}>
      {createBody(rowData)}
    </ListTBody>
  )
}

TBody.defaultProps = {
  headers: [],
  subHeaders: {},
  rowData: [],
  wrapTd: null,
  appendRow: null,
  size: 'medium',
  placeholder: undefined,
  emptyImgSrc: undefined,
}

export default TBody
