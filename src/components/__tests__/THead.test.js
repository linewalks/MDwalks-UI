import React from 'react';
import _ from 'lodash'
import { shallow, mount } from 'enzyme';
import THead from '@Table/THead'

describe('THead', () => {
  it('default', () => {
    const headers = ['1', '2', '3']
    const wrapper = mount(
      <table>
        <THead
          headers={headers}
        />
      </table>,
    )
    expect(wrapper.text()).toBe(headers.join(''))
  })

  it('set colSpan', () => {
    const headers = [
      { text: '1', colSpan: 2 }, { text: '2', colSpan: 2 },
    ]
    const wrapper = mount(
      <table>
        <THead
          headers={headers}
        />
      </table>,
    )

    expect(wrapper.find('th').at(0).prop('colSpan')).toBe(_.first(headers).colSpan)
  })
})
