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
})
