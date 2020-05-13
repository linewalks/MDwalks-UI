Font example

```js
import * as font from '@src/assets/styles/font';

<font.TextOverflow width="100px">
  한 줄 tex overflow 인 경우
</font.TextOverflow>
```


```js
import * as font from '@src/assets/styles/font';

<font.TextOverflowMulti width="100px" line={3}>
  여러 줄 tex overflow 인 경우
  여러 줄 tex overflow 인 경우
  여러 줄 tex overflow 인 경우
</font.TextOverflowMulti>
```