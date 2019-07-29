import React, { Component } from 'react';
import * as d3 from 'd3'
import { renderSVG, generateGroup,  getStartAndEndTime, circleDataFilter, rectDataFilter, labelList } from '../../helper/chartUtility'
import styles from './Timeline.css'
import isEmpty from 'lodash/isEmpty'

class Timeline extends Component {
  errorMessage = (errorType) => {
    let message;
    if (errorType === 'typeOfVariable') {
      message = 'type is invalid'
    }
  
    if (errorType === 'haveData') {
      message = 'No data is provided'
    }

    d3.select(`.${styles.timelineChart}`).append('div').text(message)  
  }

  renderTimeline = data => {
    const timelineData = data 
    // createFormattedSampledData()
    const xAxisHeight = 32 // Time legend (X-axis) height
    const yAxisWidth = 134 // Labels (Y-axis) width
    const overViewAxisHeight = 50
    const height = 521 // Entire height
    const width = 1152 // Entire width
    const defaultPadding = 20
    const xAxisWidth = width - yAxisWidth - defaultPadding
  
    const svg = renderSVG(d3.select(`.${styles.timelineChart}`), width, height)
  
    // Create xAxis
    // 1. Get min, max time
    const {startTime, endTime} = getStartAndEndTime(
      timelineData.map(d => d.dataPoints).flat(),
    )
    // 2. Create x axis scale
    const xAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, xAxisWidth])
    // 3. Create xAxis
    const xAxis = d3.axisTop(xAxisScale)
  
    // Create groups
    // 1. Entire timeline group
    const gTimeline = generateGroup(svg, { className: 'timeline' })
    // 2. xAxis group
    const gXAxis = generateGroup(gTimeline, {
      className: styles.xAxis,
      xOffset: yAxisWidth + defaultPadding + 25,
      yOffset: xAxisHeight,
    })
    //  3. labels group
    const gLabels = generateGroup(gTimeline, {
      className: styles.labels,
      xOffset: 25,
      yOffset: 60,
    })
  
    const labelStartYPosition = 0
    const labelLastYPosition = 348
  
    // Create y axis scale
    const yAxisScale = d3
      .scalePoint()
      .domain(labelList(timelineData))
      .range([labelStartYPosition, labelLastYPosition])
  
    // Render elements
    // 1. x Axis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H998.5V-6')
    gXAxis.selectAll('.tick line').remove()
  
    // 2. labels
    gLabels
      .selectAll('.label')
      .data(timelineData)
      .enter()
      .append('text')
      .text(d => d.label[d.label.length - 1])
      .attr('x', yAxisWidth)
      .attr('y', d => yAxisScale(d.label[d.label.length - 1]))
      .attr('dx', -15)
      .attr('dy', '.5ex')
      .attr('text-anchor', 'end')
      .attr('class', 'label')
  
    // Creat Grid Group
    const gGrid = generateGroup(gTimeline, {
      className: 'grid',
      xOffset: yAxisWidth + defaultPadding + 25,
      yOffset: xAxisHeight,
    })
  
    // Create YAxis GridLines
    const yAxisGridHeight = height - xAxisHeight - 82
    const yAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-yAxisGridHeight)
      .tickFormat('')
  
    // Render YAxis Gridlines
    const gYAxisGrid = gGrid
      .append('g')
      .attr('class', 'yAxisGrid')
      .call(yAxisGridLines)
  
    gYAxisGrid
      .selectAll('.tick line')
      .attr('stroke', '#e8e8e8')
      .attr('stroke-dasharray', '2')
  
    gYAxisGrid.select('.domain').remove()
  
    // Creat XAxis GridLines
    const xAxisGridLines = d3
      .axisRight(yAxisScale)
      .tickSize(xAxisWidth)
      .tickFormat('')
  
    // Render XAxis Gridlines
    const gXAxisGrid = gGrid
      .append('g')
      .attr('class', 'xAxisGrid')
      .attr('transform', 'translate(0, 23.5)')
      .call(xAxisGridLines)
  
    gXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8')
    gXAxisGrid.select('.domain').remove()
  
    // add vertical line
    const lineScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([yAxisWidth + defaultPadding + 25 - 1, width])
  
    const verticalLineText = svg
      .append('text')
      .attr('class', styles.verticalLineText)
      .attr('y', 42)
  
    const mouseover = () => {
      focus.style('opacity', 1)
      verticalLineText.style('opacity', 1)
  
    }
  
    const mousemove = (d, i, nodes) => {
      const date = xAxisScale.invert(d3.mouse(nodes[i])[0])
      const linePositionX = Date.parse(date)
  
      focus
        .attr('x1', xAxisScale(linePositionX))
        .attr('x2', xAxisScale(linePositionX))
        .attr('y1', 32)
        .attr('y2', 439)
        .attr('stroke', '#58595a')
  
      verticalLineText
      .text(d3.timeFormat('%Y.%m.%d')(lineScale.invert(d3.mouse(nodes[i])[0])))
        .attr('x', xAxisScale(linePositionX))
    }
  
    const mouseout = () => {
      focus.style('opacity', 0)
      verticalLineText.style('opacity', 0)
    }
  
    const verticalLine = gTimeline
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('x', 179)
      .attr('y', 32)
      .attr('width', xAxisWidth)
      .attr('height', height - xAxisHeight - overViewAxisHeight)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout)
  
    // Add color scale 
    const circleColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#00745e','#faafa5','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
    const rectColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#27b097','#fa6b57','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
  
    const legendColorScale = d3.scaleOrdinal(d3.schemePaired)
  
    // Add tooltip
    const tooltip = d3
      .select(`.${styles.timelineChart}`)
      .append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
  
    //  Create Data Group
    const gData = generateGroup(gTimeline, {
      className: 'data',
      xOffset: yAxisWidth + defaultPadding + 25,
      yOffset: xAxisHeight,
    })
  
    //  Add Circle Group
    timelineData.forEach((data, idx) => {
      gData
        .append('g')
        .attr('class', d => `circles-${idx}`)
        .selectAll('circle')
        .data(circleDataFilter(data.dataPoints))
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('cy', yAxisScale(data.label[data.label.length - 1]) + 23.5)
        .attr('r', 7.5)
        .attr('fill', circleColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)
  
          tooltip
            .style('left', `${x + 200}px`)
            .style('top', `${y - 20}px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => tooltip.transition().duration(200).style('opacity', 0))
  
    })
  
    // Add Rect Group
    timelineData.forEach((data, idx) => {
      gData
        .append('g')
        .attr('class', `rects-${idx}`)
        .selectAll('rect')
        .data(rectDataFilter(data.dataPoints))
        .enter()
        .append('rect')
        .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('y', yAxisScale(data.label[data.label.length - 1]) + 16)
        .attr('height', 15)
        .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
        .attr('fill', rectColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)
  
          tooltip
            .style('left', `${x + 200}px`)
            .style('top', `${y - 20}px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => tooltip.transition().duration(200).style('opacity', 0))
    })
  
    // add clip (avoid displaying the circle and rect outside the chart area)
    const clip = gTimeline
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', xAxisWidth)
      .attr('height', height - overViewAxisHeight - xAxisHeight * 2)
  
    // overviewAxis
    const gOverViewAxis =  generateGroup(gTimeline, {
      className: 'overViewAxis',
      xOffset: yAxisWidth + defaultPadding + 25,
      yOffset: height - overViewAxisHeight - xAxisHeight,
    })
  
    const overViewGrid = generateGroup(gOverViewAxis, {
      className: styles.overViewXAxisGrid,
      xOffset: 0,
      yOffset: 0,
    }).call(
      d3
      .axisTop(xAxisScale)
      .tickSize(-overViewAxisHeight)
      .tickFormat(''),
    )
    overViewGrid.selectAll('.domain').attr('stroke', '#003964')
    overViewGrid.selectAll('.tick line').attr('stroke', 'none')
  
    const overViewXAxis = generateGroup(gOverViewAxis, {
      className: styles.overViewXAxis,
      xOffset: 0,
      yOffset: overViewAxisHeight + 10,
    }).call(d3.axisBottom(xAxisScale).tickPadding(0))
    
    overViewXAxis.selectAll('.domain').remove()
    overViewXAxis.selectAll('.tick line').remove()
  
    gTimeline.append('line')
    .attr('x1', yAxisWidth + defaultPadding + 25)
    .attr('x2', width)
    .attr('y1', height - overViewAxisHeight - xAxisHeight)
    .attr('y2', height - overViewAxisHeight - xAxisHeight)
    .attr('stroke', '#003964')

    gTimeline.append('line')
    .attr('x1', yAxisWidth + defaultPadding + 25)
    .attr('x2', width)
    .attr('y1', height - xAxisHeight)
    .attr('y2', height - xAxisHeight)
    .attr('stroke', '#003964')
  
    // Add brush
    const brushLeftTopPositionX = 0
    const brushLeftTopPositionY = 0
    const brushRightTopPositionX = xAxisWidth
    const brushRightTopPositionY = overViewAxisHeight
  
    const brushed = () => {
      const { brushEvent } = this.props;
      const selection = d3.event.selection
      if (selection === null) return

      const [ brushStart, brushEnd ] = selection
      const start = overViewXAxisScale.invert(brushStart)
      const end = overViewXAxisScale.invert(brushEnd)
      const time = { start, end }
      
      xAxisScale.domain([Date.parse(start), Date.parse(end)])
      lineScale.domain([Date.parse(start), Date.parse(end)])

      typeof brushEvent === "function" ? brushEvent(time) : null
  
      gXAxis
        .transition()
        .duration(500)
        .call(xAxis)
  
        gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H998.5V-6')
        gXAxis.selectAll('.tick line').remove()
    
        gYAxisGrid.selectAll('tick').remove()
    
        const yAxisGridLines = d3
          .axisTop(xAxisScale)
          .tickSize(-yAxisGridHeight)
          .tickFormat('')
    
        gYAxisGrid
          .transition()
          .duration(500)
          .call(yAxisGridLines)
    
        gYAxisGrid
          .selectAll('.tick line')
          .attr('stroke', '#e8e8e8')
          .attr('stroke-dasharray', '2')
    
        gYAxisGrid.select('.domain').remove()
  
  
  
      gData
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('clip-path', 'url(#clip)')
  
      gData
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
        .attr('clip-path', 'url(#clip)')
    }
  
    const brush = d3
      .brushX()
      .extent([
        [brushLeftTopPositionX, brushLeftTopPositionY],
        [brushRightTopPositionX, brushRightTopPositionY],
      ])
      .on('end', brushed)
  
    const overViewXAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, xAxisWidth])
  
    const gBrush = generateGroup(gOverViewAxis, {
      className: 'overViewXAxisBrush'
    })
  
    gBrush.call(brush)
  
    // add reset
    d3.select('#reset').on('click', () => {
      const { brushEvent } = this.props;
      xAxisScale.domain(overViewXAxisScale.domain())
      lineScale.domain(overViewXAxisScale.domain())
  
      gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M 0.5 0V0.5H998.5V-6')
      gXAxis.selectAll('.tick line').remove()
  
      const yAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-yAxisGridHeight)
        .tickFormat('')
  
      gYAxisGrid
        .transition()
        .duration(500)
        .call(yAxisGridLines)
  
      gYAxisGrid
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')
  
      gYAxisGrid.select('.domain').remove()
  
  
      gXAxis
        .transition()
        .duration(500)
        .call(xAxis)
  
      gBrush
        .select('rect.selection')
        .transition()
        .duration(500)
        .attr('width', 0)
  
      gData
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
  
      gData
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))

      typeof brushEvent === "function" ? brushEvent() : null
    })
  
  
    const focus = gTimeline
      .append('line')
      .attr('class', 'focus')
      .attr('fill', 'none')
      .style('pointer-events', 'none')
  }

  componentDidMount = () => {
    const { data } = this.props
    if (isEmpty(data)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(data)) {
      return this.errorMessage('typeOfVariable')
    }

    return this.renderTimeline(data)
  }

  render() {    
    return (
      <div className={styles.timelineChart}>

      </div>
    );
  }
}
export default Timeline;