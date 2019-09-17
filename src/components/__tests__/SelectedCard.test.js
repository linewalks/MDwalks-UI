import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectedCard, { Card, Arrow } from '@Cards/SelectedCard';

describe('SelectedCard Component', () => {
  it('If selectedElement length is One, Render One article element', () => {
    const wrapper = shallow(<SelectedCard selectedElement={['a']} />)
    expect(wrapper.find(Card)).toHaveLength(1);
  })

  it('If selectedElement length is more than two, Render article element of selectedElement length', () => {
    const wrapper = shallow(<SelectedCard selectedElement={['a', 'b', 'c']} />)
    expect(wrapper.find(Card)).toHaveLength(3);
  })

  it('If selectedElement length is One, there is no background image', () => {
    const wrapper = shallow(<SelectedCard selectedElement={['a']} />)
    let backgroundImageNumber = 0
    wrapper.find(Arrow).forEach((node, idx) => {
      if (node.html().includes('style="background-image:url(test-file-stub)"')) {
        backgroundImageNumber++
      }
    })
    expect(wrapper.get(0).props.children.length - 1).toEqual(backgroundImageNumber);
  })

  it('If selectedElement length is more than two, background image number is one less than selectedElement length ', () => {
    const wrapper = shallow(<SelectedCard selectedElement={['a', 'b', 'c']} />)
    let backgroundImageNumber = 0
    wrapper.find(Arrow).forEach((node, idx) => {
      if (node.html().includes('style="background-image:url(test-file-stub)"')) {
        backgroundImageNumber++
      }
    })

    expect(wrapper.get(0).props.children.length - 1).toEqual(backgroundImageNumber);
  })
})
