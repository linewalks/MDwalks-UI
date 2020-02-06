import React from 'react'
import { mount } from 'enzyme'
import TooltipBox, { valueConvertText } from '@Components/tooltip/TooltipBox'

const originValue = 598293
const percentValue = 0.04322

describe('valueConvertText', () => {
  let expectedValue;
  let isPercent;
  let showOrigin;

  afterEach(() => {
    isPercent = false
    showOrigin = false
  })

  it('showOrigin 인경우 value 값이 toFixed, toLocaleString 적용되지 않는다', () => {
    showOrigin = true
    expectedValue = 598293
    expect(valueConvertText(originValue, isPercent, showOrigin)).toEqual(expectedValue)
  })

  it('isPercent 인 경우 toFixed 이 적용된다', () => {
    isPercent = true
    expectedValue = '4.32 %'
    expect(valueConvertText(percentValue, isPercent, showOrigin).props.children).toEqual(expectedValue)
  })


  it('isPercent, showOrigin 둘 다 지정하지 않는 경우 toLocaleString 이 적용된다', () => {
    expectedValue = '598,293'
    expect(valueConvertText(originValue, isPercent, showOrigin)).toEqual(expectedValue)
  })

  it('convert 함수가 있으면, convert 함수가 적용된다.', () => {
    const convertFn = jest.fn((value) => `${value} Values`)
    expectedValue = '598293 Values'

    valueConvertText(originValue, isPercent, showOrigin, convertFn)
    expect(convertFn).toHaveBeenCalled()
    expect(valueConvertText(originValue, isPercent, showOrigin, convertFn)).toEqual(expectedValue)
  })
})

const getDataByWraper = (wrapper) => {
  const spans = wrapper.find('li').find('span')

  return {
    fill: spans.at(0).prop('color'),
    name: spans.at(1).text(),
    value: spans.at(2).text(),
  }
}


describe('TooltipBox Component', () => {
  let component;
  let payload;
  let expectedObj;
  beforeEach(() => {
    payload = {
      fill: '#62A3F3',
      name: 'T-Value',
      value: originValue,
    }

    component = mount(
      <TooltipBox
        payload={[payload]}
      />
    )
  })

  it('payload를 정상적으로 렌더', () => {
    expectedObj = {
      fill: '#62A3F3',
      name: 'T-Value',
      value: '598,293',
    }
    expect(getDataByWraper(component)).toEqual(expectedObj)
  })

  it('dataKey, nameKey 지정', () => {
    const dataKey = 'count'
    const nameKey = 'gender_name'
    const payload = [
      {
        fill: '#62A3F3',
        [nameKey]: 'T-Value',
        [dataKey]: originValue,
      },
    ]

    expectedObj = {
      fill: '#62A3F3',
      name: 'T-Value',
      value: '598,293',
    }

    component.setProps({
      payload,
      dataKey,
      nameKey
    })

    expect(getDataByWraper(component)).toEqual(expectedObj)
  })

  it('prop으로 제공 받은 convert 함수 호출 여부', () => {
    const convertFn = jest.fn()
    component.setProps({
      convert: convertFn
    })

    expect(convertFn).toBeCalledTimes([payload].length)
  })
})
