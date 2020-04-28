import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import BarGauge from '@Charts/BarGauge';

const toHaveStyleRules = (component, property, options) => {
  let hyphen = ''
  _.each(property, (value, key) => {
    hyphen = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    expect(component).toHaveStyleRule(hyphen, value, options)
  })
}

describe('BarGauge Component', () => {
  it('Score Props has vaild number 0', () => {
    const tree = renderer.create(<BarGauge score={0} />)
    toHaveStyleRules(tree.toJSON().children[0], {
      width: '0%',
    })
  })

  it('Score Props has vaild number 100', () => {
    const tree = renderer.create(<BarGauge score={100} />)
    toHaveStyleRules(tree.toJSON().children[0], {
      width: '100%',
    })
  })

  it('Score Props excluded Range renders error messege', () => {
    const wrapper = shallow(<BarGauge score={200} />)
    expect(wrapper.html()).toEqual('<div>Invalid Score</div>')
  })
})
