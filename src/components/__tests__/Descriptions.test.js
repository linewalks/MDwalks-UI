import React from 'react';
import { shallow } from 'enzyme';
import Descriptions, {
  isLastRow, isLastCell, hasRow, getColspan,
} from '@Table/Descriptions';

const data = [
  { 'Drug Count': '1231' },
  { 'Unique Drug Count': '123' },
  { 'Condition Count': '999999' },
  { 'Unique Condition Count': '8888' },
  { 'Patient Count': '7777' },
]

describe('Util', () => {
  it('isLastRow', () => {
    expect(isLastRow({ cellTotal: 4, cellCount: 2, rowCurrent: 0 })).toBe(false)
    expect(isLastRow({ cellTotal: 4, cellCount: 2, rowCurrent: 1 })).toBe(true)

    expect(isLastRow({ cellTotal: 5, cellCount: 3, rowCurrent: 0 })).toBe(false)
    expect(isLastRow({ cellTotal: 5, cellCount: 3, rowCurrent: 1 })).toBe(true)
  })

  it('isLastCell', () => {
    expect(isLastCell({ cellTotal: 5, cellCurrent: 5 })).toBe(true)
    expect(isLastCell({ cellTotal: 5, cellCurrent: 4 })).toBe(false)
  })

  it('hasRow', () => {
    expect(hasRow({ cellTotal: 6, cellCount: 3, cellCurrent: 4 })).toBe(false)
    expect(hasRow({ cellTotal: 5, cellCount: 3, cellCurrent: 4 })).toBe(true)
    expect(hasRow({ cellTotal: 5, cellCount: 3, cellCurrent: 0 })).toBe(false)
    expect(hasRow({ cellTotal: 5, cellCount: 1, cellCurrent: 4 })).toBe(false)
  })

  it('getColspan', () => {
    expect(getColspan({ cellTotal: 3, cellCount: 3, cellCurrent: 2 })).toBe(0)
    expect(getColspan({ cellTotal: 5, cellCount: 3 })).toBe(3)
    expect(getColspan({ cellTotal: 5, cellCount: 4 })).toBe(7)
    expect(getColspan({ cellTotal: 5, cellCount: 4 })).toBe(7)
    expect(getColspan({ cellTotal: 6, cellCount: 4 })).toBe(5)
    expect(getColspan({ cellTotal: 6, cellCount: 5 })).toBe(9)
  })
})

describe('Descriptions Component', () => {
  const wrapper = shallow(<Descriptions data={data} />)

  it('default', () => {
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(2)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(2)
    expect(render.find('tr').eq(2).find('td')).toHaveLength(1)
  })

  it('cellCount set 1', () => {
    wrapper.setProps({ cellCount: 1 })
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(2).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(3).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(4).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(4).find('td').prop('colspan')).toBe(undefined)
  })

  it('cellCount set 3', () => {
    wrapper.setProps({ cellCount: 3 })
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(3)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(2)
    expect(render.find('tr').eq(1).find('td').eq(1)
      .prop('colspan')).toBe('3')
  })

  it('cellCount set 4', () => {
    wrapper.setProps({ cellCount: 4 })
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('td')).toHaveLength(4)
    expect(render.find('tr').eq(1).find('td')).toHaveLength(1)
    expect(render.find('tr').eq(1).find('td').eq(0)
      .prop('colspan')).toBe('7')
  })
})

describe('width', () => {
  const wrapper = shallow(<Descriptions data={data} />)

  it('default', () => {
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('th').eq(0)
      .prop('width')).toBe('auto')
    expect(render.find('tr').eq(0).find('td').eq(0)
      .prop('width')).toBe('auto')
  })

  it('set 250, 150, 250, 150', () => {
    wrapper.setProps({ colWidths: [250, 150, 250, 150] })
    const render = wrapper.render()
    expect(render.find('tr').eq(0).find('th').eq(0)
      .prop('width')).toBe('250px')
    expect(render.find('tr').eq(0).find('td').eq(0)
      .prop('width')).toBe('150px')
  })
})
