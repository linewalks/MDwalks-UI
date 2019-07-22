// Sankey Component Util
export const strIdConvert = id => {
  return id.split(' ').join('_')
}

// Table Component Util
export const tableHeaderConvert = header => {
  return header.split('_').map(title => `${title[0].toUpperCase()}${title.slice(1)}`).join(' ')
}

// TimelineChart Component Util
import * as d3 from 'd3'

export function renderSVG(domObj, width, height) {
  if (!(domObj instanceof d3.selection)) {
    throw new Error('domObj is not a d3.selection')
  }
  return domObj
    .append('svg')
    .attr('width', width)
    .attr('height', height)
}

export function generateGroup(
  anchorEl,
  { className = '', xOffset = 0, yOffset = 0 },
) {
  return anchorEl
    .append('g')
    .attr('class', className)
    .attr('transform', `translate(${xOffset}, ${yOffset})`)
}

export const getStartAndEndTime = dataPoints => {
  if (!(dataPoints instanceof Array)) {
    throw new Error('datapoints should be a list')
  }

  let startTime = dataPoints[0].start_time
  let endTime = 0

  dataPoints.forEach(d => {
    if (!Date.parse(d.start_time) || !Date.parse(d.end_time)) {
      throw new Error(
        'data point should have both start_time and end_time' +
          JSON.stringify(d),
      )
    }
    if (Date.parse(d.start_time) < Date.parse(startTime)) {
      startTime = d.start_time
    }
    if (Date.parse(d.end_time) > Date.parse(endTime)) {
      endTime = d.end_time
    }
  })
  return [Date.parse(startTime), Date.parse(endTime)]
}

export const circleDataFilter = data => {
  return data.filter(d => Date.parse(d.end_time) - Date.parse(d.start_time) === 0)
}

export const rectDataFilter = data => {
  return data.filter(d => Date.parse(d.end_time) - Date.parse(d.start_time) > 0)
}

export const labelList = data => {
  let result = []
  data.forEach(d => {
    const labelIdx = d.label.length - 1
    result.push(d.label[labelIdx])
  })
  return result
}

export const lineDataFormatConvert = data => {
  const { xaxis: x, data: [{data: y}] } = data;
  return x.map((d, idx) => {
    return { x: d, y: y[idx] }
  })
}