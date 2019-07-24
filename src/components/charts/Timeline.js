import React, { Component } from 'react';
import * as d3 from 'd3'
import { renderSVG, generateGroup,  getStartAndEndTime, circleDataFilter, rectDataFilter, labelList, lineDataFormatConvert } from '../../helper/chartUtility'
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

  renderTimeline = (timeData, lineData, chartWidth, chartHeight) => {
    const { brushEvent } = this.props;
    const timelineData = timeData;
    const lineChartData = lineDataFormatConvert(lineData);
    const width = chartWidth // 차트가 그려지는 전체 영역 넓이
    const height = chartHeight // 차트가 그려지는 전체 영영 높이
    const xAxisHeight = 64 // 화면상단에서 x축까지의 거리
    const yAxisWidth = 208 // 화면좌측에서 y축까지의 거리
    const overViewAxisHeight = 50 // 차트 브러쉬 높이
    const defaultPadding = {
      top: 42, // x축에서 처음 그리드 라인까지의 거리
      right: 30, // x축 오른쪽 끝과 차트 오른쪽 끝 사이의 거리
      left: 23, // 축에서 라벨까지의 거리
      bottom: 64 // 차트 전체높이에서 브러쉬 밑부분까지의 거리
    }

    const defaultMargin = {
      top: 40
    }

    const xAxisWidth = width - yAxisWidth - defaultPadding.right

    const svg = renderSVG(d3.select(`.${styles.timelineChart}`), width, height)
   
    // Create Entire groups
    // 1. Entire timeline group
    const gTimeline = generateGroup(svg, { className: 'timeline' })
    
    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(gTimeline, {
      className: styles.xAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Get min, max time
    const [startTime, endTime] = getStartAndEndTime(
      timelineData.map(d => d.dataPoints).flat(),
    )

    // 3. Create x axis scale
    const xAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, xAxisWidth])

    // 4. Create xAxis
    const xAxis = d3.axisTop(xAxisScale).tickPadding(6)
  

    // 5. Render xAxis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5 V0.5')
    gXAxis.selectAll('.tick line').remove()

    //  Create line yAxis
    // 1. Create Line YAxis group
    const gLineYAxis = generateGroup(gTimeline, {
      className: styles.gLineYAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Create Line YAxis scale
    const lineYAxisHeight = 206;
    const lineYAxisScale = d3.scaleLinear()
                            .domain([0, 1])
                            .range([lineYAxisHeight, defaultPadding.top])
  
    // 3. Create Line YAxis
    const lineYAxis = d3.axisLeft(lineYAxisScale)
                      .tickValues([0, 0.25, 0.5, 0.75, 1])
                      .tickFormat(d => `${d}`)
                      .tickPadding(17)

    const lineTitle = gTimeline
      .append('text')
      .text('MACE Risk by Visit')
      .attr('text-anchor', 'end')
      .attr('dx', -23)
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight + 6)
      .attr('class', styles.title)
 
      // 4. Render Line YAxis 
    gLineYAxis.call(lineYAxis)
    gLineYAxis.selectAll('.domain').remove()
    gLineYAxis.selectAll('.tick line').remove()


    // Create line chart grid
    // 1. Creat  Entire LineGrid Group
    const gLineGrid = generateGroup(gTimeline, {
      className: 'gLineGrid',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight
    })

    // 2. Create Line YAxis GridLines
    const lineYAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-lineYAxisHeight)
      .tickFormat('')

    // 3. Render Line YAxis Gridlines
    const gLineYAxisGrid = gLineGrid
      .append('g')
      .attr('class', 'lineYAxisGrid')
      .call(lineYAxisGridLines)

    // 4. CSS Line YAxis
    gLineYAxisGrid
      .selectAll('.tick line')
      .attr('stroke', '#e8e8e8')
      .attr('stroke-dasharray', '2')

    gLineYAxisGrid.select('.domain').remove()


    // 1. Creat Line XAxis GridLines
    const lineXAxisGridLines = d3
      .axisRight(lineYAxisScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickSize(xAxisWidth + defaultPadding.right)
      .tickFormat('')
  
    // 2. Render Line XAxis Gridlines
    const gLineXAxisGrid = gLineGrid
      .append('g')
      .attr('class', 'lineXAxisGrid')
      .call(lineXAxisGridLines)

    // 3. CSS Line XAxis
    gLineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('x2', xAxisWidth)
    gLineXAxisGrid.select('.domain').remove()


    // Create Entire Vertical Line
    // 1. Create vertical line text
    const verticalLineText = svg
      .append('text')
      .attr('class', styles.verticalLineText)
      .attr('y', xAxisHeight)

    // 2. Create vertical line scale
    const lineScale = d3
    .scaleTime()
    .domain([startTime, endTime])
    .range([yAxisWidth , width - defaultPadding.right])

    // 3. Create vertical line mouse event 
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
        .attr('y1', xAxisHeight)
        .attr('y2', height - xAxisHeight - overViewAxisHeight)
        .attr('stroke', '#58595a')
    
      verticalLineText
        .text(d3.timeFormat('%Y.%m.%d')(lineScale.invert(d3.mouse(nodes[i])[0])))
        .attr('x', xAxisScale(linePositionX))
    }
  
    const mouseout = () => {
      focus.style('opacity', 0)
      verticalLineText.style('opacity', 0)
    }

    // 4. Create Vertical Area and Add Mouse Event
    const verticalLine = gTimeline
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight)
      .attr('width', xAxisWidth)
      .attr('height', height - xAxisHeight - overViewAxisHeight - defaultPadding.bottom)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout)

    // Create tooltip
    const tooltip = d3
      .select(`.${styles.timelineChart}`)
      .append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
    
    //  Create Line Color Gradient
    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr('class', 'start')
      .attr("offset", "0%")
      .attr("stop-color", "#002d4f")
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr('class', 'end')
      .attr("offset", "100%")
      .attr("stop-color", "#189bff")
      .attr("stop-opacity", 1)

  //  Create Line Point Gradient
  const colorScale = d3.scaleLinear()
    .domain([defaultPadding.top, lineYAxisHeight])
    .range(["#002d4f", "#189bff"])

  // Create Line Chart
  // 1. Create line generator
  const line = d3.line()
    .x( d => xAxisScale(Date.parse(d.x))) // set the x values for the line generator
    .y( d => lineYAxisScale(d.y)) // set the y values for the line generator 

  // 2. Create Line Chart group
  const gLine = generateGroup(gTimeline, {
    className: 'gLine',
    xOffset: yAxisWidth,
    yOffset: xAxisHeight,
  })

  // 3. Render Line Chart
  gLine
    .append('g')
    .append("path")
    .datum(lineChartData)
    .attr("class", "line")  
    .attr("fill", "none")
    .attr("stroke", "url(#svgGradient)")
    .attr("stroke-width", 2)
    .attr("d", line); 

  // 4. Render Line Point
  gLine
    .append('g')
    .selectAll(".lineDot")
    .data(lineChartData)
    .enter()
    .append("circle") 
    .attr("class", "lineDot") 
    .attr('fill', d => colorScale(lineYAxisScale(d.y)))
    .attr("cx", d => xAxisScale(Date.parse(d.x)))
    .attr("cy", d => lineYAxisScale(d.y))
    .attr("r", 5)    
    .on('mouseover', d => {
      const x = xAxisScale(Date.parse(d.x)) + yAxisWidth + 2.5
      const y = lineYAxisScale(d.y)
      const label = d.y
      const tooltipDescription = `
        <div>
          <div><span class=${styles.tooltipLabel}>${label}</span></div>
        </div>
        `
      tooltip.transition().duration(200).style('opacity', 1)

      tooltip
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('pointer-events', 'none')
        .html(tooltipDescription)
    })
    .on('mouseout', d => tooltip.transition().duration(200).style('opacity', 0))


    // Create Timeline Label
    // 1. Create Timeline Label Scale
    const labelStartYPosition = 0
    const labelLastYPosition = 369
    const timelineYAxisScale = d3
      .scalePoint()
      .domain(labelList(timelineData))
      .range([labelStartYPosition, labelLastYPosition])
  
    // 2. Create Timeline Label Group
    const gTimelineLabels = generateGroup(gTimeline, {
      className: styles.timelineLabels,
      xOffset: -defaultPadding.left,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.top,
    })

    // 3. Render Timeline Label
    const timelineTitle = gTimeline
      .append('text')
      .text('Clinical Timeline')
      .attr('text-anchor', 'end')
      .attr('dx', -23)
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight + lineYAxisHeight + defaultMargin.top + 6)
      .attr('class', styles.title)

    gTimelineLabels
      .selectAll('.timelineLabel')
      .data(timelineData)
      .enter()
      .append('text')
      .text(d => d.label[d.label.length - 1])
      .attr('x', yAxisWidth)
      .attr('y', d => timelineYAxisScale(d.label[d.label.length - 1]))
      .attr('text-anchor', 'end')
      .attr('class', 'timelineLabel')

    // Create Timeline XAxis
    // 1. Create Timeline XAxis Group
    const gTimelineXAxis = generateGroup(gTimeline, {
      className: 'timelineXAxis',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top,
    })

    // 2. Render Timeline XAxis
    gTimelineXAxis.call(xAxis)
    gTimelineXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5V0.5')
    gTimelineXAxis.selectAll('.tick').remove()

  
    // Creat Timeline Grid 
    // 1. Create Timeline Grid Group
    const gTimelineGrid = generateGroup(gTimeline, {
      className: 'gTimelineGrid',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top,
    })

    // 2. Create Timeline YAxis GridLines
    const timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight)
    const timelineYAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-timelineYAxisGridHeight)
      .tickFormat('')
  
    
    // 3. Render Timeline YAxis Gridlines
    const gTimelineYAxisGrid = gTimelineGrid
      .append('g')
      .attr('class', 'timelineYAxisGrid')
      .call(timelineYAxisGridLines)

    gTimelineYAxisGrid
      .selectAll('.tick line')
      .attr('stroke', '#e8e8e8')
      .attr('stroke-dasharray', '2')

    gTimelineYAxisGrid.select('.domain').remove()

    // 4.Creat Timeline XAxis GridLines
    const timelineXAxisGridLines = d3
      .axisRight(timelineYAxisScale)
      .tickSize(xAxisWidth)
      .tickFormat('')

    // 5. Render Timeline XAxis Gridlines
    const gTimelineXAxisGrid = gTimelineGrid
      .append('g')
      .attr('class', 'timelineXAxisGrid')
      .attr('transform', `translate(0, ${defaultPadding.top - 5})`)
      .call(timelineXAxisGridLines)

    gTimelineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8')
    gTimelineXAxisGrid.select('.domain').remove()
  
   
     
    // Create Timeline Color Scale 
    const circleColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#00745e','#faafa5','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
    const rectColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#27b097','#fa6b57','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
  
  
    // Create Timeline Chart
    // 1. Create Timeline Data Group
    const gTimelineData = generateGroup(gTimeline, {
      className: 'timelineData',
      xOffset: yAxisWidth ,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top * 2 - 2.5,
    })
  
    // 2. Render Timeline Circle 
    timelineData.forEach((data, idx) => {
      gTimelineData
        .append('g')
        .attr('class', d => `circles-${idx}`)
        .selectAll('circle')
        .data(circleDataFilter(data.dataPoints))
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.start_time)))
        .attr('cy', timelineYAxisScale(data.label[data.label.length - 1]))
        .attr('r', 7.5)
        .attr('fill', circleColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]

          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.start_time))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.end_time))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x + yAxisWidth}px`)
            .style('top', `${y + xAxisHeight + lineYAxisHeight + 7.5 }px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => tooltip.transition().duration(200).style('opacity', 0))

    })

    // Add Rect Group
    timelineData.forEach((data, idx) => {
      gTimelineData
        .append('g')
        .attr('class', `rects-${idx}`)
        .selectAll('rect')
        .data(rectDataFilter(data.dataPoints))
        .enter()
        .append('rect')
        .attr('x', (d, i) => xAxisScale(Date.parse(d.start_time)))
        .attr('y', timelineYAxisScale(data.label[data.label.length - 1]) - 7.5)
        .attr('height', 15)
        .attr('width', d => xAxisScale(Date.parse(d.end_time)) - xAxisScale(Date.parse(d.start_time)))
        .attr('fill', rectColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]

          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.start_time))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.end_time))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x  + yAxisWidth}px`)
            .style('top', `${y  + xAxisHeight + lineYAxisHeight + 7.5 }px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => tooltip.transition().duration(200).style('opacity', 0))

    })
  
    // Create Clip (avoid displaying the chart outside the chart area)
    const clip = gTimeline
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', -20)
      .attr('width', xAxisWidth)
      .attr('height', height - overViewAxisHeight - defaultPadding.bottom)
  
    // Create OverViewAxis 
    // 1. Create OverViewAxis Group
    const gOverViewAxis = generateGroup(gTimeline, {
      className: 'overViewAxis',
      xOffset: yAxisWidth,
      yOffset: height - overViewAxisHeight - defaultPadding.bottom + 10,
    })

    // 2. Render OverViewAxis Grid
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

    // 3. Render OverViewXAxis
    const overViewXAxis = generateGroup(gOverViewAxis, {
      className: styles.overViewXAxis,
      xOffset: 0,
      yOffset: overViewAxisHeight,
    }).call(d3.axisBottom(xAxisScale).tickPadding(17))

    overViewXAxis.selectAll('.domain').attr('stroke', '#003964').attr('d', 'M0.5 0V0.5H962.5V0.5')
    overViewXAxis.selectAll('.tick line').remove()

    // 4. Render OverView Cover Line
    gTimeline.append('line')
      .attr('x1', yAxisWidth)
      .attr('x2', width - defaultPadding.right)
      .attr('y1', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('y2', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('stroke', '#003964')
  
    gTimeline.append('line')
    .attr('x1', yAxisWidth)
    .attr('x2', width - defaultPadding.right)
    .attr('y1', height - defaultPadding.bottom + 10)
    .attr('y2', height - defaultPadding.bottom + 10)
    .attr('stroke', '#003964')

  
    // Create Brush
    // 1. Create Brush point
    const brushLeftTopPositionX = 0
    const brushLeftTopPositionY = 0
    const brushRightTopPositionX = xAxisWidth
    const brushRightTopPositionY = overViewAxisHeight
  
    // 2. Create Brush Funtion
    const brushed = () => {
      const selection = d3.event.selection
      if (selection === null) return

      const [ brushStart, brushEnd ] = selection
      const start = overViewXAxisScale.invert(brushStart)
      const end = overViewXAxisScale.invert(brushEnd)
      const time = { start, end }
      

      typeof brushEvent === "function" ? brushEvent(time) : null

      xAxisScale.domain([Date.parse(start), Date.parse(end)])
  
      lineScale.domain([Date.parse(start), Date.parse(end)])
  
      gXAxis
        .transition()
        .duration(500)
        .call(xAxis)
  
      gXAxis        
        .transition()
        .duration(500)
        .selectAll('.domain')
        .attr('stroke', '#c4c4c4')
        .attr('d', 'M0.5 0V0.5H962.5V0.5')

      gXAxis        
        .transition()
        .duration(500)
        .selectAll('.tick line')
        .remove()


      // Line Chart Grid
      gLineYAxisGrid.selectAll('tick').remove()

      const lineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-lineYAxisHeight)
        .tickFormat('')
    
      gLineYAxisGrid
        .transition()
        .duration(500)
        .call(lineYAxisGridLines)
      
  
      gLineYAxisGrid
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')
  
      gLineYAxisGrid.select('.domain').remove()

      // Timeline Chart Grid
      gTimelineYAxisGrid.selectAll('tick').remove()

      const timelineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-timelineYAxisGridHeight)
        .tickFormat('')

      gTimelineYAxisGrid
        .transition()
        .duration(500)
        .call(timelineYAxisGridLines)

      gTimelineYAxisGrid
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')

      gTimelineYAxisGrid.select('.domain').remove()

      // Line Chart Data Render
      gLine
        .selectAll("path")
        .transition()
        .duration(500)
        .attr('d', line)
        .attr('clip-path', 'url(#clip)')

      gLine
        .selectAll(".lineDot")
        .transition()
        .duration(500)
        .attr('clip-path', 'url(#clip)')
        .attr("cx", d => xAxisScale(Date.parse(d.x)))

      // Timeline Data Render
      gTimelineData
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.start_time)))
        .attr('clip-path', 'url(#clip)')

      gTimelineData
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d, i) => xAxisScale(Date.parse(d.start_time)))
        .attr('width', d => xAxisScale(Date.parse(d.end_time)) - xAxisScale(Date.parse(d.start_time)))
        .attr('clip-path', 'url(#clip)')
    }
  
    // Add Brush Event
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
  
    // Add Reset Button
    d3.select('#reset').on('click', () => {
      xAxisScale.domain(overViewXAxisScale.domain())
      lineScale.domain(overViewXAxisScale.domain())
      gXAxis
        .transition()
        .duration(500)
        .call(xAxis)

      gXAxis        
        .transition()
        .duration(500)
        .selectAll('.domain')
        .attr('stroke', '#c4c4c4')
        .attr('d', 'M0.5 0V0.5H962.5 V0.5')
      
      gXAxis        
        .transition()
        .duration(500)
        .selectAll('.tick line').remove()
  

      // Initialize Line Chart Grid
      const lineYAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-lineYAxisHeight)
      .tickFormat('')
  
      gLineYAxisGrid
        .transition()
        .duration(500)
        .call(lineYAxisGridLines)
      

      gLineYAxisGrid
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')

      gLineYAxisGrid.select('.domain').remove()

      // Initialize Timeline Grid
      const timelineYAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-timelineYAxisGridHeight)
      .tickFormat('')

      gTimelineYAxisGrid
        .transition()
        .duration(500)
        .call(timelineYAxisGridLines)

      gTimelineYAxisGrid
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')

      gTimelineYAxisGrid.select('.domain').remove()
  

      // Initialize Line Chart Data
      gLine
        .selectAll("path")
        .transition()
        .duration(500)
        .attr('d', line)

      gLine
        .selectAll(".lineDot")
        .transition()
        .duration(500)
        .attr("cx", d => xAxisScale(Date.parse(d.x)))
      
      // Initialize Timeline 
      gTimelineData
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.start_time)))

      gTimelineData
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d, i) => xAxisScale(Date.parse(d.start_time)))
        .attr('width', d => xAxisScale(Date.parse(d.end_time)) - xAxisScale(Date.parse(d.start_time)))

     
      // Initialize Brush
      gBrush
        .select('rect.selection')
        .transition()
        .duration(500)
        .attr('width', 0)

        typeof brushEvent === "function" ? brushEvent() : null
    })

  
    const focus = gTimeline
      .append('line')
      .attr('class', 'focus')
      .attr('fill', 'none')
      .style('pointer-events', 'none')
  }

  componentDidMount = () => {
    const { timeData, lineData, chartWidth, chartHeight } = this.props
    if (isEmpty(timeData) || isEmpty(lineData)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(timeData) || !(lineData !== null && typeof lineData === 'object')) {
      return this.errorMessage('typeOfVariable')
    }
    

    return this.renderTimeline(timeData, lineData, chartWidth, chartHeight)
  }

  render() {    
    return (
      <div className={styles.timelineChart}>

      </div>
    );
  }
}
export default Timeline;