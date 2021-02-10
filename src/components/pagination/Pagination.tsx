import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { color } from '../../assets/styles/variables'

import btnNext from '../../assets/svg/pagination/btn_pagination_next_42.svg'
import btnPre from '../../assets/svg/pagination/btn_pagination_previous_42.svg'
import btnNextSm from '../../assets/svg/pagination/btn_pagination_next_32.svg'
import btnPreSm from '../../assets/svg/pagination/btn_pagination_previous_32.svg'

import Input from './Input'

export const PaginationBox = styled.section<{ isHidden: boolean; }>`
  display: flex;
  align-items: center;
  ${({ isHidden }) => isHidden && 'display: none;'};
`

export const PaginationInner = styled.div<{ align: 'center' | 'left' | 'right'; }>`
  display: inline-block;

  ${(props) => (props.align === 'center' ? `margin: 0 auto` : '')}
  ${(props) => (props.align === 'left' ? `margin-right: auto` : '')}
  ${(props) => (props.align === 'right' ? `margin-left: auto` : '')}
`

export const PageText = styled.span<{ size: 'sm' | 'md' }>`
  &:not(:last-child) {
    margin-left: 8px;
  }
  letter-spacing: -0.5px;
  color: ${color.$grey10};
  ${(props) => (props.size === 'sm' ? `font-size: 14px;` : `font-size: 16px;`)};
`

export const ButtonPage = styled.button<{ selected: boolean; size: 'sm' | 'md'; }>`
  border-radius: 4px;

  ${(props) => (props.selected ? `background-color: ${color.$grey08}` : '')};
  ${(props) => (props.selected ? `color: ${color.$white}` : `color: ${color.$grey08}`)};
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
interface IButtonMove {
  size: 'sm' | 'md';
  disabled: boolean;
  onClick: () => void;
}

export const ButtonMove = styled.button<IButtonMove>`
  img {
    border-radius: 8px;
  }
  ${({disabled}) => (disabled && `
    background-color: transparent;
    color: ${color.$grey03};
    cursor: not-allowed;
  `)};
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

interface IProps {
  size: 'sm' | 'md';
  onChange: (page: number) => void;
  selectPage: number;
  totalPage: number;
  drawPageCnt: number;
  simple: boolean;
  align: 'center' | 'left' | 'right';
}

interface IState {
  selectPage: number;
  totalPage: number;
  drawPageCnt: number;
  list: number[];
}

class Pagination extends Component <IProps, IState>{
  static defaultProps = {
    onChange: () => {},
    size: 'md',
    selectPage: 1,
    totalPage: 1,
    drawPageCnt: 1,
    simple: false,
    align: 'center',
  }
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
      list: [],
    }
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
    return parseInt(`${(selectPage - 1) / drawPageCnt}`, 10)
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

  movePrevPage = () => this.onChange(this.getPrevPage())

  moveNextPage = () => this.onChange(this.getNextPage())

  isHidden() {
    const { totalPage } = this.state
    return totalPage === 0
  }

  componentDidMount = () => {
    const list = this.getPageList()
    this.setState({ list })
  }
  render() {
    const { size, simple, align } = this.props
    const { selectPage, totalPage } = this.state

    const imageSize = size === 'sm' ? 32 : 42

    return (
      <PaginationBox isHidden={this.isHidden()}>
        <PaginationInner align={align}>
          <ButtonMove
            type="button"
            size={size}
            disabled={this.disablePrevButton()}
            onClick={this.movePrevPage}
          >
            <img src={size === 'sm' ? btnPreSm : btnPre} width={imageSize} height={imageSize} alt="move previous" />
          </ButtonMove>
          {
            simple
            && (
              <>
                <Input
                  initPage={selectPage * 1}
                  max={totalPage}
                  onChange={(page) => (this.onChange(page))}
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
            onClick={this.moveNextPage}
          >
            <img src={size === 'sm' ? btnNextSm : btnNext} width={imageSize} height={imageSize} alt="move next" />
          </ButtonMove>
        </PaginationInner>
      </PaginationBox>
    )
  }
}

export default Pagination
