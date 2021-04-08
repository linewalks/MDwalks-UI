import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import _ from 'lodash'
import Button from '@Components/button/Button'

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

// const checkColorRuls = (component, rulesTarget) => {
//   let { hover, disabled } = rulesTarget

//   hover = _.extend({ border: 'none' }, hover)
//   disabled = _.extend({ border: 'none' }, disabled)
//   const rules = _.extend({ border: 'none' }, rulesTarget)
//   delete rules.hover
//   delete rules.disabled

//   toHaveStyleRules(component, hover, {
//     modifier: ':hover:not(:disabled)',
//   })

//   toHaveStyleRules(component, disabled, {
//     modifier: ':disabled',
//   })

//   toHaveStyleRules(component, rules)
// }

describe('default', () => {
  const ButtonText = 'Button Text'
  it('text', () => {
    const wrapper = mount(<Button>{ButtonText}</Button>)
    expect(wrapper.text()).toBe(ButtonText)
  })

  it('isLoading by String', () => {
    const wrapper = mount(<Button isLoading="true">{ButtonText}</Button>)
    expect(wrapper.text()).not.toBe(ButtonText)
    expect(wrapper.text()).toBe('loading...')
  })

  it('isLoading by String', () => {
    const wrapper = mount(<Button isLoading="false">{ButtonText}</Button>)
    expect(wrapper.text()).toBe(ButtonText)
    expect(wrapper.text()).not.toBe('loading...')
  })

  it('isLoading by Boolean ', () => {
    const wrapper = mount(<Button isLoading>{ButtonText}</Button>)
    expect(wrapper.text()).not.toBe(ButtonText)
    expect(wrapper.text()).toBe('loading...')
  })
})

// describe('Button Style', () => {
//   it('primary', () => {
//     const tree = renderer.create(<Button variant="primary" />).toJSON()
//     const rules = {
//       boxShadow: 'none',
//       backgroundColor: '#189bff',
//       color: '#ffffff',
//       hover: {
//         boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
//         backgroundColor: '#0070c6',
//         color: '#ffffff',
//       },
//       disabled: {
//         boxShadow: 'none',
//         backgroundColor: 'rgba(229,229,229,0.48)',
//         color: 'rgba(0,0,0,0.2)',
//       },
//     }
//     checkColorRuls(tree, rules)
//   })

//   it('primary_line', () => {
//     const tree = renderer.create(<Button variant="primary_line" />).toJSON()
//     const rules = {
//       boxShadow: 'none',
//       backgroundColor: '#ffffff',
//       color: '#189bff',
//       border: '1px solid #189bff',
//       hover: {
//         boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
//         backgroundColor: '#ffffff',
//         color: '#0070c6',
//         border: '1px solid #189bff',
//       },
//       disabled: {
//         boxShadow: 'none',
//         backgroundColor: 'rgba(229,229,229,0.48)',
//         color: 'rgba(0,0,0,0.2)',
//         border: '1px solid rgba(196,196,196,0.48)',
//       },
//     }

//     checkColorRuls(tree, rules)
//   })

//   it('basic', () => {
//     const tree = renderer.create(<Button variant="basic" />).toJSON()
//     const rules = {
//       boxShadow: 'none',
//       backgroundColor: 'rgba(0,0,0,0.1)',
//       color: 'rgba(0,0,0,0.6)',
//       hover: {
//         boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
//         backgroundColor: 'rgba(0,0,0,0.18)',
//         color: 'rgba(0,0,0,0.6)',
//       },
//       disabled: {
//         boxShadow: 'none',
//         backgroundColor: 'rgba(229,229,229,0.48)',
//         color: 'rgba(0,0,0,0.2)',
//       },
//     }

//     checkColorRuls(tree, rules)
//   })

//   it('basic_line', () => {
//     const tree = renderer.create(<Button variant="basic_line" />).toJSON()
//     const rules = {
//       boxShadow: 'none',
//       backgroundColor: '#ffffff',
//       color: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(0,0,0,0.1)',
//       hover: {
//         boxShadow: '0 4px 10px 0 rgba(0,0,0,0.08)',
//         backgroundColor: '#ffffff',
//         color: 'rgba(0,0,0,0.6)',
//         border: '1px solid rgba(0,0,0,0.1)',
//       },
//       disabled: {
//         boxShadow: 'none',
//         backgroundColor: 'rgba(229,229,229,0.48)',
//         color: 'rgba(0,0,0,0.2)',
//         border: '1px solid rgba(196,196,196,0.48)',
//       },
//     }

//     checkColorRuls(tree, rules)
//   })
// })

describe('Button Size', () => {
  // it('large', () => {
  //   const tree = renderer.create(<Button size="lg" />).toJSON()
  //   const rules = {
  //     fontSize: '16px',
  //     minWidth: '100px',
  //     height: '42px',
  //     borderRadius: '21px',
  //     padding: '10px 20px',
  //     img: {
  //       margin: '8px',
  //     },
  //     marginRight: '8px',
  //   }

  //   expect(tree).toHaveStyleRule('margin-right', rules.marginRight, {
  //     modifier: ':not(:last-child)',
  //   })

  //   delete rules.img
  //   delete rules.marginRight

  //   toHaveStyleRules(tree, rules)
  // })
  it('large', () => {
    const wrapper = mount(<Button size="lg" />)
    expect(wrapper.find('.mwc-button__lg')).toHaveLength(2)
  })
  // it('xLarge', () => {
  //   const tree = renderer.create(<Button size="xlg" />).toJSON()
  //   const rules = {
  //     fontSize: '18px',
  //     minWidth: '100%',
  //     height: '60px',
  //     borderRadius: '10px',
  //     padding: '16px 20px',
  //     img: {
  //       margin: '8px',
  //     },
  //     marginRight: '0',
  //   }

  //   expect(tree).toHaveStyleRule('margin-right', rules.marginRight, {
  //     modifier: ':not(:last-child)',
  //   })

  //   delete rules.img
  //   delete rules.marginRight

  //   toHaveStyleRules(tree, rules)
  // })

  it('xLarge', () => {
    const wrapper = mount(<Button size="xlg" />)
    expect(wrapper.find('.mwc-button__xlg')).toHaveLength(2)
  })

  // it('middle', () => {
  //   const tree = renderer.create(<Button size="md" />).toJSON()
  //   const rules = {
  //     fontSize: '14px',
  //     minWidth: '90px',
  //     height: '34px',
  //     borderRadius: '17px',
  //     padding: '7px 18px',
  //     img: {
  //       margin: '6px',
  //     },
  //     marginRight: '8px',
  //   }

  //   expect(tree).toHaveStyleRule('margin-right', rules.marginRight, {
  //     modifier: ':not(:last-child)',
  //   })

  //   delete rules.img
  //   delete rules.marginRight

  //   toHaveStyleRules(tree, rules)
  // })
  it('middle', () => {
    const wrapper = mount(<Button size="md" />)
    expect(wrapper.find('.mwc-button__md')).toHaveLength(2)
  })
})
