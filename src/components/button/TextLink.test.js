
import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import _ from 'lodash'
import TextLink from '@Components/button/TextLink'

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

it('TextLink', () => {
  const tree = renderer.create(<TextLink />).toJSON()
  const rules = {
    color: '#4d5661',
    fontSize: '14px',
  }

  toHaveStyleRules(tree, rules)
})

it('TextLink lg, primary', () => {
  const tree = renderer.create(<TextLink size="lg" variant="primary" underline />).toJSON()
  const rules = {
    color: '#189bff',
    fontSize: '16px',
  }

  toHaveStyleRules(tree, rules)
})
