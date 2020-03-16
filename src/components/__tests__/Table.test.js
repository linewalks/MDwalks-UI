import React from 'react';
import _ from 'lodash'
import { shallow, mount } from 'enzyme';
import Table from '@Table/Table';

const data = {
  exceptSubHeaders: {
    headers: ['a', 'b', 'c'],
    rowData: [
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 4,
        b: 5,
        c: 6,
      },
      {
        a: 7,
        b: 8,
        c: 9,
      },
    ],
  },

  includeSubHeaders: {
    headers: ['a', 'z', 'b', 'c'],
    subHeaders: {
      b: ['d', 'e'],
      c: ['f', 'g'],
    },
    rowData: [
      {
        a: 1,
        z: 1,
        d: 2,
        e: 3,
        f: 4,
        g: 5,
      },
      {
        a: 6,
        z: 1,
        d: 7,
        e: 8,
        f: 9,
        g: 10,
      },
      {
        a: 11,
        z: 1,
        d: 12,
        e: 13,
        f: 14,
        g: 15,
      },
    ],
  },
}

describe('Table Component', () => {
  it('render error message when there is no data', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper.html()).toEqual('<div>There is no data<br/>Please search agains</div>');
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
    const subHeaders = _.flatten(Object.values(data.includeSubHeaders.subHeaders))
    const firstRowData = Object.values(data.includeSubHeaders.rowData[0])

    expect(wrapper.find('thead td').map((node) => node.text())).toEqual(subHeaders)
    expect(wrapper.find('tbody tr:first-child td').map((node) => Number(node.text()))).toEqual(firstRowData);
  })
})

describe('wrapTh', () => {
  it('default', () => {
    const wrapper = mount(<Table data={data.exceptSubHeaders} />)
    expect(wrapper.find('th').map((node) => node.text()).join('')).toEqual(`abc`)
  })

  it('set wrapTh', () => {
    const wrapTh = ({ text }) => `<span>${text.toLowerCase()}</span>`
    const wrapper = mount(<Table data={data.exceptSubHeaders} wrapTh={wrapTh} />)
    expect(wrapper.find('th').map((node) => node.text()).join('')).toEqual(`<span>${data.exceptSubHeaders.headers.join('</span><span>')}</span>`)
  })
})

describe('td rowSpan', () => {
  it('default', () => {
    const rowSpan = 3
    const data1 = {
      headers: ['a', 'b', 'c'],
      rowData: [
        [{ rowSpan, text: 'a' }, 'b1', 'c1'],
        ['b2', 'c2'],
      ],
    }
    const wrapper = mount(<Table data={data1} />)
    expect(wrapper.find('td').first().prop('rowSpan')).toBe(rowSpan)
    expect(wrapper.find('td')).toHaveLength(5)
  })

  /**
   * A B-B1 B-B2
   * a b1_1 b2_1
   *        b2_2
   *   b1_3 b2_3
   *        b2_4
   */

  it('subHeader', () => {
    const rowSpan = 4
    const rowSpanCount = 1
    const data1 = {
      headers: ['A', 'B'],
      subHeaders: {
        B: ['B1', 'B2'],
      },
      rowData: [
        [{ rowSpan, text: 'a' }, { rowSpan: 2, text: 'b1_1' }, 'b2_1'],
        ['b2_2'],
        [{ rowSpan: 2, text: 'b1_3' }, 'b2_3'],
        ['b2_4'],
      ],
    }

    const expected = [
      'B-B2 2', 'B-B1 1', 'A 0',
      'B-B2 2',
      'B-B2 2', 'B-B1 1',
      'B-B2 2',
    ]

    const target = []
    const wrapTd = ({ label, idx }) => {
      target.push(`${label} ${idx}`)
    }
    const wrapper = mount(<Table data={data1} wrapTd={wrapTd} rowSpanCount={rowSpanCount} />)

    expect(target).toEqual(expected)
    expect(wrapper.find('tbody td').first().prop('rowSpan')).toBe(rowSpan)
    expect(wrapper.find('tbody tr').at(0).find('td')).toHaveLength(3)
    expect(wrapper.find('tbody tr').at(1).find('td')).toHaveLength(1)
    expect(wrapper.find('tbody tr').at(2).find('td')).toHaveLength(2)
    expect(wrapper.find('tbody tr').at(3).find('td')).toHaveLength(1)
  })
})

it('check undefined, null', () => {
  const EmptyTableData = {
    headers: [
      'subject Id',
      'risk Score',
    ],
    rowData: [
      {
        'subject Id': undefined,
        'risk Score': null,
      },
    ],
  }

  mount(<Table data={EmptyTableData} />)
})

describe('check scroll ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Table
      columns={[100, 'auto', 300]}
      scroll={{ y: 300 }}
      data={{
        headers: ['a', 'b', 'c'],
        rowData: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
          [13, 14, 15],
        ],
        footData: [
          ['t1', 't2', 't3'],
        ],
      }}
    />)
  })

  it('set style', () => {
    expect(wrapper.find('table')).toHaveLength(3)

    expect(wrapper.find('div').at(4).prop('style')).toEqual({
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: 300,
    })

    expect(wrapper.find('div').at(5).prop('style')).toEqual({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch',
      marginRight: 0,
      marginBottom: 0,
    })
  })
})
