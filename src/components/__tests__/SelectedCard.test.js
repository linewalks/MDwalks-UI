import React from 'react';
import { shallow, mount} from 'enzyme';
import SelectedCard from '@Cards/SelectedCard';
import styles from './SelectedCard.css';

describe('SelectedCard Component', () => {
  it('', () => {
    const wrapper = shallow(<SelectedCard selectedElement={['a', 'b']} />)
    console.log('@', wrapper.get(0).props.children[0].props)
    // expect(wrapper.html().includes('width:0%')).toEqual(true);
  })
})
