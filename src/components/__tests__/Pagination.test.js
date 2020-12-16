import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Pagination, {
  ButtonPage,
  ButtonMove,
  PaginationBox,
} from '@Components/pagination/Pagination'

import _ from 'lodash'

const props = {
  selectPage: 1, totalPage: 6, drawPageCnt: 5,
}

it('defaultProps', () => {
  const wrapper = mount(<Pagination />)
  expect(wrapper.state('selectPage')).toBe(1)
  expect(wrapper.state('totalPage')).toBe(1)
  expect(wrapper.state('drawPageCnt')).toBe(1)
  expect(wrapper.prop('size')).toBe(undefined)
  expect(wrapper.state('list')).toEqual(_.range(1, 2))
})

it('init', () => {
  const wrapper = mount(<Pagination
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
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(true)

  wrapper.setProps({ selectPage: drawPageCnt, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(true)

  wrapper.setProps({ selectPage: drawPageCnt + 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disablePrevButton()).toBe(false)
})

it('disable move Next button', () => {
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().disableNextButton()).toBe(true)

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().disableNextButton()).toBe(false)

  wrapper.setProps({ selectPage: 6, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().disableNextButton()).toBe(true)
})

it('getPrevPage, getNextPage', () => {
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const { drawPageCnt } = props

  wrapper.setProps({ selectPage: 6, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getPrevPage()).toBe(1)

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getPrevPage()).toBe(null)

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt * 2 })
  expect(wrapper.instance().getNextPage()).toBe(6)

  wrapper.setProps({ selectPage: 1, totalPage: drawPageCnt })
  expect(wrapper.instance().getNextPage()).toBe(6)
})

it('draw list', () => {
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)

  wrapper.setProps({ selectPage: 1, totalPage: 3, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 4))

  wrapper.setProps({ selectPage: 1, totalPage: 5, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 6))

  wrapper.setProps({ selectPage: 2, totalPage: 5, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(1, 6))

  wrapper.setProps({ selectPage: 6, totalPage: 7, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(6, 8))

  wrapper.setProps({ selectPage: 6, totalPage: 11, drawPageCnt: 5 })
  expect(wrapper.instance().getPageList()).toEqual(_.range(6, 11))
})

const getButtons = (wrapper) => {
  const pagingElements = {}
  wrapper.find(ButtonPage).forEach((element) => {
    if (element.text()) {
      pagingElements[element.text()] = element
    }
  })

  return pagingElements
}

it('button style', () => {
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)
  const changePage = props.selectPage + 1
  expect(getButtons(wrapper)[props.selectPage].prop('selected')).toBeTruthy()
  expect(getButtons(wrapper)[changePage].prop('selected')).toBeFalsy()
  wrapper.setProps({ selectPage: changePage })
  // props 변경으로 인한 force update
  expect(getButtons(wrapper)[props.selectPage].prop('selected')).toBeFalsy()
  expect(getButtons(wrapper)[changePage].prop('selected')).toBeTruthy()
})

it('onChange', () => {
  const onChange = jest.fn()
  const wrapper = mount(<Pagination
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
  const wrapper = mount(<Pagination
    selectPage={props.selectPage}
    totalPage={props.totalPage}
    drawPageCnt={props.drawPageCnt}
  />)

  wrapper.setProps({ totalPage: 1 })
  expect(wrapper.find(PaginationBox).prop('isHidden')).toBeFalsy()

  wrapper.setProps({ totalPage: 0 })
  expect(wrapper.find(PaginationBox).prop('isHidden')).toBeTruthy()
})

describe('sm', () => {
  it('getPrevPage, getNextPage', () => {
    const selectPage = 2
    const wrapper = shallow(<Pagination size="sm" selectPage={selectPage} totalPage={5} />)
    expect(wrapper.instance().getPrevPage()).toBe(selectPage - 1)
    expect(wrapper.instance().getNextPage()).toBe(selectPage + 1)
  })
})

describe('simple pagination', () => {
  it('default', async () => {
    const wrapper = mount(<Pagination
      selectPage={props.selectPage}
      totalPage={props.totalPage}
      drawPageCnt={props.drawPageCnt}
      simple
    />)

    const instance = wrapper.instance()

    const spyOnChange = jest.spyOn(instance, 'onChange')
    expect(spyOnChange).toBeCalledTimes(0)
    await act(async () => {
      wrapper.find(ButtonMove).last().simulate('click')
      wrapper.update()
    })
    expect(spyOnChange).toBeCalledTimes(1)

    wrapper.setProps({ selectPage: props.totalPage }) // last 버튼 동작 반영

    await act(async () => {
      wrapper.find(ButtonMove).first().simulate('click')
      wrapper.update()
    })
    expect(spyOnChange).toBeCalledTimes(2)
  })
})
