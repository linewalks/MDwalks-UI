/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import _ from 'lodash'
import styled from 'styled-components'
import * as font from '@Styles/font'
import { color } from '@Styles/variables'
import { tableSize } from '@Styles/tableProperties'

import ICO_DOWN from '../../assets/svg/table/icn_sort_down_filled_unselected_grey07_16.svg'
import ICO_UP from '../../assets/svg/table/icn_sort_up_filled_unselected_grey07_16.svg'

import ICO_DOWN_FOCUS from '../../assets/svg/table/icn_sort_down_filled_selected_grey09_16.svg'
import ICO_UP_FOCUS from '../../assets/svg/table/icn_sort_up_filled_selected_grey09_16.svg'

import ICO_DOWN_DISABLE from '../../assets/svg/table/icn_sort_down_filled_disabled_grey06_16.svg'
import ICO_UP_DISABLE from '../../assets/svg/table/icn_sort_up_filled_disabled_grey06_16.svg'

interface ISize {
  size: 'small' | 'medium';
}

const Td = styled.td.attrs(({ size }:ISize) => ({
  ...tableSize[size].thead.subHeader,
}))`
  ${font.Text}
  ${({ padding }) => (`padding: ${padding}`)};
  text-align: center;
  background: ${color.$grey02};
`

const Th = styled.th.attrs(({ size }:ISize) => ({
  ...tableSize[size].thead,
}))`
  ${font.Text}
  ${({ padding }) => (`padding: ${padding}`)};
  text-align: center;
  background: ${color.$grey02};

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  &:last-child {
    border-radius: 0 8px 0 0;
  }
`

const SortButton = styled.button.attrs(({ size }:ISize) => ({
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
  border-bottom: 1px solid ${color.$grey04};
`

const TrEmpty = () => (
  <tr>
    <th>&nbsp;</th>
  </tr>
)

interface HeaderTextProps {
  text: string;
  wrapTh?: (th: any) => void;
}

const HeaderText = ({ text, wrapTh }:HeaderTextProps) => (
  wrapTh
    ? wrapTh({ text })
    : <div>{text}</div>
)

HeaderText.defaultProps = {
  wrapTh: undefined,
}

interface HeaderSortIconProps {
  sort: 'asc' | 'desc' | '';
  loading: boolean;
}

export const HeaderSortIcon = ({ sort, loading }:HeaderSortIconProps) => {
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

interface HeaderTextSortProps {
  text: string;
  sort: (order:string) => void;
  loading: boolean;
  size: 'small' | 'medium';
  toggle: any;
}

const HeaderTextSort = ({
  text, sort, toggle, loading, size,
}:HeaderTextSortProps) => (
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

interface THeadProps {
  headers: any[];
  wrapTh: () => void;
  subHeaders: any;
  loading: boolean;
  size: 'small' | 'medium';
  sortOrderList: string[];
  defaultSort: {
    text: string;
    order: number;
  };
  resetSort: boolean;
  setResetSort: (isReset?:boolean) => void;
}

interface IHeaderRow {
  colSpan?: number;
  text?: string;
  sort?: (header: string, order: 'asc' | 'desc' | '') => void;
}

const THead = ({
  headers, wrapTh, subHeaders, loading, size, sortOrderList, defaultSort, resetSort, setResetSort,
}:THeadProps) => {
  const [toggle, setToggle] = useState({})
  const [toggleIdx, setToggleIdx] = useState({})

  const onSort = (text, sort) => {
    let toggleDumy = { ...toggle }
    let toggleIdxDumy = { ...toggleIdx }

    if (!toggleIdxDumy[text]) {
      toggleIdxDumy = _.mapValues(toggleIdxDumy, () => (0))
      toggleIdxDumy[text] = 0
    }

    if (!toggleDumy[text]) {
      toggleDumy = _.mapValues(toggleDumy, () => (''))
      const [initSort] = sortOrderList
      toggleDumy[text] = initSort
    }

    const nextIdx = toggleIdxDumy[text] + 1

    setToggle({
      ...toggleDumy,
      [text]: sortOrderList[toggleIdxDumy[text]],
    })
    setToggleIdx({
      ...toggleIdxDumy,
      [text]: nextIdx === sortOrderList.length ? 0 : nextIdx,
    })
    sort(text, sortOrderList[toggleIdxDumy[text]])
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
      {headerData.map((row:string | IHeaderRow) => {
        let rowSpan
        let colSpan

        const text = _.isObject(row) ? row.text : row
        const sort = _.isObject(row) && row.sort ? () => onSort(text, row.sort) : null

        if (_.isObject(row) && row.colSpan) {
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

  if (_.isEmpty(subHeaders) && _.isEmpty(headers)) {
    return (
      <Thead>
        <TrEmpty />
      </Thead>
    )
  }
  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (!_.isEmpty(defaultSort)) {
      const { text, order } = defaultSort
      setToggle((prevToggle) => ({
        ...prevToggle,
        [text]: sortOrderList[order],
      }))
      const nextOrder = order + 1
      setToggleIdx((prevToggleIdx) => ({
        ...prevToggleIdx,
        [text]: nextOrder === sortOrderList.length ? 0 : nextOrder,
      }))
    }
  }, [defaultSort, sortOrderList])

  useEffect(() => {
    if (resetSort) {
      setToggle({})
      setToggleIdx({})
      setResetSort(false)
    }
  }, [resetSort])

  return (
    <Thead>
      {createHeader(headers)}
      {_.isEmpty(subHeaders) ? null : createSubHeader(subHeaders)}
    </Thead>
  )
};

THead.defaultProps = {
  headers: undefined,
  wrapTh: undefined,
  subHeaders: undefined,
  loading: false,
  size: 'medium',
  defaultSort: {},
  resetSort: false,
  setResetSort: () => {},
}

export default THead
