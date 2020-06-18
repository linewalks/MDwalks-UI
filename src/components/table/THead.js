import React, { useState } from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { colorV1 } from '@src/assets/styles/variables'
import { tableSize } from '@src/assets/styles/tableProperties'

import ICO_DOWN from '@src/assets/svg/table/icn_sort_down_default.svg'
import ICO_UP from '@src/assets/svg/table/icn_sort_up_default.svg'

import ICO_DOWN_FOCUS from '@src/assets/svg/table/icn_sort_down_focus.svg'
import ICO_UP_FOCUS from '@src/assets/svg/table/icn_sort_up_focus.svg'

import ICO_DOWN_DISABLE from '@src/assets/svg/table/icn_sort_down_disable.svg'
import ICO_UP_DISABLE from '@src/assets/svg/table/icn_sort_up_disable.svg'

const Td = styled.td.attrs(({ size }) => ({
  ...tableSize[size].thead.subHeader,
}))`
  ${font.Text}
  ${({ padding }) => (`padding: ${padding}`)};
  text-align: center;
  background: ${colorV1.$grey02};
`

const Th = styled.th.attrs(({ size }) => ({
  ...tableSize[size].thead,
}))`
  ${font.Text}
  ${({ padding }) => (`padding: ${padding}`)};
  text-align: center;
  background: ${colorV1.$grey02};

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  &:last-child {
    border-radius: 0 8px 0 0;
  }
`

const SortButton = styled.button.attrs(({ size }) => ({
  ...tableSize[size].thead,
}))`
  ${font.Text}
  > span {
    position: relative;
    width: 16px;
    height: 100%;
    margin-left: 8px;
  }
  img {
    position: absolute;
  }

  img:first-child {
    top: 50%;
    margin-top: -8px;
  }

  img:last-child {
    bottom: 50%;
    margin-bottom: -8px;
  }

  width: 100%;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`

const Thead = styled.thead`
  border-bottom: 1px solid ${colorV1.$grey04};
`

const TrEmpty = () => (
  <tr>
    <th>&nbsp;</th>
  </tr>
)

const HeaderText = ({ text, wrapTh }) => (
  wrapTh
    ? wrapTh({ text })
    : <div>{text}</div>
)

HeaderText.defaultProps = {
  wrapTh: undefined,
}

HeaderText.propTypes = {
  text: PropTypes.string.isRequired,
  wrapTh: PropTypes.func,
}

export const HeaderSortIcon = ({ sort, loading }) => {
  if (loading) {
    return (
      <span>
        <img src={ICO_UP_DISABLE} alt="disabled up" />
        <img src={ICO_DOWN_DISABLE} alt="disabled down" />
      </span>
    )
  }

  if (sort === 'asc') {
    return (
      <span>
        <img src={ICO_UP_FOCUS} alt="focus up" />
        <img src={ICO_DOWN} alt="down" />
      </span>
    )
  }

  if (sort === 'desc') {
    return (
      <span>
        <img src={ICO_UP} alt="up" />
        <img src={ICO_DOWN_FOCUS} alt="focus down" />
      </span>
    )
  }

  return (
    <span>
      <img src={ICO_UP} alt="up" />
      <img src={ICO_DOWN} alt="down" />
    </span>
  )
}

HeaderSortIcon.defaultProps = {
  loading: false,
  sort: '',
}

HeaderSortIcon.propTypes = {
  loading: PropTypes.bool,
  sort: PropTypes.string,
}

const HeaderTextSort = ({
  text, sort, toggle, loading, size,
}) => (
  <SortButton
    disabled={loading}
    type="button"
    onClick={sort}
    size={size}
  >
    {text}
    <HeaderSortIcon sort={toggle[text]} loading={loading} />
  </SortButton>
)

HeaderTextSort.defaultProps = {
  sort: '',
  toggle: {},
  loading: false,
  size: 'medium',
}

HeaderTextSort.propTypes = {
  text: PropTypes.string.isRequired,
  sort: PropTypes.func,
  toggle: PropTypes.shape({}),
  loading: PropTypes.bool,
  size: PropTypes.string,
}

const THead = ({
  headers, wrapTh, subHeaders, loading, size,
}) => {
  const [toggle, setToggle] = useState({})

  const onSort = (text, sort) => {
    let toggleDumy = { ...toggle }

    if (!toggleDumy[text]) { // 없다면 처음, 그러면 다른 것들도 초기화
      toggleDumy = _.mapValues(toggleDumy, () => (''))
      toggleDumy[text] = 'asc'
    } else if (toggleDumy[text] === 'asc') {
      toggleDumy[text] = 'desc'
    } else {
      toggleDumy[text] = ''
    }

    setToggle(toggleDumy)
    sort(text, toggleDumy[text])
  }

  const createSubHeader = (subHeaderData) => {
    const subTitleGroup = Object.values(subHeaderData).join().split(',')
    return (
      <tr>
        {subTitleGroup.map((subTitle, i) => {
          const key = `subheader_${subTitle}${i}`
          return <Td key={key} size={size}>{subTitle}</Td>
        })}
      </tr>
    )
  }

  const createHeader = (headerData) => (
    <tr>
      {headerData.map((row) => {
        let rowSpan
        let colSpan

        const text = _.isObject(row) ? row.text : row
        const sort = _.isObject(row) && row.sort ? () => onSort(text, row.sort) : null

        if (row.colSpan) {
          colSpan = row.colSpan
        }

        if (subHeaders && subHeaders[text]) {
          colSpan = subHeaders[text].length
        } else if (subHeaders) {
          rowSpan = 2
        }

        return (
          <Th
            colSpan={colSpan}
            rowSpan={rowSpan}
            key={`header_${text}`}
            sort={_.isFunction(sort)}
            size={size}
          >
            {
              sort
                ? HeaderTextSort({
                  text, sort, toggle, loading, size,
                })
                : HeaderText({ text, wrapTh })
            }
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
  loading: false,
  size: 'medium',
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
  loading: PropTypes.bool,
  size: PropTypes.string,
}

export default THead
