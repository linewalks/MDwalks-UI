import React, { Component } from 'react'
import _ from "lodash"
import btn_next from '@src/assets/svg/pagination/btn_next.svg';
import btn_pre from '@src/assets/svg/pagination/btn_pre.svg';

class Pagination extends Component {
  state = {
    totalPage: 1,
    list: [],
    selectPage: null,
    drawPageCnt: 2,
  }

  constructor(props) {
    super(props)
    const {selectPage = 1, totalPage = 1, drawPageCnt = 2, size } = props

    this.state.selectPage = selectPage
    this.state.totalPage = totalPage
    this.state.drawPageCnt = size === 'sm' ? 1 : drawPageCnt

    this.state.list = this.getPageList()
  }

  static getDerivedStateFromProps(props, state) {
    const changeProps = ['selectPage', 'totalPage', 'drawPageCnt']

    if (!_.isEqual(_.pick(props, changeProps), _.pick(state, changeProps))) {
      return _.pick(props, changeProps)
    }

    return null
  }

  getStyles() {
    return {
      defaultBtn: {borderRadius: '4px', color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px', minWidth: '42px', height: '42px'},
      selectBtn:  {borderRadius: '4px', backgroundColor: '#979797', color: '#ffffff', fontSize: '16px', minWidth: '42px', height: '42px'},
    }
  }

  onChange(page) {
    this.setState({
      selectPage: page
    })

    if (this.props.onChange) {
      this.props.onChange(page)
    }
  }

  disablePrevButton() {
    return this.state.selectPage <= this.state.drawPageCnt
  }

  disableNextButton() {
    const {totalPage, drawPageCnt} = this.state
    if (totalPage <= drawPageCnt) return true

    let nextPageCnt = this.getCurrentPageCnt() + 1
    return nextPageCnt * drawPageCnt >= totalPage
  }

  // from 0
  getCurrentPageCnt() {
    return parseInt((this.state.selectPage - 1) / this.state.drawPageCnt)
  }

  getPageList() {
    let {drawPageCnt, totalPage} = this.state

    let list = []
    let cnt = 1

    let startPage = this.getCurrentPageCnt() * drawPageCnt + 1

    for( ; cnt <= drawPageCnt && startPage <= totalPage ; startPage ++) {
      list[cnt-1] = startPage
      cnt++
    }

    return list
  }

  getPrevPage() {
    const movePage = (this.getCurrentPageCnt() - 1) * this.state.drawPageCnt + 1
    
    return movePage >= 1 ? movePage : null
  }

  getNextPage() {
    const movePage = (this.getCurrentPageCnt() + 1) * this.state.drawPageCnt + 1

    return movePage
  }

  movePrevPage() {
    this.onChange(this.getPrevPage())
  }
  
  moveNextPage() {
    this.onChange(this.getNextPage())
  }

  isHidden() {
    return this.state.totalPage === 0
  }

  getSmall() {
    const { selectPage, totalPage } = this.state
    return (
      <div style={this.isHidden() ? {display: 'none'} : {}}>
      <button style={{marginRight: '16px'}} disabled={this.disablePrevButton()} onClick={this.movePrevPage.bind(this)}>
        <img type="image" src={btn_pre}  width="32px" height="32px" alt="move previous" />
      </button>
      <span style={{ fontSize: '14px', opacity: 0.8 }}>
        { `${selectPage} / ${totalPage}` }
      </span>
      <button style={{marginLeft: '16px'}} disabled={this.disableNextButton()} onClick={this.moveNextPage.bind(this)}>
        <img type="image" src={btn_next}  width="32px" height="32px" alt="move next" />
      </button>
    </div>
    )
  }

  render() {
    const { size } = this.props
    if (size === 'sm') {
      return this.getSmall()
    }

    const styles = this.getStyles()
    return (
    <div style={this.isHidden() ? {display: 'none'} : {}}>
      <button style={{marginRight: '14px'}} disabled={this.disablePrevButton()} onClick={this.movePrevPage.bind(this)}>
        <img type="image" src={btn_pre}  width="42px" height="42px" alt="move previous" />
      </button>
      {
      this.getPageList().map((page) => {
        let style = page === this.state.selectPage
          ? styles.selectBtn 
          : styles.defaultBtn
        
        return <button style={style} key={`page${page}`} onClick={() => this.onChange(page)}>{page}</button>
      })
      }
      <button style={{marginLeft: '14px'}} disabled={this.disableNextButton()} onClick={this.moveNextPage.bind(this)}>
        <img type="image" src={btn_next}  width="42px" height="42px" alt="move next" />
      </button>
    </div>
    )
  }
}

export default Pagination;