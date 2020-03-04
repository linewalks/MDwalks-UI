import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Tabs from '@Components/layout/Tabs';
import { colorV1 } from '@src/assets/styles/variables'
import { hexToRGB } from '@Components/button/utility'

const { Tab, TabPane, TabUnderLine } = Tabs

describe('Style', () => {
  it('Tab 이 selected 된 경우 color 값이 지정된다', () => {
    const tab = renderer.create(<Tab aria-selected />).toJSON()
    expect(tab).toHaveStyleRule('color', hexToRGB(colorV1.$pmblue, 1))
  })

  it('Tab 이 selected 되지 않는 경우', () => {
    const tab = renderer.create(<Tab aria-selected={false} />).toJSON()
    expect(tab).not.toHaveStyleRule('color', colorV1.$grey08)
  })

  it('tabUnderLine 이 selected 된 경우 backgorund-color, display 값이 지정 된다', () => {
    const tabUnderLine = renderer.create(<TabUnderLine aria-selected />).toJSON()
    expect(tabUnderLine).toHaveStyleRule('display', 'block')
    expect(tabUnderLine).toHaveStyleRule('background-color', colorV1.$pmblue)
  })

  it('tabUnderLine 이 selected 되지 않는 경우', () => {
    const tabUnderLine = renderer.create(<TabUnderLine />).toJSON()
    expect(tabUnderLine).toHaveStyleRule('display', 'none')
    expect(tabUnderLine).toHaveStyleRule('background-color', colorV1.$pmblue)
  })

  it('TabPane 이 hidden 된 경우', () => {
    const tabpane = renderer.create(<TabPane aria-hidden />).toJSON()
    expect(tabpane).toHaveStyleRule('height', '0')
  })

  it('TabPane 이 hidden 되지 않는 경우', () => {
    const tabpane = renderer.create(<TabPane aria-hidden={false} />).toJSON()
    expect(tabpane).not.toHaveStyleRule('height', '0')
  })
})

describe('Tabs', () => {
  let wrapper
  let onChange
  const firstKey = '1'
  const lastKey = '2'

  beforeEach(() => {
    onChange = jest.fn()
    wrapper = mount(
      <Tabs defaultactivekey={firstKey} onChange={onChange}>
        <TabPane tab="1 pane" key={firstKey}>1 contents</TabPane>
        <TabPane tab="2 pane" key={lastKey}>2 contents</TabPane>
      </Tabs>,
    )
  })

  it('render active 된 것의 TabPane 만 render 된다', () => {
    expect(wrapper.find(Tab).map((el) => el.props()['aria-selected'])).toEqual([true, false])
    expect(wrapper.find(Tab)).toHaveLength(2)
    expect(wrapper.find(TabPane)).toHaveLength(1)

    expect(wrapper.find(TabUnderLine)).toHaveLength(2)
    expect(wrapper.find(TabUnderLine).map((el) => el.props()['aria-selected'])).toEqual([true, false])

    expect(wrapper.props().defaultactivekey).toBe(firstKey)
    expect(wrapper.state()).toEqual({
      activeKey: firstKey,
      renderObj: new Set([firstKey]),
    })
  })

  it('onClick 시 activeKey 변경', () => {
    wrapper.find(Tab).last().simulate('click')
    expect(wrapper.find(Tab).map((el) => el.props()['aria-selected'])).toEqual([false, true])
    expect(wrapper.find(TabPane)).toHaveLength(2)
    expect(wrapper.find(TabUnderLine).map((el) => el.props()['aria-selected'])).toEqual([false, true])

    expect(wrapper.state()).toEqual({
      activeKey: lastKey,
      renderObj: new Set([firstKey, lastKey]),
    })

    expect(onChange).toHaveBeenCalledWith(lastKey)
  })

  it('onClick 시 active 된 Tab 클릭 시 renderObj 값은 변경되지 않는다', () => {
    expect(wrapper.state().activeKey).toBe(firstKey)
    wrapper.find(Tab).first().simulate('click')
    expect(wrapper.state()).toEqual({
      activeKey: firstKey,
      renderObj: new Set([firstKey]),
    })

    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('defaultactivekey, key 가 없는 경우', () => {
  let wrapper
  const initKey = String(0)

  beforeEach(() => {
    wrapper = mount(
      <Tabs>
        <TabPane tab="1 pane">1 contents</TabPane>
        <TabPane tab="2 pane">2 contents</TabPane>
      </Tabs>,
    )
  })

  it('state 확인', () => {
    expect(wrapper.props().defaultactivekey).toBe(String(0))
    expect(wrapper.state()).toEqual({
      activeKey: initKey,
      renderObj: new Set([initKey]),
    })
  })
})
