Pagination example:

```js
import React, { useState } from 'react'

;(() => {
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
})();
```

```js
import React, { useState } from 'react'

;(() => {
  const [page, setPage] = useState(2);
  const onChange = (p) => (setPage(p))
  return (
    <Pagination
      selectPage={page}
      size="sm"
      totalPage={6}
      drawPageCnt={5}
      onChange={onChange}
      align="left"
    />
  )
})();
```

```js
import React, { useState } from 'react'

;(() => {
  const [page, setPage] = useState(2);
  const onChange = (p) => (setPage(p))
  return (
    <Pagination
      simple={true}
      selectPage={page}
      size="sm"
      totalPage={6}
      drawPageCnt={5}
      onChange={onChange}
      align="right"
    />
  )
})();
```