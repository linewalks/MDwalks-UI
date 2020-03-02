import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
import Pagination from '@Components/pagination/Pagination';

import _ from 'lodash'

configure({ adapter: new Adapter() });

const props = {
  selectPage: 1, totalPage: 6, drawPageCnt: 5,
}

it('init', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  expect(wrapper.state('selectPage')).toBe(props.selectPage)
  expect(wrapper.state('totalPage')).toBe(props.totalPage)
  expect(wrapper.state('drawPageCnt')).toBe(props.drawPageCnt)
  expect(wrapper.state('list')).toEqual(_.range(1, 6))
})

it('disable move Prev button', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(true)

  wrapper.setState({ selectPage: drawPageCnt, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(true)

  wrapper.setState({ selectPage: drawPageCnt + 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(false)
})

it('disable move Next button', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disableNextButton()).toBe(true)

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().disableNextButton()).toBe(false)

  wrapper.setState({ selectPage: 6, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().disableNextButton()).toBe(true)
})

it('getPrevPage, getNextPage', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setState({ selectPage: 6, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getPrevPage()).toBe(1)

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getPrevPage()).toBe(null)

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getNextPage()).toBe(6)

  wrapper.setState({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().getNextPage()).toBe(6)
})

it('draw list', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)

  wrapper.setState({ selectPage: 1, totalPage: 3, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 4))

  wrapper.setState({ selectPage: 1, totalPage: 5, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 6))

  wrapper.setState({ selectPage: 2, totalPage: 5, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 6))

  wrapper.setState({ selectPage: 6, totalPage: 7, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(6, 8))

  wrapper.setState({ selectPage: 6, totalPage: 11, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(6, 11))
})

const getButtons = (wrapper) => {
  const pagingElements = {}
  wrapper.find(`button`).forEach((element) => {
    if (element.text()) {
      pagingElements[element.text()] = element
    }
  })

  return pagingElements
}

it('button style', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const styles = wrapper.instance().getStyles()
  const changePage = props.selectPage + 1

  let pagingElements = getButtons(wrapper)
  expect(pagingElements[props.selectPage].props().style).toEqual(styles.selectBtn)
  expect(pagingElements[changePage].props().style).toEqual(styles.defaultBtn)

  pagingElements[changePage].simulate('click')
  pagingElements = getButtons(wrapper)
  expect(pagingElements[props.selectPage].props().style).not.toEqual(styles.selectBtn)
  expect(pagingElements[changePage].props().style).toEqual(styles.selectBtn)
})

it('onChange', () => {
  const onChange = jest.fn()
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
    onChange={onChange}
  />)
  const changePage = props.selectPage + 1
  const pagingElements = getButtons(wrapper)
  pagingElements[changePage].simulate('click')
  expect(onChange).toHaveBeenNthCalledWith(1, 2)

  pagingElements[props.selectPage].simulate('click')
  expect(onChange).toHaveBeenNthCalledWith(2, 1)
})


it('isHidden', () => {
  const wrapper = shallow(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)

  wrapper.setState({ totalPage: 1 })
  expect(wrapper.get(0).props.style.display).toBe(undefined)

  wrapper.setState({ totalPage: 0 })
  expect(wrapper.get(0).props.style.display).toBe('none')
})

describe('sm', () => {
  it('getPrevPage, getNextPage', () => {
    const selectPage = 2
    const wrapper = shallow(<Pagination size="sm" selectPage={selectPage} totalPage="5" />)
    expect(wrapper.instance().getPrevPage()).toBe(selectPage - 1)
    expect(wrapper.instance().getNextPage()).toBe(selectPage + 1)
  })
})
