import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { color } from '@src/assets/styles/variables'

import btnNext from '@src/assets/svg/pagination/btn_pagination_next_42.svg'
import btnPre from '@src/assets/svg/pagination/btn_pagination_previous_42.svg'
import btnNextSm from '@src/assets/svg/pagination/btn_pagination_next_32.svg'
import btnPreSm from '@src/assets/svg/pagination/btn_pagination_previous_32.svg'

import Input from '@Components/pagination/Input'

const PaginationBox = styled.section`
  display: flex;
  align-items: center;
`

const PaginationInner = styled.div`
  display: inline-block;

  ${(props) => (props.align === 'center' ? `margin: 0 auto` : '')}
  ${(props) => (props.align === 'left' ? `margin-right: auto` : '')}
  ${(props) => (props.align === 'right' ? `margin-left: auto` : '')}
`

export const PageText = styled.span`
  &:not(:last-child) {
    margin-left: 8px;
  }
  letter-spacing: -0.5px;
  color: ${color.$grey10};
  ${(props) => (props.size === 'sm' ? `font-size: 14px;` : `font-size: 16px;`)};
`

export const ButtonPage = styled.button`
  border-radius: 4px;

  ${(props) => (props.selected ? `background-color: ${color.$grey08}` : '')};
  ${(props) => (props.selected ? `color: ${color.$white}` : `color: ${color.$grey8}`)};
  ${(props) => (props.size === 'sm'
    ? `
      font-size: 14px;
      min-width: 32px;
      height: 32px;
    `
    : `
      font-size: 16px;
      min-width: 42px;
      height: 42px;
    `
  )};
`

export const ButtonMove = styled.button`
  img {
    border-radius: 8px;
  }
  ${(props) => (props.selected ? `background-color: ${color.$grey03}` : '')};
  font-size: 0;
  &:first-child {
    margin-right: 16px;
  }

  &:last-child {
    margin-left: 16px;
  }

  ${(props) => (props.size === 'sm'
    ? `
      height: 32px;
    `
    : `
      height: 42px;
    `
  )};
`

class Pagination extends Component {
  constructor(props) {
    super(props)
    const {
      selectPage,
      totalPage,
      drawPageCnt,
      size,
    } = props

    this.state = {
      selectPage,
      totalPage,
      drawPageCnt: size === 'sm' ? 1 : drawPageCnt,
    }

    this.state.list = this.getPageList()
  }

  static getDerivedStateFromProps(props, state) {
    const changeProps = ['selectPage', 'totalPage', 'drawPageCnt']

    if (!_.isEqual(_.pick(props, changeProps), _.pick(state, changeProps))) {
      return _.pick(props, changeProps)
    }

    return null
  }

  onChange(page) {
    this.setState({
      selectPage: page,
    })

    const { onChange } = this.props
    onChange(page)
  }

  // from 0
  getCurrentPageCnt() {
    const { selectPage, drawPageCnt } = this.state
    return parseInt((selectPage - 1) / drawPageCnt, 10)
  }

  getPageList() {
    const { drawPageCnt, totalPage } = this.state

    const list = []
    let cnt = 1

    let startPage = this.getCurrentPageCnt() * drawPageCnt + 1

    for (; cnt <= drawPageCnt && startPage <= totalPage; startPage += 1) {
      list[cnt - 1] = startPage
      cnt += 1
    }

    return list
  }

  getPrevPage() {
    const { drawPageCnt } = this.state
    const movePage = (this.getCurrentPageCnt() - 1) * drawPageCnt + 1

    return movePage >= 1 ? movePage : null
  }

  getNextPage() {
    const { drawPageCnt } = this.state
    const movePage = (this.getCurrentPageCnt() + 1) * drawPageCnt + 1

    return movePage
  }

  disableNextButton() {
    const { totalPage, drawPageCnt } = this.state
    if (totalPage <= drawPageCnt) return true

    const nextPageCnt = this.getCurrentPageCnt() + 1
    return nextPageCnt * drawPageCnt >= totalPage
  }

  disablePrevButton() {
    const { selectPage, drawPageCnt } = this.state
    return selectPage <= drawPageCnt
  }

  movePrevPage() {
    this.onChange(this.getPrevPage())
  }

  moveNextPage() {
    this.onChange(this.getNextPage())
  }

  isHidden() {
    const { totalPage } = this.state
    return totalPage === 0
  }

  render() {
    const { size, simple, align } = this.props
    const { selectPage, totalPage } = this.state

    const imageSize = size === 'sm' ? 32 : 42

    return (
      <PaginationBox style={this.isHidden() ? { display: 'none' } : {}}>
        <PaginationInner align={align}>
          <ButtonMove
            type="button"
            size={size}
            disabled={this.disablePrevButton()}
            onClick={() => (this.movePrevPage.bind(this)())}
          >
            <img src={size === 'sm' ? btnPreSm : btnPre} width={imageSize} height={imageSize} alt="move previous" />
          </ButtonMove>
          {
            simple
            && (
              <>
                <Input
                  size={size}
                  initPage={selectPage * 1}
                  max={totalPage}
                  onChange={(page) => ((this.onChange.bind(this))(page))}
                />
                <PageText size={size}>
                  /
                </PageText>
                <PageText size={size}>
                  {totalPage}
                </PageText>
              </>
            )
          }
          {
            !simple && this.getPageList().map((page) => (
              <ButtonPage
                type="button"
                size={size}
                selected={page === selectPage}
                key={`page${page}`}
                onClick={() => this.onChange(page)}
              >
                {page}
              </ButtonPage>
            ))
          }
          <ButtonMove
            type="button"
            size={size}
            disabled={this.disableNextButton()}
            onClick={() => (this.moveNextPage.bind(this)())}
          >
            <img src={size === 'sm' ? btnNextSm : btnNext} width={imageSize} height={imageSize} alt="move next" />
          </ButtonMove>
        </PaginationInner>
      </PaginationBox>
    )
  }
}

Pagination.defaultProps = {
  onChange: () => {},
  size: undefined,
  selectPage: 1,
  totalPage: 1,
  drawPageCnt: 1,
  simple: false,
  align: 'center',
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  selectPage: PropTypes.number,
  totalPage: PropTypes.number,
  drawPageCnt: PropTypes.number,
  simple: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'left', 'right']),
}

export default Pagination
