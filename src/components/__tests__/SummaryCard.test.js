import React from 'react';
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme';
import 'jest-styled-components'

import SummaryCard, { Article, EventElement } from '@Cards/SummaryCard';

const SummaryCardData = {
  'Follow-up Patients': 24764,
  'High Risk Patients': 4833,
  'A.I. Analysis Features': 780,
  'Total Patients': 572811,
}

const SummaryCardEvents = {
  'Follow-up Patients': jest.fn(),
}

describe('SummaryCard Component', () => {
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

describe('SummaryCard Style', () => {
  it('Event 가 있는 경우 hover 시 스타일 변화', () => {
    const tree = renderer.create(
      <SummaryCard data={SummaryCardData} events={SummaryCardEvents} />,
    ).toJSON()

    const hasEventArticle = tree.children[0]
    const notHasEventArticle = tree.children[1]

    expect(hasEventArticle).toHaveStyleRule('transition', 'transform 0.1s ease-in-out')
    expect(notHasEventArticle).not.toHaveStyleRule('transition', 'transform 0.1s ease-in-out')

    expect(hasEventArticle).toHaveStyleRule('box-shadow', '0 8px 40px 0 rgba(117,127,139,0.2)', {
      modifier: ':hover',
    })
    expect(hasEventArticle).toHaveStyleRule('transform', 'translateY(-4px)', {
      modifier: ':hover',
    })
  })
})
