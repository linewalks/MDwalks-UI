import React from 'react';
import { mount } from 'enzyme';
import Modal from '../modal/Modal';
import Heading from '../layout/Heading'

describe('Open', () => {
  it('default', () => {
    const wrapper = mount(<Modal />)
    expect(wrapper.prop('isOpen')).toBe(undefined)
    expect(wrapper.html()).toBe(null)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen={true} />)
    expect(wrapper.html()).not.toBe(null)
  })
})

describe('Close', () => {
  it('Default', () => {
    const closeModal = jest.fn()
    const wrapper = mount(<Modal isOpen={true} title="1" closeModal={closeModal} />)
    expect(wrapper.html()).not.toBe(null)
    wrapper.find('button').first().simulate('click')
    expect(closeModal).toHaveBeenCalled()
  })
})

describe('Title', () => {
  it('default', () => {
    const wrapper = mount(<Modal isOpen={true} />)
    expect(wrapper.find(Heading)).toHaveLength(0)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen={true} title="1" />)
    expect(wrapper.find(Heading)).toHaveLength(1)
  })
})

describe('Footer', () => {
  it('default', () => {
    const wrapper = mount(<Modal isOpen={true} />)
    expect(wrapper.find('footer')).toHaveLength(0)
  })

  it('set isOpen', () => {
    const wrapper = mount(<Modal isOpen={true} footer={<button>1</button>} />)
    expect(wrapper.find('footer')).toHaveLength(1)
  })
})


