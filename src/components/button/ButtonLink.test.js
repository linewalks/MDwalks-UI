import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import _ from 'lodash'
import ButtonLink from '@Components/button/ButtonLink'

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

it('ButtonLink', () => {
  const tree = renderer.create(<ButtonLink variant="basic_line" />).toJSON()
  const rules = {
    fontWeight: 'bold',
    fontSize: '14px',
    minWidth: 'auto',
    paddingLeft: '8px',
    paddingRight: '8px',
    display: 'inline-block',
    boxSizing: 'border-box',
    color: '#189bff',
    hover: {
      color: '#028af2',
    },
    firstChild: {
      paddingLeft: '0',
    },
  }

  expect(tree).toHaveStyleRule('color', rules.hover.color, {
    modifier: ':hover',
  })

  expect(tree).toHaveStyleRule('padding-left', rules.firstChild.paddingLeft, {
    modifier: ':first-child',
  })

  delete rules.hover
  delete rules.firstChild

  toHaveStyleRules(tree, rules)
})

describe('ButtonLink', () => {
  it('color & size', () => {
    const tree = renderer.create(<ButtonLink />).toJSON()
    const rules = {
      fontSize: '14px',
      minWidth: 'auto',
      paddingLeft: '8px',
      paddingRight: '8px',
      display: 'inline-block',
      boxSizing: 'border-box',
      color: '#189bff',
      hover: {
        color: '#028af2',
      },
      firstChild: {
        paddingLeft: '0',
      },
    }

    expect(tree).toHaveStyleRule('color', rules.hover.color, {
      modifier: ':hover',
    })

    expect(tree).toHaveStyleRule('padding-left', rules.firstChild.paddingLeft, {
      modifier: ':first-child',
    })

    delete rules.hover
    delete rules.firstChild

    toHaveStyleRules(tree, rules)
  })
})
