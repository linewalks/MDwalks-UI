import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import btnNext from '@src/assets/svg/pagination/btn_next.svg';
import btnPre from '@src/assets/svg/pagination/btn_pre.svg';

import btnNextSm from '@src/assets/svg/pagination/btn_next_sm.svg';
import btnPreSm from '@src/assets/svg/pagination/btn_pre_sm.svg';

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

  getSmall() {
    const { selectPage, totalPage } = this.state
    return (
      <div style={this.isHidden() ? { display: 'none' } : {}}>
        <button
          type="button"
          style={{ marginRight: '16px' }}
          disabled={this.disablePrevButton()}
          onClick={this.movePrevPage.bind(this)}
        >
          <img type="image" src={btnPreSm} width="32px" height="32px" alt="move previous" />
        </button>
        <span style={{ fontSize: '14px', opacity: 0.8 }}>
          { `${selectPage} / ${totalPage}` }
        </span>
        <button
          type="button"
          style={{ marginLeft: '16px' }}
          disabled={this.disableNextButton()}
          onClick={this.moveNextPage.bind(this)}
        >
          <img type="image" src={btnNextSm} width="32px" height="32px" alt="move next" />
        </button>
      </div>
    )
  }

  getStyles = () => ({
    defaultBtn: {
      borderRadius: '4px', color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px', minWidth: '42px', height: '42px',
    },
    selectBtn: {
      borderRadius: '4px', backgroundColor: '#979797', color: '#ffffff', fontSize: '16px', minWidth: '42px', height: '42px',
    },
  })

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
    const { size } = this.props
    if (size === 'sm') {
      return this.getSmall()
    }

    const styles = this.getStyles()
    return (
      <div style={this.isHidden() ? { display: 'none' } : {}}>
        <button
          type="button"
          style={{ marginRight: '14px' }}
          disabled={this.disablePrevButton()}
          onClick={this.movePrevPage.bind(this)}
        >
          <img type="image" src={btnPre} width="42px" height="42px" alt="move previous" />
        </button>
        {
      this.getPageList().map((page) => {
        const { selectPage } = this.state
        const style = page === selectPage
          ? styles.selectBtn
          : styles.defaultBtn

        return (
          <button
            type="button"
            style={style}
            key={`page${page}`}
            onClick={() => this.onChange(page)}
          >
            {page}
          </button>
        )
      })
      }
        <button
          type="button"
          style={{ marginLeft: '14px' }}
          disabled={this.disableNextButton()}
          onClick={this.moveNextPage.bind(this)}
        >
          <img type="image" src={btnNext} width="42px" height="42px" alt="move next" />
        </button>
      </div>
    )
  }
}


Pagination.defaultProps = {
  onChange: () => {},
  size: undefined,
  selectPage: 1,
  totalPage: 1,
  drawPageCnt: 1,
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  selectPage: PropTypes.number,
  totalPage: PropTypes.number,
  drawPageCnt: PropTypes.number,
}

export default Pagination;
