# MDwalks-UI 컴포넌트 정의서 템플릿
Modified Date | Author | Comment
--- | --- | --- |
2021-01-26 | Seonyeong Jang | 템플릿 초안 작성(예시는 테이블)

### Name
* Table

### Description
* Table은 기본적인 html table의 형태를 가지며, 내장 기능으로 sorting, scroll 기능을 지니고 있습니다.
* (en)Table has the form of a basic html table and has sorting and scrolling functions as built-in functions.

### Feature
  - [table-size](#table-size)
  - [sorting](#sorting)
  - [scroll](#scroll)
  - [sub-Header](#sub-header)
  - [table-footer](#table-footer)

### Structure
  - Table
    - THead
    - TBody
    - TFoot

### Feature Details

#### table size
```javascript
<Table
  data={{
    headers: ['a', 'b', 'c'],
    rowData: [[1, 2, 3]],
  }}
  size='small'  // default: medium
/>
```

#### sorting
```javascript
<Table
  size="small"
  data={{
    headers: [
      'a',
      {
        text: 'b',
        sort: (a, b) => {console.log(a, b)}
      },
      'c',
    ],
    rowData: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  }}
  sortOrderList={['asc', 'desc', '']}
>
</Table>
```

#### scroll
```javascript
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
  }}
/>
```

#### sub header
```javascript
<Table
  data={{
    headers: ['2013년', '2014년', '성장률'],
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
        'a1': '3,112',
        'a2': '64.7%',
        'b1': '3,474',
        'b2': '66.3%',
        'c1': '12.6%',
        'c2': '33.2%',
      },
    ]
  }}
/>
```

#### table footer
```javascript
<Table
  data={{
    headers: ['a', 'b', 'c'],
    rowData: [
      [1, 2, 3],
    ],
    footData: [
      ['t1', 't2', 't3'],
      ['t4', 't5', 't6']
    ]
  }}
/>
```