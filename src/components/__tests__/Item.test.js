import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import fontStyle from '@src/assets/styles/font.module.sass'

import _ from 'lodash'
import Item from '@Components/list/Item'
import { color } from '@src/assets/styles/variables'

describe('style', () => {
  it('default', () => {
    const disabled = false
    const layout = 'vertical'

    const item = renderer.create(<Item disabled={disabled} layout={layout} />).toJSON()
    expect(item).toHaveStyleRule('display', 'block')
    expect(item).toHaveStyleRule('background-color', color.$secondary_blue, {
      modifier: ':hover',
    })

    expect(item).toHaveStyleRule('cursor', 'pointer', {
      modifier: 'label',
    })

    expect(_.includes(item.props.className, fontStyle.fc_grey09)).toBe(true)
  })

  it('layout is horizontal', () => {
    const disabled = false
    const layout = 'horizontal'

    const item = renderer.create(<Item disabled={disabled} layout={layout} />).toJSON()
    expect(item).toHaveStyleRule('display', 'inline-block')
    expect(item).toHaveStyleRule('background-color', 'transparent', {
      modifier: ':hover',
    })
  })

  it('disabled is true', () => {
    const disabled = true
    const layout = 'vertical'

    const item = renderer.create(<Item disabled={disabled} layout={layout} />).toJSON()

    expect(_.includes(item.props.className, fontStyle.fc_grey06)).toBe(true)

    expect(item).toHaveStyleRule('opacity', '0.4', {
      modifier: 'img',
    })
  })
})
