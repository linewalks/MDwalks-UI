import React from 'react'
import _ from 'lodash'
import { mount } from 'enzyme'
import THead from '@Table/THead'

// 빈경우
// subHeaderData && headerData 둘 다 가 없는 경우

//  - colSpan 적용
//  - wrapTh 적용
const sortOrderList = ['asc', 'desc', '']

describe('headerData, subHeaderData 둘 다 없는 경우', () => {
  let wrapper

  it('headerData 가 없는 경우', () => {
    wrapper = mount(
      <table>
        <THead sortOrderList={sortOrderList} />
      </table>,
    )
    expect(wrapper.find('tr')).toHaveLength(1)
    expect(wrapper.find('td')).toHaveLength(0)
    expect(wrapper.find('th')).toHaveLength(1)
    expect(wrapper.find('th').text()).toEqual('\u00a0');
  })
})

describe('subHeaderData 가 없는 경우', () => {
  let wrapper

  it('colspan 이 있는 경우 ', () => {
    const headers = ['1', '2', { colSpan: 2, text: '3' }]

    wrapper = mount(
      <table>
        <THead
          headers={headers}
          sortOrderList={sortOrderList}
        />
      </table>,
    )

    expect(wrapper.find('tr')).toHaveLength(1)
    expect(wrapper.text()).toBe('123')

    expect(wrapper.find('th').map((node) => (
      node.prop('colSpan')
    ))).toEqual([undefined, undefined, _.last(headers).colSpan])

    expect(wrapper.find('th').map((node) => (
      node.prop('rowSpan')
    ))).toEqual([undefined, undefined, undefined])
  })

  it('wrapTh 이 있는 경우 ', () => {
    const headers = ['1', '2', '3']
    const wrapThSpy = jest.fn()
    const wrapTh = (props) => {
      wrapThSpy(props)
      return `${props.text}-`
    }

    wrapper = mount(
      <table>
        <THead
          headers={headers}
          wrapTh={wrapTh}
          sortOrderList={sortOrderList}
        />
      </table>,
    )

    expect(wrapper.find('tr').text()).toBe(`${headers.join('-')}-`)
    expect(wrapThSpy.mock.calls).toEqual([[{ text: '1' }], [{ text: '2' }], [{ text: '3' }]])
  })
})

describe('subHeaderData 가 있는 경우', () => {
  let wrapper

  const headers = ['1', '2', '3']

  const subHeaders = {
    1: ['1a', '1b', '1c'],
    3: ['3a', '3b'],
  }

  const subHeaderText = _.chain(subHeaders)
    .values()
    .flattenDeep()
    .join('')
    .value()

  it('wrapTh 가 없을 때', () => {
    wrapper = mount(
      <table>
        <THead
          headers={headers}
          subHeaders={subHeaders}
          sortOrderList={sortOrderList}
        />
      </table>,
    )

    expect(wrapper.find('tr')).toHaveLength(2)
    expect(wrapper.find('tr').at(0).text()).toBe(headers.join(''))
    expect(wrapper.find('tr').at(1).text()).toBe(subHeaderText)

    expect(wrapper.find('th').map((node) => (
      node.prop('rowSpan')
    ))).toEqual([undefined, 2, undefined])

    expect(wrapper.find('th').map((node) => (
      node.prop('colSpan')
    ))).toEqual([3, undefined, 2])
  })

  it('wrapTh 가 있을 때, subHeaders 는 wrapTh 가 호출 되지 않느다', () => {
    const wrapTh = jest.fn()
    wrapper = mount(
      <table>
        <THead
          headers={headers}
          subHeaders={subHeaders}
          wrapTh={wrapTh}
          sortOrderList={sortOrderList}
        />
      </table>,
    )

    expect(wrapTh.mock.calls).toEqual([[{ text: '1' }], [{ text: '2' }], [{ text: '3' }]])
  })
})

describe('sort', () => {
  let wrapper
  let sortSpy = jest.fn()
  let sortSpy1 = jest.fn()
  let th
  beforeEach(() => {
    sortSpy = jest.fn()
    sortSpy1 = jest.fn()
    const headers = [
      'a',
      'b',
      {
        text: 'c',
        sort: sortSpy,
      },
      {
        text: 'd',
        sort: sortSpy1,
      },
    ]

    wrapper = mount(
      <table>
        <THead
          headers={headers}
          sortOrderList={sortOrderList}
        />
      </table>,
    )

    th = wrapper.find('th')
  })

  it('sort 가 있으면 그려진다', () => {
    expect(th.at(0).find('button')).toHaveLength(0)
    expect(th.at(1).find('button')).toHaveLength(0)
    expect(th.at(2).find('button')).toHaveLength(1)
    expect(th.at(3).find('button')).toHaveLength(1)
  })

  it('asc, desc, 빈문자열 순으로 반환 된다 ', () => {
    th.at(2).find('button').simulate('click')
    th.at(2).find('button').simulate('click')
    th.at(2).find('button').simulate('click')

    expect(sortSpy).toHaveBeenNthCalledWith(1, 'c', 'asc')
    expect(sortSpy).toHaveBeenNthCalledWith(2, 'c', 'desc')
    expect(sortSpy).toHaveBeenNthCalledWith(3, 'c', '')
  })

  it('sort 시 기존에 다른 sort 된 th 가 있으면 빈문자열을 반환 된다 ', () => {
    th.at(2).find('button').simulate('click')
    th.at(2).find('button').simulate('click')

    th.at(3).find('button').simulate('click')

    expect(sortSpy).toHaveBeenNthCalledWith(1, 'c', 'asc')
    expect(sortSpy).toHaveBeenNthCalledWith(2, 'c', 'desc')
    expect(sortSpy1).toHaveBeenNthCalledWith(1, 'd', 'asc')
  })
})
