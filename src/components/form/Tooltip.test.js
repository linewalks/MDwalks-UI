import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Tooltip from '@Components/form/Tooltip'

jest.useFakeTimers()
describe('Tooltip', () => {
  it('default', async () => {
    const tooltipDesc = 'greeting'
    const wrapper = mount(<div><Tooltip placement="top" desc={tooltipDesc}>hi!</Tooltip></div>)

    await act(async () => {
      wrapper.find('span').at(0).simulate('mouseenter')
      await jest.advanceTimersByTime(100)
      wrapper.update()
    })

    expect(wrapper.find('Popup').length).toBe(1)
    expect(wrapper.find('[role="tooltip"]').at(0).text()).toBe(tooltipDesc)
  })

  it('placement', async () => {
    const tooltipDesc = 'greeting'
    const wrapper = mount(<div><Tooltip placement="top" desc={tooltipDesc}>hi!</Tooltip></div>)

    await act(async () => {
      wrapper.find('span').at(0).simulate('mouseenter')
      await jest.advanceTimersByTime(100)
      wrapper.update()
    })

    expect(wrapper.find('.ant-tooltip-placement-top')).not.toBeUndefined()

    wrapper.setProps({ placement: 'bottom' })

    await act(async () => {
      wrapper.find('span').at(0).simulate('mouseenter')
      await jest.advanceTimersByTime(100)
      wrapper.update()
    })

    expect(wrapper.find('.ant-tooltip-placement-bottom')).not.toBeUndefined()

    wrapper.setProps({ placement: 'left' })

    await act(async () => {
      wrapper.find('span').at(0).simulate('mouseenter')
      await jest.advanceTimersByTime(100)
      wrapper.update()
    })

    expect(wrapper.find('.ant-tooltip-placement-left')).not.toBeUndefined()

    wrapper.setProps({ placement: 'right' })

    await act(async () => {
      wrapper.find('span').at(0).simulate('mouseenter')
      await jest.advanceTimersByTime(100)
      wrapper.update()
    })

    expect(wrapper.find('.ant-tooltip-placement-right')).not.toBeUndefined()
  })
})
