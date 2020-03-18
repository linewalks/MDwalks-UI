import React, { useState } from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import ICO_DOWN from '@src/assets/svg/table/icn_sort_down_default.svg'
import ICO_UP from '@src/assets/svg/table/icn_sort_up_default.svg'

import ICO_DOWN_FOCUS from '@src/assets/svg/table/icn_sort_down_focus.svg'
import ICO_UP_FOCUS from '@src/assets/svg/table/icn_sort_up_focus.svg'

import ICO_DOWN_DISABLE from '@src/assets/svg/table/icn_sort_down_disable.svg'
import ICO_UP_DISABLE from '@src/assets/svg/table/icn_sort_up_disable.svg'

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

  ${(props) => (props.sort ? `` : `padding: 28px 24px`)};

  text-align: center;
  background: ${color.$table_grey};

  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
`

const SortButton = styled.button.attrs(() => ({
  size: 16,
  bold: true,
  opacity: 6,
}))`
  ${font.Text}
  padding: 28px 24px;
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
  text, sort, toggle, loading,
}) => (
  <SortButton
    disabled={loading}
    type="button"
    onClick={sort}
  >
    {text}
    <HeaderSortIcon sort={toggle[text]} loading={loading} />
  </SortButton>
)

HeaderTextSort.defaultProps = {
  sort: '',
  toggle: {},
  loading: false,
}

HeaderTextSort.propTypes = {
  text: PropTypes.string.isRequired,
  sort: PropTypes.func,
  toggle: PropTypes.shape({}),
  loading: PropTypes.bool,
}

const THead = ({
  headers, wrapTh, subHeaders, loading,
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
          <Th colSpan={colSpan} rowSpan={rowSpan} key={`header_${text}`} sort={_.isFunction(sort)}>
            {
              sort
                ? HeaderTextSort({
                  text, sort, toggle, loading,
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
}

export default THead
