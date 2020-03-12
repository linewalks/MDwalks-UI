import React from 'react';
import _ from 'lodash'
import { mount } from 'enzyme';
import THead from '@Table/THead'

// 빈경우
// subHeaderData && headerData 둘 다 가 없는 경우

//  - colSpan 적용
//  - wrapTh 적용

describe('headerData, subHeaderData 둘 다 없는 경우', () => {
  let wrapper

  it('headerData 가 없는 경우', () => {
    wrapper = mount(
      <table>
        <THead />
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
        />
      </table>,
    )

    expect(wrapper.find('tr')).toHaveLength(1)
    expect(wrapper.text()).toBe('123')
    expect(wrapper.find('th').at(0).prop('colSpan')).toBe(undefined)
    expect(wrapper.find('th').at(2).prop('colSpan')).toBe(_.last(headers).colSpan)
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
    1: ['1a', '1b'],
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
        />
      </table>,
    )

    expect(wrapper.find('tr')).toHaveLength(2)
    expect(wrapper.find('tr').at(0).text()).toBe(headers.join(''))
    expect(wrapper.find('tr').at(1).text()).toBe(subHeaderText)

    expect(wrapper.find('th').map((node) => (
      node.prop('rowSpan')
    ))).toEqual([undefined, 2, undefined])
  })

  it('wrapTh 가 있을 때, subHeaders 는 wrapTh 가 호출 되지 않느다', () => {
    const wrapTh = jest.fn()
    wrapper = mount(
      <table>
        <THead
          headers={headers}
          subHeaders={subHeaders}
          wrapTh={wrapTh}
        />
      </table>,
    )

    expect(wrapTh.mock.calls).toEqual([[{ text: '1' }], [{ text: '2' }], [{ text: '3' }]])
  })
})
