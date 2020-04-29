import React from 'react';
import _ from 'lodash'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder';

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

describe('EmptyContainer Component', () => {
  it('default height', () => {
    const tree = renderer.create(<EmptyPlaceHolder />)
    toHaveStyleRules(tree.toJSON(), {
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
    })
  })

  it('set height', () => {
    const tree = renderer.create(<EmptyPlaceHolder height={100} />)
    toHaveStyleRules(tree.toJSON(), {
      height: '100px',
    })
  })
})
