CheckList example:

```js
const CheckListExample = () => {
  const data = [
    {
      id: 1,
      name: 'name 1',
      checked: true,
    },
    {
      id: 2,
      name: 'name 2',
    },
    {
      id: 3,
      name: 'name 3',
    },
    {
      id: 4,
      name: 'name 4',
    },
    {
      id: 5,
      name: 'name 5',
    },
    {
      id: 6,
      name: 'name 6',
    },
  ]

  const limit = 5
  let onChange
  let onError

  return (
    <CheckList data={data} limit={limit} onChange={onChange} onError={onError} />
  )
}

CheckListExample()
```