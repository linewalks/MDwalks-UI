import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import * as font from '@src/assets/styles/font';

describe('font.TextOverflow', () => {
  it('default', () => {
    const TextOverflow = renderer.create(
      <font.TextOverflow>
        한 줄 tex overflow 인 경우
      </font.TextOverflow>,
    )
    expect(TextOverflow.toJSON()).toHaveStyleRule('width', '100%')
  })

  it('set width', () => {
    const TextOverflow = renderer.create(
      <font.TextOverflow width="100px">
        한 줄 tex overflow 인 경우
      </font.TextOverflow>,
    )
    expect(TextOverflow.toJSON()).toHaveStyleRule('width', '100px')
  })
})

describe('font.TextOverflowMulti', () => {
  it('default', () => {
    const TextOverflow = renderer.create(
      <font.TextOverflowMulti>
        여러 줄 tex overflow 인 경우
      </font.TextOverflowMulti>,
    )
    expect(TextOverflow.toJSON()).toHaveStyleRule('width', '100%')
    expect(TextOverflow.toJSON()).toHaveStyleRule('-webkit-line-clamp', '2')
  })

  it('set width', () => {
    const TextOverflow = renderer.create(
      <font.TextOverflowMulti width="100px" line={3}>
        여러 줄 tex overflow 인 경우
      </font.TextOverflowMulti>,
    )
    expect(TextOverflow.toJSON()).toHaveStyleRule('width', '100px')
    expect(TextOverflow.toJSON()).toHaveStyleRule('-webkit-line-clamp', '3')
  })
})
