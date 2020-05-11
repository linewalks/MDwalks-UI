import React from 'react';
import { mount } from 'enzyme';
import TFoot from '@Table/TFoot'

describe('TFoot', () => {
  it('default', () => {
    const footData = [['1', '2', '3']]
    const wrapper = mount(
      <table>
        <TFoot
          footData={footData}
        />
      </table>,
    )
    expect(wrapper.find('tfoot').find('tr').first().text()).toBe(footData[0].join(''))
  })

  it('empty', () => {
    const wrapper = mount(
      <table>
        <TFoot />
      </table>,
    )
    expect(wrapper.find('tfoot').length).toBe(0)
  })

  it('colSpan', () => {
    const footData = [[{ colSpan: 2, text: '1' }, '2']]
    const wrapper = mount(
      <table>
        <TFoot
          footData={footData}
        />
      </table>,
    )
    expect(wrapper.find('tfoot').find('td').first().props().colSpan).toBe(2)
    expect(wrapper.find('tfoot').find('td').first().text()).toBe('1')

    expect(wrapper.find('tfoot').find('td').last().props().colSpan).toBe(undefined)
    expect(wrapper.find('tfoot').find('td').last().text()).toBe('2')
  })
})
