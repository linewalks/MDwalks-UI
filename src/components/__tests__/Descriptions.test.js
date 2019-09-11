import React from 'react';
import { shallow } from 'enzyme';
import Descriptions from '@Table/Descriptions';

const data = [
  {'Drug Count':	'1231'},
  {'Unique Drug Count':	'123'},
  {'Condition Count':	'999999'},
  {'Unique Condition Count': '8888'},
  {'Patient Count': '7777'}
]

describe('Descriptions Component', () => {
  const wrapper = shallow(<Descriptions data={data} />)

  it('default', () => {
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(2)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(2)
    expect(render.find('tr').eq(2).find('td')).toHaveLength(1)
  })

  it('row set 1', () => {
    wrapper.setProps({row: 1})
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(2).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(3).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(4).find('td')).toHaveLength(1)
  })

  it('row set 3', () => {
    wrapper.setProps({row: 3})
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(3)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(2)
  })
})
