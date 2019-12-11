import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import _ from 'lodash'
import Button, { ButtonLink, ButtonTextLink } from '@Components/button/Button'

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

const checkColorRuls = (component, rulsTarget) => {
  let { hover, disabled } = rulsTarget

  hover = _.extend({ border: 'none' }, hover)
  disabled = _.extend({ border: 'none' }, disabled)
  const ruls = _.extend({ border: 'none' }, rulsTarget)
  delete ruls.hover
  delete ruls.disabled

  toHaveStyleRules(component, hover, {
    modifier: ':hover:not(:disabled)',
  })

  toHaveStyleRules(component, disabled, {
    modifier: ':disabled',
  })

  toHaveStyleRules(component, ruls)
}

describe('default', () => {
  const ButtonText = 'Button Text'
  it('text', () => {
    const wrapper = shallow(<Button>{ButtonText}</Button>)
    expect(wrapper.text()).toBe(ButtonText)
  })

  it('isLoading', () => {
    const wrapper = mount(<Button isLoading="true">{ButtonText}</Button>)
    expect(wrapper.text()).not.toBe(ButtonText)
    expect(wrapper.text()).toBe('loading...')
  })
})

describe('Button Style', () => {
  it('primary', () => {
    const tree = renderer.create(<Button variant="primary" />).toJSON()
    const ruls = {
      boxShadow: 'none',
      backgroundColor: '#189bff',
      color: '#ffffff',
      hover: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
        backgroundColor: '#0070c6',
        color: '#ffffff',
      },
      disabled: {
        boxShadow: 'none',
        backgroundColor: 'rgba(229,229,229,0.48)',
        color: 'rgba(0,0,0,0.2)',
      },
    }
    checkColorRuls(tree, ruls)
  })

  it('primary_line', () => {
    const tree = renderer.create(<Button variant="primary_line" />).toJSON()
    const ruls = {
      boxShadow: 'none',
      backgroundColor: '#ffffff',
      color: '#189bff',
      border: '1px solid #189bff',
      hover: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
        backgroundColor: '#ffffff',
        color: '#0070c6',
        border: '1px solid #189bff',
      },
      disabled: {
        boxShadow: 'none',
        backgroundColor: 'rgba(229,229,229,0.48)',
        color: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(196,196,196,0.48)',
      },
    }

    checkColorRuls(tree, ruls)
  })

  it('basic', () => {
    const tree = renderer.create(<Button variant="basic" />).toJSON()
    const ruls = {
      boxShadow: 'none',
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: 'rgba(0,0,0,0.6)',
      hover: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
        backgroundColor: 'rgba(0,0,0,0.18)',
        color: 'rgba(0,0,0,0.6)',
      },
      disabled: {
        boxShadow: 'none',
        backgroundColor: 'rgba(229,229,229,0.48)',
        color: 'rgba(0,0,0,0.2)',
      },
    }

    checkColorRuls(tree, ruls)
  })

  it('basic_line', () => {
    const tree = renderer.create(<Button variant="basic_line" />).toJSON()
    const ruls = {
      boxShadow: 'none',
      backgroundColor: '#ffffff',
      color: 'rgba(0,0,0,0.6)',
      border: '1px solid rgba(0,0,0,0.1)',
      hover: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
        backgroundColor: '#ffffff',
        color: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(0,0,0,0.1)',
      },
      disabled: {
        boxShadow: 'none',
        backgroundColor: 'rgba(229,229,229,0.48)',
        color: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(196,196,196,0.48)',
      },
    }

    checkColorRuls(tree, ruls)
  })
})

describe('Button Size', () => {
  it('large', () => {
    const tree = renderer.create(<Button size="lg" />).toJSON()
    const ruls = {
      fontSize: '16px',
      minWidth: '100px',
      height: '42px',
      borderRadius: '21px',
      padding: '10px 20px',
      img: {
        margin: '8px',
      },
      marginRight: '8px',
    }

    expect(tree).toHaveStyleRule('margin-right', ruls.marginRight, {
      modifier: ':not(:last-child)',
    })

    delete ruls.img
    delete ruls.marginRight

    toHaveStyleRules(tree, ruls)
  })

  it('xLarge', () => {
    const tree = renderer.create(<Button size="xlg" />).toJSON()
    const ruls = {
      fontSize: '18px',
      minWidth: '100%',
      height: '60px',
      borderRadius: '10px',
      padding: '16px 20px',
      img: {
        margin: '8px',
      },
      marginRight: '0',
    }

    expect(tree).toHaveStyleRule('margin-right', ruls.marginRight, {
      modifier: ':not(:last-child)',
    })

    delete ruls.img
    delete ruls.marginRight

    toHaveStyleRules(tree, ruls)
  })

  it('middle', () => {
    const tree = renderer.create(<Button size="md" />).toJSON()
    const ruls = {
      fontSize: '14px',
      minWidth: '90px',
      height: '34px',
      borderRadius: '17px',
      padding: '7px 18px',
      img: {
        margin: '6px',
      },
      marginRight: '8px',
    }

    expect(tree).toHaveStyleRule('margin-right', ruls.marginRight, {
      modifier: ':not(:last-child)',
    })

    delete ruls.img
    delete ruls.marginRight

    toHaveStyleRules(tree, ruls)
  })
})

it('ButtonLink', () => {
  const tree = renderer.create(<ButtonLink variant="basic_line" />).toJSON()
  const ruls = {
    minWidth: 'auto',
    paddingLeft: '8px',
    paddingRight: '8px',
    display: 'inline-block',
    boxSizing: 'border-box',
    color: '#189bff',
    hover: {
      color: '#0070c6',
    },
    firstChild: {
      paddingLeft: '0',
    },
  }

  expect(tree).toHaveStyleRule('color', ruls.hover.color, {
    modifier: ':hover',
  })

  expect(tree).toHaveStyleRule('padding-left', ruls.firstChild.paddingLeft, {
    modifier: ':first-child',
  })

  delete ruls.hover
  delete ruls.firstChild

  toHaveStyleRules(tree, ruls)
})

describe('ButtonLink', () => {
  it('color & size', () => {
    const tree = renderer.create(<ButtonLink />).toJSON()
    const ruls = {
      fontSize: '14px',
      minWidth: 'auto',
      paddingLeft: '8px',
      paddingRight: '8px',
      display: 'inline-block',
      boxSizing: 'border-box',
      color: '#189bff',
      hover: {
        color: '#0070c6',
      },
      firstChild: {
        paddingLeft: '0',
      },
    }

    expect(tree).toHaveStyleRule('color', ruls.hover.color, {
      modifier: ':hover',
    })

    expect(tree).toHaveStyleRule('padding-left', ruls.firstChild.paddingLeft, {
      modifier: ':first-child',
    })

    delete ruls.hover
    delete ruls.firstChild

    toHaveStyleRules(tree, ruls)
  })
})

describe('ButtonTextLinkTag', () => {
  it('color & size', () => {
    const tree = renderer.create(<ButtonTextLink />).toJSON()
    const ruls = {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.6)',
      textDecoration: 'underline',
    }

    toHaveStyleRules(tree, ruls)
  })
})
