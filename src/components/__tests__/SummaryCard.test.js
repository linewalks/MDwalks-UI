import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components'

import SummaryCard, { Article, EventElement } from '@Cards/SummaryCard';

describe('SummaryCard Component', () => {
  const SummaryCardData = {
    'Follow-up Patients': 24764,
    'High Risk Patients': 4833,
    'A.I. Analysis Features': 780,
    'Total Patients': 572811,
  }

  const SummaryCardEvents = {
    'Follow-up Patients': jest.fn(),
  }

  it('Render', () => {
    const wrapper = shallow(<SummaryCard data={SummaryCardData} />)
    expect(wrapper.find(Article)).toHaveLength(Object.keys(SummaryCardData).length);

    expect(wrapper.find(Article).first().render().find('dt')).toHaveLength(1)
    expect(wrapper.find(Article).first().render().find('dd')).toHaveLength(1)
  })

  it('Event', () => {
    const wrapper = mount(<SummaryCard data={SummaryCardData} events={SummaryCardEvents} />)

    expect(SummaryCardEvents['Follow-up Patients']).not.toHaveBeenCalled();
    wrapper.find(Article).first().find(EventElement).simulate('click')
    expect(SummaryCardEvents['Follow-up Patients']).toHaveBeenCalled();

    expect(wrapper.find(Article).first().find(EventElement)).toHaveStyleRule('cursor', 'pointer')
    expect(wrapper.find(Article).last().find(EventElement)).not.toHaveStyleRule('cursor', 'pointer')
  })

  it('set ClassName', () => {
    const className = 'ABC'
    const wrapper = shallow(<SummaryCard data={SummaryCardData} className={className} />)
    expect(wrapper.find(Article).first().prop('className')).toBe(className)
  })
})
