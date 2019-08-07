import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from '@Table/Table';

const data = {
  exceptSubHeaders: {
    headers: ['a', 'b', 'c'],
    rowData: [
      {
        'a': 1,
        'b': 2,
        'c': 3
      },
      {
        'a': 4,
        'b': 5,
        'c': 6
      },
      {
        'a': 7,
        'b': 8,
        'c': 9
      },
    ]
  },

  includeSubHeaders: {
    headers: ['a', 'b', 'c'],
    subHeaders: {
      b: ['d', 'e'],
      c: ['f', 'g']
    },
    rowData: [
      {
        'a': 1,
        'd': 2,
        'e': 3,
        'f': 4,
        'g': 5
      },
      {
        'a': 6,
        'd': 7,
        'e': 8,
        'f': 9,
        'g': 10
      },
      {
        'a': 11,
        'd': 12,
        'e': 13,
        'f': 14,
        'g': 15
      },
    ]
  }
}

describe('Table Component', () => {
  it('render error message when there is no data', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper.html()).toEqual("<div>There is no data<br/>Please search agains</div>");
  })

  it('render table when there is data excpet subHeaders', () => {
    const wrapper = mount(<Table data={data.exceptSubHeaders} />)
    expect(wrapper.find('thead tr')).toHaveLength(1);
    expect(wrapper.find('thead th')).toHaveLength(3);
    expect(wrapper.find('tbody tr')).toHaveLength(3);
    expect(wrapper.find('tbody td')).toHaveLength(9);
  })

  it('render table when there is data include subHeaders', () => {
    const wrapper = mount(<Table data={data.includeSubHeaders} />)
    const subHeaders = Object.values(data.includeSubHeaders.subHeaders).flat()
    const firstRowData = Object.values(data.includeSubHeaders.rowData[0])

    expect(wrapper.find('thead td').map(node => node.text())).toEqual(subHeaders)
    expect(wrapper.find('tbody tr:first-child td').map(node => Number(node.text()))).toEqual(firstRowData);
  })
})
