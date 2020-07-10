import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import _ from 'lodash'
import ButtonTextLink from '@Components/button/ButtonTextLink'

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

describe('ButtonTextLinkTag', () => {
  it('color & size', () => {
    const tree = renderer.create(<ButtonTextLink />).toJSON()
    const rules = {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.6)',
      textDecoration: 'underline',
    }

    toHaveStyleRules(tree, rules)
  })
})
