// TimelineChart Component Util
import * as d3 from 'd3'

// Sankey Component Util
export const strIdConvert = (id) => [].concat(id).map((name) => name.split(' ').join('_')).join('X')

// Table Component Util
export const tableHeaderConvert = (header) => header.split('_').map((title) => `${title[0].toUpperCase()}${title.slice(1)}`).join(' ')

export const renderSVG = (domObj, width, height) => {
  if (!(domObj instanceof d3.selection)) {
    throw new Error('domObj is not a d3.selection')
  }
  return domObj
    .append('svg')
    .attr('width', width)
    .attr('height', height)
}

export const generateGroup = (anchorEl, { className = '', xOffset = 0, yOffset = 0 }) => anchorEl
  .append('g')
  .attr('class', className)
  .attr('transform', `translate(${xOffset}, ${yOffset})`)

export const getStartAndEndTime = (dataPoints) => {
  if (!(dataPoints instanceof Array)) {
    throw new Error('datapoints should be a list')
  }

  let { startTime } = dataPoints[0]
  let endTime = 0

  dataPoints.forEach((d) => {
    if (!Date.parse(d.startTime) || !Date.parse(d.endTime)) {
      throw new Error(
        `data point should have both startTime and endTime${
          JSON.stringify(d)}`,
      )
    }
    if (Date.parse(d.startTime) < Date.parse(startTime)) {
      startTime = d.startTime
    }
    if (Date.parse(d.endTime) > Date.parse(endTime)) {
      endTime = d.endTime
    }
  })
  return {
    startTime: Date.parse(startTime),
    endTime: Date.parse(endTime),
  }
}

export const circleDataFilter = (data) => (
  data.filter((d) => Date.parse(d.endTime) - Date.parse(d.startTime) === 0)
)

export const rectDataFilter = (data) => (
  data.filter((d) => Date.parse(d.endTime) - Date.parse(d.startTime) > 0)
)

export const labelList = (data) => {
  const result = []
  data.forEach((d) => {
    const labelIdx = d.label.length - 1
    result.push(d.label[labelIdx])
  })
  return result
}

export const lineDataFormatConvert = (data) => {
  const { xaxis: x, data: [{ data: y }] } = data;
  return x.map((d, idx) => ({ x: d, y: y[idx] }))
}

export const errorMessage = (errorType) => {
  let message;
  if (errorType === 'typeOfVariable') {
    message = 'type is invalid'
  }

  if (errorType === 'haveData') {
    message = 'No data is provided'
  }

  return message
}

export const getTextStyleForHighcharts = (color) => ({
  color,
  fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
  fontSize: '14px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: '-0.5px',
  opacity: 0.6,
})
