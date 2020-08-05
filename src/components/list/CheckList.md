CheckList example:

```js
import { useState } from 'react';
import Button from '@Components/button/Button';
const CheckListExample = () => {
  const [data, setData] = useState([
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
  ]);

  const [selected, setSelected] = useState([]);

  const unCheckedAll = () => {
    setSelected([]);
  }

  const checkedAll = () => {
    const newSelected = _.map(data, (item) => item.id);
    setSelected(newSelected);
  }

  const onChange = (id, newSelected) => {
    console.log(id, newSelected)
    setSelected(newSelected)
  }

  const onError = ({ limit }) => {
    console.error(limit)
  }

  const limit = 5

  return (
    <>
      <Button variant="primary" onClick={checkedAll}>checked All</Button>
      <Button variant="primary" onClick={unCheckedAll}>unChecked All</Button>
      <CheckList
        data={data}
        limit={limit}
        onChange={onChange}
        onError={onError}
        selected={selected}
      />
    </>
  )
}

CheckListExample()
```