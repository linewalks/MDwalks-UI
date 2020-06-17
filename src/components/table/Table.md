Table example:

#### List Sub Head Table
```js
<Table
  data={{
    headers: ['스위칭 의약품', '2013년', '2014년', '성장률'],
    subHeaders: {
      "2013년": ['처방건수', '비율'],
      "2014년": ['처방건수', '비율'],
      "성장률": ['CAGR', 'YOY'],
    },
    group: {
      '유지': ['A'],
      '추가': ['AB', 'AC'],
      '변경': ['B']
    },
    rowData: [
      {
        'a1': 'A',
        'b1': '3,112',
        'b2': '64.7%',
        'c1': '3,474',
        'c2': '66.3%',
        'd1': '12.6%',
        'd2': '33.2%',
      },
    ]
  }}
/>
```

#### List Table
```js
<Table
  className={'sideFit'}
  data={{
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
  }}
/>
```

#### Data Array List
```js
<Table
  data={{
    headers: ['a', 'b', 'c'],
    rowData: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    footData: [
      ['t1', 't2', 't3'],
      ['t4', 't5', 't6']
    ]
  }}
/>
```

#### rowSpan List Table
```js
<Table
  data={{
    headers: ['a', 'b', 'c', 'd', 'e'],
    rowData: [
      [{rowSpan: 3, text: 'a1'}, 'b1', {rowSpan: 2, text: 'c1'}, {rowSpan: 2, text: 'd1'}, 'e1'],
      ['b2', 'e2'],
      ['b3', 'c3', 'd3', 'e3'],
      [{rowSpan: 2, text: 'a2', className: 'odd'}, 'b4', 'c4', 'd4', 'e4'],
      ['b5', 'c5', 'd5', 'e5'],
    ]
  }}>
</Table>
```

##### Empty List Table
```js
<Table
  data={{
    headers: ['a', 'b', 'c'],
  }}>
</Table>
```

##### Sort List Table
```js
import React, { useState, useEffect } from 'react'

(() => {
  const [loading, setLoading] = useState(false)
  const onChange = (e) => {
    setLoading(e.target.checked)
  }

  return (
    <>
      <input type="checkbox" onChange={onChange} /><span>loading</span>
      <Table
        size="small"
        loading={loading}
        data={{
          headers: ['a', 'b', { text: 'c', sort: function(a, b) { console.log(a, b) } }],
          rowData: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          footData: [
            ['t1', 't2', 't3'],
            ['t4', 't5', 't6']
          ]
        }}
      >
      </Table>
    </>
  )
})()

```

#### scroll Array List
```js
<Table
  columns={[100, 'auto', 300]}
  scroll={{ y: 215 }}
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
      ['t1',  {colSpan: 2, text: 't3'}],
    ]
  }}
/>
```

#### Table size small
```js
<Table
  data={{
    headers: ['a', 'b', 'c'],
    rowData: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    footData: [
      ['t1', 't2', 't3'],
      ['t4', 't5', 't6']
    ]
  }}
  size='small'  // default: medium
/>
```

#### Row Header Table(Custom)
```js
import styled from 'styled-components'

const WrapTable = styled.section`
  table {
    tr td:first-child {
      background: #f3f6f8;
      border-right: 1px solid #e7ebee;
    }
  }
`

const showTable = () => (
  <WrapTable>
    <Table
      data={{
        headers: [' ', 'b', 'c'],
        rowData: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ],
      }}
    />
  </WrapTable>
)

showTable()
```


#### Vertical Scroll Table(Cutom)
```js
import styled from 'styled-components'

const WrapTable = styled.section`
  display: flex;
`

const WrapFixedTable = styled.section`
  width: 200px;
  thead th:last-child {
    border-radius: 0;
  }
  table {
    border-right: 1px solid #e7ebee;
  }
`

const WrapScrollingTable = styled.section`
  overflow-x: scroll;
  thead th:first-child {
    border-radius: 0;
  }
`

const showTable = () => (
  <WrapTable>
    <WrapFixedTable>
      <Table
        data={{
          headers: ['A', 'B'],
          rowData: [
            [{ rowSpan: 2, text: 'A1'}, 'B1'],
            ['B2'],
          ],
        }}
      />
    </WrapFixedTable>
    <WrapScrollingTable>
      <Table
        data={{
          headers: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'],
          rowData: [
            [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
            [4, 5, 6, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
          ],
        }}
      />
    </WrapScrollingTable>
  </WrapTable>
)

showTable()
```