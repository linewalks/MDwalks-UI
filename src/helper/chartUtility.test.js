import _ from 'lodash'
import * as d3 from 'd3'
const chartUtility = require('./chartUtility');

it('strIdConvert', () => {
  expect(chartUtility.strIdConvert('a b')).toBe('a_b')
  expect(chartUtility.strIdConvert('a')).toBe('a')
})

it('tableHeaderConvert', () => {
  expect(chartUtility.tableHeaderConvert('aa_bb')).toBe('Aa Bb')
  expect(chartUtility.tableHeaderConvert('aa')).toBe('Aa')
})

describe('renderSVG', () => {
  it('throw', () => {
    let div = document.createElement('div')
    try {
      chartUtility.renderSVG(div)
    } catch(e) {
      expect(e.message).toBe('domObj is not a d3.selection')
    }
  })

  it('default', () => {
    let div = d3.create('div')
    let svg = chartUtility.renderSVG(div)
    expect(svg.attr('width')).toBe(null)
    expect(svg.attr('height')).toBe(null)
  })

  it('set options', () => {
    const width = 100
    const height = 200
    let div = d3.create('div')
    let svg = chartUtility.renderSVG(div, width, height)
    expect(svg.attr('width')).not.toBe(width)
    expect(svg.attr('width')).toBe(`${width}`)
    expect(svg.attr('height')).toBe(`${height}`)
  })
})

describe('generateGroup', () => {
  it('default', () => {
    let svg = d3.create('svg')
    const g = chartUtility.generateGroup(svg, {})

    expect(g.attr('class')).toBe('')
    expect(g.attr('transform')).not.toBe('')
    expect(g.attr('transform')).toBe('translate(0, 0)')
  })
  
  it('set options', () => {
    const options = {
      className: 'test_className',
      xOffset: 10,
      yOffset: 20,
    }
    let svg = d3.create('svg')
    const g = chartUtility.generateGroup(svg, options)

    expect(g.attr('class')).toBe(options.className)
    expect(g.attr('transform')).not.toBe('')
    expect(g.attr('transform')).toBe(`translate(${options.xOffset}, ${options.yOffset})`)
  })
  
})

describe('getStartAndEndTime', () => {
  it('throw instanceof', () => {
    try {
      chartUtility.getStartAndEndTime('')
    } catch(e) {
      expect(e.message).toBe('datapoints should be a list')
    }
  })
  it('throw has date', () => {
    const data = [{}]
    try {
      chartUtility.getStartAndEndTime(data)
    } catch(e) {
      expect(e.message).toBe(`data point should have both startTime and endTime${JSON.stringify(data[0])}`)
    }
  })

  it('data', () => {
    // startTime 값 중 최소 값을
    // endTime 값 중 최대 값을 검출 한다
    const data = [
      {startTime: "2019-06-01", endTime: "2019-11-30"},
      {startTime: "2019-03-05", endTime: "2019-12-30"},
      {startTime: "2019-04-01", endTime: "2019-10-30"},
    ]

    expect(chartUtility.getStartAndEndTime(data)).toEqual({
      startTime: Date.parse("2019-03-05"),
      endTime: Date.parse("2019-12-30"),
    })
  })
})


it('circleDataFilter', () => {
  // startTime, endTime 이 같은 것을 필터링 한다
  const data = [
    {startTime: "2019-06-01", endTime: "2019-06-01"},
    {startTime: "2019-03-05", endTime: "2019-12-30"},
    {startTime: "2019-04-01", endTime: "2019-04-01"},
  ]

  expect(chartUtility.circleDataFilter(data)).toEqual([
    {startTime: "2019-06-01", endTime: "2019-06-01"},
    {startTime: "2019-04-01", endTime: "2019-04-01"},
  ])
})

it('rectDataFilter', () => {
  // startTime 이 endTime 보다 작은 것을 필터링 한다
  const data = [
    {startTime: "2019-06-01", endTime: "2019-06-01"},
    {startTime: "2019-03-05", endTime: "2019-12-30"},
    {startTime: "2019-04-01", endTime: "2019-04-01"},
    {startTime: "2019-05-01", endTime: "2019-04-01"},
  ]

  expect(chartUtility.rectDataFilter(data)).toEqual([
    {startTime: "2019-03-05", endTime: "2019-12-30"},
  ])
})

it('labelList', () => {
  const data = [
    {label: [1, 2]},
    {label: [3, 4, 5, 6]},
    {label: [7, 8, 9]},
  ]

  const expected = data.map(obj => _.last(obj.label))
  expect(chartUtility.labelList(data)).toEqual(expected)
})