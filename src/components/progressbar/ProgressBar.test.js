import React from 'react'
import { mount } from 'enzyme'
import ProgressBar from '@Components/progressbar/ProgressBar'

describe('ProgressBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<ProgressBar state={10} totalState={100} />)
  })

  afterEach(() => {
    wrapper = null
  })

  it('default', () => {
    expect(wrapper.find('.mwc-progressbar')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__legendlist').text()).toBe('10 / 100')
    expect(wrapper.find('.mwc-progressbar__legendlist-left')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__legendlist-md')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__state-current')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__state-10')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__state-total')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__state-90')).toHaveLength(1)
  })

  it('size', () => {
    wrapper.setProps({ size: 'sm' })

    expect(wrapper.find('.mwc-progressbar__legendlist-md')).toHaveLength(0)
    expect(wrapper.find('.mwc-progressbar__legendlist-sm')).toHaveLength(1)
  })

  it('placement', () => {
    let placement = 'top'
    wrapper.setProps({ placement })
    expect(
      wrapper.find(`.mwc-progressbar__legendlist-${placement}`),
    ).toHaveLength(1)

    placement = 'bottom'
    wrapper.setProps({ placement })
    expect(
      wrapper.find(`.mwc-progressbar__legendlist-${placement}`),
    ).toHaveLength(1)

    placement = 'right'
    wrapper.setProps({ placement })
    expect(
      wrapper.find(`.mwc-progressbar__legendlist-${placement}`),
    ).toHaveLength(1)
  })

  it('state', () => {
    wrapper.setProps({ state: 16 })
    expect(wrapper.find('.mwc-progressbar__state-16')).toHaveLength(1)
    expect(wrapper.find('.mwc-progressbar__state-84')).toHaveLength(1)
  })

  it('isNotExistsLabel', () => {
    expect(wrapper.find('.mwc-progressbar__legendlist').text()).toBe('10 / 100')
    wrapper.setProps({ isNotExistsLabel: true })
    expect(
      wrapper.find('.mwc-progressbar__legendlist').isEmptyRender(),
    ).toBeTruthy()
  })

  it('strokeColor', () => {
    wrapper.setProps({ strokeColor: 'skyblue' })
    expect(
      wrapper.find('.mwc-progressbar__state-current').prop('style')
        .backgroundColor,
    ).toBe('skyblue')

    wrapper.setProps({ strokeColor: '#d4d4d4' })
    expect(
      wrapper.find('.mwc-progressbar__state-current').prop('style')
        .backgroundColor,
    ).toBe('#d4d4d4')
  })
})
