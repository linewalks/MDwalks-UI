import React from 'react'
import { mount } from 'enzyme'
import Modal from '@Components/modal/Modal'
import Button from '@Components/button/Button'
import Heading from '@Components/layout/Heading'

describe('Open', () => {
  it('default', () => {
    const wrapper = mount(<Modal />)
    expect(wrapper.prop('isOpen')).toBe(undefined)
    expect(wrapper.html()).toBe(null)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen />)
    expect(wrapper.html()).not.toBe(null)
  })
})

describe('Close', () => {
  it('Default', () => {
    const closeModal = jest.fn()
    const wrapper = mount(<Modal isOpen title="1" closeModal={closeModal} />)
    expect(wrapper.html()).not.toBe(null)
    wrapper.find('button').first().simulate('click')
    expect(closeModal).toHaveBeenCalled()
  })
})

describe('Title', () => {
  it('default', () => {
    const wrapper = mount(<Modal isOpen />)
    expect(wrapper.find(Heading)).toHaveLength(1)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen title="1" />)
    expect(wrapper.find(Heading)).toHaveLength(1)
  })
})

describe('description', () => {
  it('default', () => {
    const wrapper = mount(<Modal isOpen />)
    expect(wrapper.find('p')).toHaveLength(0)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen title="1" description="22" />)
    expect(wrapper.find('p')).toHaveLength(1)
  })
})

describe('Footer', () => {
  it('default', () => {
    const wrapper = mount(<Modal isOpen />)
    expect(wrapper.find('footer')).toHaveLength(0)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen footer={<button type="button">1</button>} />)
    expect(wrapper.find('footer')).toHaveLength(1)
    expect(wrapper.find('footer button')).toHaveLength(1)
  })
})

describe('basic', () => {
  it('variant basic, type confirm', () => {
    let wrapper = mount(<Modal variant="basic" />)
    expect(wrapper.prop('isOpen')).toBe(undefined)
    expect(wrapper.html()).toBe(null)

    const mockOnConfirm = jest.fn()
    const mockOnCancel = jest.fn()
    wrapper = mount(<Modal variant="basic" isOpen onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    expect(wrapper.html()).not.toBe(null)

    const btnConfirm = wrapper.find(Button).at(1)
    btnConfirm.simulate('click')
    expect(mockOnConfirm).toBeCalledWith()

    wrapper = mount(<Modal variant="basic" isOpen onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)

    const btnCancel = wrapper.find(Button).at(0)
    btnCancel.simulate('click')
    expect(mockOnCancel).toBeCalledWith()
  })

  it('variant basic, type alert', () => {
    let wrapper = mount(<Modal variant="basic" type="alert" />)
    expect(wrapper.prop('isOpen')).toBe(undefined)
    expect(wrapper.html()).toBe(null)

    const mockOnConfirm = jest.fn()
    wrapper = mount(<Modal variant="basic" type="alert" isOpen onConfirm={mockOnConfirm} />)
    expect(wrapper.html()).not.toBe(null)

    const btnConfirm = wrapper.find(Button).at(0)
    btnConfirm.simulate('click')
    expect(mockOnConfirm).toBeCalledWith()
  })
})
