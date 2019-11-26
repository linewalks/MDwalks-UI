import React from 'react';
import { mount } from 'enzyme';
import Image from '@Components/layout/Image'

describe('Image Component', () => {
  it('width, height 이 있는 경우', () => {
    const wrapper = mount(
      <Image
        logo={
          {
            src: '/1.png',
            alt: '',
            width: 237,
            height: 63,
          }
        }
      />,
    )
    expect(wrapper.html()).toBe(`<img alt="" src="/1.png" srcset="/1.png 1x, /1@2x.png 2x" width="237px" height="63px">`)
  })

  it('width, height 이 없는 경우', () => {
    const wrapper = mount(
      <Image
        logo={
          {
            src: '/1.png',
            alt: '',
          }
        }
      />,
    )
    expect(wrapper.html()).toBe(`<img alt="" src="/1.png" srcset="/1.png 1x, /1@2x.png 2x" width="auto" height="auto">`)
  })
})
