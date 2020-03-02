TreeMap example:

```js
const TreeMapExample = () => {

  const data = {
    parents: [
      {
        colorValue: 0,
        id: 'A',
        name: 'A',
        value: 3
      },
      {
        colorValue: 0,
        id: 'B',
        name: 'B',
        value: 9
      },
      {
        colorValue: 0,
        id: 'C',
        name: 'C',
        value: 17
      },
    ],

    children: [
      {
        colorValue: 0,
        name: 'CA1',
        parent: 'A',
        value: 4
      },
      {
        colorValue: 0,
        name: 'CA2',
        parent: 'A',
        value: 34
      },
      {
        colorValue: 0,
        name: 'CA3',
        parent: 'A',
        value: 14
      },
      {
        colorValue: 0,
        name: 'BBA1',
        parent: 'B',
        value: 48
      },
      {
        colorValue: 0,
        name: 'BBA2',
        parent: 'B',
        value: 81
      },
      {
        colorValue: 0,
        name: 'BBA3',
        parent: 'B',
        value: 65
      },
      {
        colorValue: 0,
        name: 'CBE1',
        parent: 'C',
        value: 29
      },
      {
        colorValue: 0,
        name: 'CBE2',
        parent: 'C',
        value: 99
      },
      {
        colorValue: 0,
        name: 'CBE3',
        parent: 'C',
        value: 75
      },
    ]
  }

  return (
    <TreeMap
      data={[...data.parents, ...data.children]}
    />
  )
}

TreeMapExample()
```