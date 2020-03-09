Pagination example:

```js
import React, { useState } from 'react'

const PaginationExample = () => {
  const [page, setPage] = useState(2);
  const onChange = (p) => (setPage(p))
  return (
    <Pagination
      selectPage={page}
      totalPage={6}
      drawPageCnt={5}
      onChange={onChange}
    />
  )
}

PaginationExample()
```