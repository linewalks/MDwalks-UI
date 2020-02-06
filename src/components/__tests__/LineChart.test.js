import React from 'react';
import { shallow, mount } from 'enzyme';
import LineChart from '@Charts/LineChart';
import EmptyPlaceHolder from '@Components/table/EmptyPlaceHolder'
import * as Rechart from 'recharts'
import _ from 'lodash'

const data = [
  {
    age: 20,
    Persons: 88
  },
  {
    age: 30,
    Persons: 272
  },
  {
    age: 40,
    Persons: 568
  },
  {
    age: 50,
    Persons: 932
  },
  {
    age: 60,
    Persons: 3319
  },
  {
    age: 70,
    Persons: 5394
  },
  {
    age: 80,
    Persons: 3665
  },
  {
    age: 90,
    Persons: 989
  },
  {
    age: 100,
    Persons: 58
  },
]

const match = (props, Tag) => props.type && props.type.displayName === Tag.displayName

const findReChartTags = (root, Tag) => (
  _.chain(root)
    .flatMapDeep()
    .filter((props) => match(props, Tag))
    .value()
)

describe('LineChart Component', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <LineChart
        title="Example"
        data={data}
        xDataKey="age"
        yDataKey="Persons"
        theme="blue"
      />
    )
  })

  it('데이터가 없을 때, placeholder를 렌더링 해야 한다.', () => {
    component.setProps({ data: [] })
    expect(component.find(EmptyPlaceHolder)).toHaveLength(1)
  })

  it('데이터가 있을 때, linechart를 렌더링 해야 한다.', () => {
    expect(findReChartTags(component.find(Rechart.LineChart).prop('children'), Rechart.Line)).toHaveLength(1)
  })
}) 