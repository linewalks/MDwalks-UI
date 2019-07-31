import React, { Component } from 'react';
import * as d3 from 'd3'
import { renderSVG, generateGroup,  getStartAndEndTime, circleDataFilter, rectDataFilter, labelList, lineDataFormatConvert } from '../../helper/chartUtility'
import styles from './LineMergeTimeline.css'
import isEmpty from 'lodash/isEmpty'

class LineMergeTimeline extends Component {
  constructor(props) {
    super(props);
    const {startTime, endTime} = getStartAndEndTime(
      this.props.timeData.map(d => d.dataPoints).flat(),
    )

    this.options = {
      width: this.props.chartWidth || 1200, // 차트가 그려지는 전체 영역 넓이
      height: this.props.chartHeight || 835, // 차트가 그려지는 전체 영영 높이
      xAxisHeight: 64, // 화면상단에서 x축까지의 거리
      yAxisWidth: 208, // 화면좌측에서 y축까지의 거리
      overViewAxisHeight: 50, // 차트 브러쉬 높이
      defaultPadding: {
        top: 42, // x축에서 처음 그리드 라인까지의 거리
        right: 30, // x축 오른쪽 끝과 차트 오른쪽 끝 사이의 거리
        left: 23, // 축에서 라벨까지의 거리
        bottom: 64 // 차트 전체높이에서 브러쉬 밑부분까지의 거리        
      },
      defaultMargin: {
        top: 40
      },
      startTime,
      endTime,
      lineYAxisHeight: 206,
      labelStartYPosition: 0,
      labelLastYPosition: 369

    }

    this.xAxisWidth = this.options.width - this.options.yAxisWidth - this.options.defaultPadding.right
  }
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

  createXAxis = (xAxis) => {
    const { yAxisWidth, xAxisHeight } = this.options

    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(d3.select('.timeline'), {
      className: styles.xAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })  

    // 2. Render xAxis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5 V0.5')
    gXAxis.selectAll('.tick line').remove()    
  }

  createLineYAxis = (lineYAxisScale) => {
    const { yAxisWidth, xAxisHeight } = this.options
      // 1. Create Line YAxis group
      const gLineYAxis = generateGroup(d3.select('.timeline'), {
      className: styles.gLineYAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })
 
    // 2. Create Line YAxis
    const lineYAxis = d3.axisLeft(lineYAxisScale)
                      .tickValues([0, 0.25, 0.5, 0.75, 1])
                      .tickFormat(d => `${d}`)
                      .tickPadding(17)

    // 3. Add LineTitle
    const lineTitle = d3.select('.timeline')
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
  
  }

  createLineGrid = (xAxisScale, lineYAxisScale) => {
    const { xAxisHeight, yAxisWidth, defaultPadding, lineYAxisHeight } = this.options
    // 1. Creat  Entire LineGrid Group
    const gLineGrid = generateGroup(d3.select('.timeline'), {
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
      .tickSize(this.xAxisWidth + defaultPadding.right)
      .tickFormat('')

    // 2. Render Line XAxis Gridlines
    const gLineXAxisGrid = gLineGrid
      .append('g')
      .attr('class', 'lineXAxisGrid')
      .call(lineXAxisGridLines)

    // 3. CSS Line XAxis
    gLineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('x2', this.xAxisWidth)
    gLineXAxisGrid.select('.domain').remove()    
  }

  createVerticalLine = ( svg, xAxisScale, lineScale ) => {
    const { xAxisHeight, yAxisWidth, defaultPadding, height, overViewAxisHeight } = this.options
  
    // Create Entire Vertical Line      
    const focus = d3.select('.timeline')
      .append('line')
      .attr('class', 'focus')
      .attr('fill', 'none')
      .style('pointer-events', 'none')


     // 1. Create vertical line text
    const verticalLineText = svg
      .append('text')
      .attr('class', styles.verticalLineText)
      .attr('y', xAxisHeight)


    // 2. Create vertical line mouse event 
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

    // 3. Create Vertical Area and Add Mouse Event
    const verticalLine = d3.select('.timeline')
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight)
      .attr('width', this.xAxisWidth)
      .attr('height', height - xAxisHeight - overViewAxisHeight - defaultPadding.bottom)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout)
  }

  renderLineChart = (svg, lineChartData, xAxisScale, lineYAxisScale, line) => {
    const { yAxisWidth, xAxisHeight, defaultPadding, lineYAxisHeight } = this.options  
    // Create Line Chart
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


    // 1. Create Line Chart group
    const gLine = generateGroup(d3.select('.timeline'), {
      className: 'gLine',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Render Line Chart
    gLine
      .append('g')
      .append("path")
      .datum(lineChartData)
      .attr("class", "line")  
      .attr("fill", "none")
      .attr("stroke", "url(#svgGradient)")
      .attr("stroke-width", 2)
      .attr("d", line); 

    // 3. Render Line Point
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
        const tooltip = d3.select(`.${styles.tooltip}`)
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
      .on('mouseout', d => d3.select(`.${styles.tooltip}`).transition().duration(200).style('opacity', 0))    
  }

  createTimelineLabel = (timelineYAxisScale, timelineData) => {
    const { defaultPadding, defaultMargin, xAxisHeight, lineYAxisHeight, yAxisWidth } = this.options
  
    // 1. Create Timeline Label Group
    const gTimelineLabels = generateGroup(d3.select('.timeline'), {
      className: styles.timelineLabels,
      xOffset: -defaultPadding.left,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.top,
    })

    // 2. Render Timeline Label
    const timelineTitle = d3.select('.timeline')
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
  }

  createTimelineXAxis = (xAxis) => {
    const { yAxisWidth, xAxisHeight, lineYAxisHeight, defaultMargin } = this.options

    // 1. Create Timeline XAxis Group
    const gTimelineXAxis = generateGroup(d3.select('.timeline'), {
      className: 'timelineXAxis',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top,
    })

    // 2. Render Timeline XAxis
    gTimelineXAxis.call(xAxis)
    gTimelineXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5V0.5')
    gTimelineXAxis.selectAll('.tick').remove()  
  }

  createTimelineGrid = (xAxisScale, timelineYAxisScale) => {
    const { yAxisWidth, xAxisHeight, lineYAxisHeight, defaultMargin, height, defaultPadding, overViewAxisHeight } = this.options
    // Creat Timeline Grid 
    // 1. Create Timeline Grid Group
    const gTimelineGrid = generateGroup(d3.select('.timeline'), {
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
      .tickSize(this.xAxisWidth)
      .tickFormat('')

    // 5. Render Timeline XAxis Gridlines
    const gTimelineXAxisGrid = gTimelineGrid
      .append('g')
      .attr('class', 'timelineXAxisGrid')
      .attr('transform', `translate(0, ${defaultPadding.top - 5})`)
      .call(timelineXAxisGridLines)

    gTimelineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8')
    gTimelineXAxisGrid.select('.domain').remove()
  }

  renderTimelineChart = (timelineData, xAxisScale, timelineYAxisScale) => {
    const { yAxisWidth, xAxisHeight, lineYAxisHeight, defaultMargin } = this.options
    // Create Timeline Chart
    const circleColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#00745e','#faafa5','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
    const rectColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(['#27b097','#fa6b57','#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec'])
    
    // 1. Create Timeline Data Group
    const gTimelineData = generateGroup(d3.select('.timeline'), {
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
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('cy', timelineYAxisScale(data.label[data.label.length - 1]))
        .attr('r', 7.5)
        .attr('fill', circleColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltip = d3.select(`.${styles.tooltip}`)
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x + yAxisWidth}px`)
            .style('top', `${y + xAxisHeight + lineYAxisHeight + 7.5 }px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => d3.select(`.${styles.tooltip}`).transition().duration(200).style('opacity', 0))

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
        .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('y', timelineYAxisScale(data.label[data.label.length - 1]) - 7.5)
        .attr('height', 15)
        .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
        .attr('fill', rectColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltip = d3.select(`.${styles.tooltip}`)
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot}></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x  + yAxisWidth}px`)
            .style('top', `${y  + xAxisHeight + lineYAxisHeight + 7.5 }px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', d => d3.select(`.${styles.tooltip}`).transition().duration(200).style('opacity', 0))

    })
  
  }

  createTimelineOverView = (xAxisScale) => {
    const { defaultPadding, yAxisWidth, height, overViewAxisHeight, width } = this.options
    // Create OverViewAxis 
    // 1. Create OverViewAxis Group
    const gOverViewAxis = generateGroup(d3.select('.timeline'), {
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
    d3.select('.timeline')
      .append('line')
      .attr('x1', yAxisWidth)
      .attr('x2', width - defaultPadding.right)
      .attr('y1', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('y2', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('stroke', '#003964')
  
    d3.select('.timeline')
      .append('line')
      .attr('x1', yAxisWidth)
      .attr('x2', width - defaultPadding.right)
      .attr('y1', height - defaultPadding.bottom + 10)
      .attr('y2', height - defaultPadding.bottom + 10)
      .attr('stroke', '#003964')
  }

  createBrush = (xAxisScale, lineScale, xAxis, line ,overViewXAxisScale) => {
    const { height, xAxisHeight, defaultPadding, defaultMargin, overViewAxisHeight, lineYAxisHeight } = this.options
    // Create Brush
    // 1. Create Brush point
    const brushLeftTopPositionX = 0
    const brushLeftTopPositionY = 0
    const brushRightTopPositionX = this.xAxisWidth
    const brushRightTopPositionY = overViewAxisHeight
  
    // 2. Create Brush Funtion
    const brushed = () => {
      const { brushEvent } = this.props
      const selection = d3.event.selection
      if (selection === null) return

      const [ brushStart, brushEnd ] = selection
      const start = overViewXAxisScale.invert(brushStart)
      const end = overViewXAxisScale.invert(brushEnd)
      const time = { start, end }
      

      typeof brushEvent === "function" ? brushEvent(time) : null

      xAxisScale.domain([Date.parse(start), Date.parse(end)])
  
      lineScale.domain([Date.parse(start), Date.parse(end)])
  
      d3.select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .call(xAxis)
  
      d3.select(`.${styles.xAxis}`)        
        .transition()
        .duration(500)
        .selectAll('.domain')
        .attr('stroke', '#c4c4c4')
        .attr('d', 'M0.5 0V0.5H962.5V0.5')

      d3.select(`.${styles.xAxis}`)        
        .transition()
        .duration(500)
        .selectAll('.tick line')
        .remove()


      // Line Chart Grid
      d3.select('.lineYAxisGrid').selectAll('tick').remove()

      const lineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-lineYAxisHeight)
        .tickFormat('')
    
      d3.select('.lineYAxisGrid')
        .transition()
        .duration(500)
        .call(lineYAxisGridLines)
      
  
      d3.select('.lineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')
  
      d3.select('.lineYAxisGrid').select('.domain').remove()

      // Timeline Chart Grid
      d3.select('.timelineYAxisGrid').selectAll('tick').remove()
      const timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight)
      const timelineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-timelineYAxisGridHeight)
        .tickFormat('')

      d3.select('.timelineYAxisGrid')
        .transition()
        .duration(500)
        .call(timelineYAxisGridLines)

      d3.select('.timelineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', '#e8e8e8')
        .attr('stroke-dasharray', '2')

      d3.select('.timelineYAxisGrid').select('.domain').remove()

      // Line Chart Data Render
      d3.select('.gLine')
        .selectAll("path")
        .transition()
        .duration(500)
        .attr('d', line)
        .attr('clip-path', 'url(#clip)')

      d3.select('.gLine')
        .selectAll(".lineDot")
        .transition()
        .duration(500)
        .attr('clip-path', 'url(#clip)')
        .attr("cx", d => xAxisScale(Date.parse(d.x)))

      // Timeline Data Render
      d3.select('.timelineData')
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('clip-path', 'url(#clip)')

      d3.select('.timelineData')
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
        .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
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
  
    const gBrush = generateGroup(d3.select('.overViewAxis'), {
      className: 'overViewXAxisBrush'
    })
  
    gBrush.call(brush)   
  }

  addChartReset = (id, xAxisScale, lineScale, overViewXAxisScale, line, xAxis) => {
    const { lineYAxisHeight, height, xAxisHeight, defaultMargin, defaultPadding, overViewAxisHeight } = this.options
    const { brushEvent } = this.props;
      d3.select(`#${id}`).on('click', () => {

        // Initialize XAxisScale, VerticalLineScale
        xAxisScale.domain(overViewXAxisScale.domain())
        lineScale.domain(overViewXAxisScale.domain())
        d3.select(`.${styles.xAxis}`) 
          .transition()
          .duration(500)
          .call(xAxis)
  
        d3.select(`.${styles.xAxis}`)         
          .transition()
          .duration(500)
          .selectAll('.domain')
          .attr('stroke', '#c4c4c4')
          .attr('d', 'M0.5 0V0.5H962.5 V0.5')
        
        d3.select(`.${styles.xAxis}`)         
          .transition()
          .duration(500)
          .selectAll('.tick line').remove()
    
  
        // Initialize Line Chart Grid
        const lineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-lineYAxisHeight)
        .tickFormat('')
    
        d3.select('.lineYAxisGrid')
          .transition()
          .duration(500)
          .call(lineYAxisGridLines)
        
  
        d3.select('.lineYAxisGrid')
          .selectAll('.tick line')
          .attr('stroke', '#e8e8e8')
          .attr('stroke-dasharray', '2')
  
        d3.select('.lineYAxisGrid').select('.domain').remove()
       
        const timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight)
        // Initialize Timeline Grid
        const timelineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-timelineYAxisGridHeight)
        .tickFormat('')
  
        d3.select('.timelineYAxisGrid')
          .transition()
          .duration(500)
          .call(timelineYAxisGridLines)
  
        d3.select('.timelineYAxisGrid')
          .selectAll('.tick line')
          .attr('stroke', '#e8e8e8')
          .attr('stroke-dasharray', '2')
  
        d3.select('.timelineYAxisGrid').select('.domain').remove()
    
  
        // Initialize Line Chart Data
        d3.select('.gLine')
          .selectAll("path")
          .transition()
          .duration(500)
          .attr('d', line)
  
        d3.select('.gLine')
          .selectAll(".lineDot")
          .transition()
          .duration(500)
          .attr("cx", d => xAxisScale(Date.parse(d.x)))
        
        // Initialize Timeline 
        d3.select('.timelineData')
          .selectAll('circle')
          .transition()
          .duration(500)
          .attr('cx', (d, i) => xAxisScale(Date.parse(d.startTime)))
  
        d3.select('.timelineData')
          .selectAll('rect')
          .transition()
          .duration(500)
          .attr('x', (d, i) => xAxisScale(Date.parse(d.startTime)))
          .attr('width', d => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
  
       
        // Initialize Brush
        d3.select('.overViewXAxisBrush')
          .select('rect.selection')
          .transition()
          .duration(500)
          .attr('width', 0)
  
          typeof brushEvent === "function" ? brushEvent() : null
      })
  }




  renderLineMergeTimeline = (timeData, lineData) => {
    const timelineData = timeData;
    const lineChartData = lineDataFormatConvert(lineData);
    const { width, height, overViewAxisHeight, yAxisWidth, startTime, endTime, lineYAxisHeight, defaultPadding, labelStartYPosition, labelLastYPosition } = this.options
    const { resetBtnId } = this.props
    // Create tooltip
    d3
      .select(`.${styles.timelineChart}`)
      .append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
   
    const svg = renderSVG(d3.select(`.${styles.timelineChart}`), this.options.width, this.options.height)
   
    // Create Entire groups
    // 1. Entire timeline group
    const gTimeline = generateGroup(svg, { className: 'timeline' })

    // Create Clip (avoid displaying the chart outside the chart area)
    const clip = gTimeline
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', -20)
      .attr('width', this.xAxisWidth)
      .attr('height', height - overViewAxisHeight - defaultPadding.bottom)

    // Create XAxisScale
    const xAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, this.xAxisWidth])  
    
    // Create YAxisScale for LineChart
    const lineYAxisScale = d3.scaleLinear()
      .domain([0, 1])
      .range([lineYAxisHeight, defaultPadding.top])

    // Create VerticalLine Scale
    const lineScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([yAxisWidth , width - defaultPadding.right])

    // Create TimelineYAxis Scale
    const timelineYAxisScale = d3
      .scalePoint()
      .domain(labelList(timelineData))
      .range([labelStartYPosition, labelLastYPosition])

    // Create OverViewXAxis Scale
    const overViewXAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, this.xAxisWidth])

    // Create XAxis
    const xAxis = d3.axisTop(xAxisScale).tickPadding(6)

    // Create LineChart Coordinate Generator
    const line = d3.line()
      .x( d => xAxisScale(Date.parse(d.x))) // set the x values for the line generator
      .y( d => lineYAxisScale(d.y)) // set the y values for the line generator 

    this.createXAxis(xAxis)
    this.createLineYAxis(lineYAxisScale)
    this.createLineGrid(xAxisScale, lineYAxisScale)
    this.createVerticalLine(svg, xAxisScale, lineScale)
    this.renderLineChart(svg, lineChartData, xAxisScale, lineYAxisScale, line)  
    this.createTimelineLabel(timelineYAxisScale, timelineData)
    this.createTimelineXAxis(xAxis)
    this.createTimelineGrid(xAxisScale, timelineYAxisScale)
    this.renderTimelineChart(timelineData, xAxisScale, timelineYAxisScale)  
    this.createTimelineOverView(xAxisScale)
    this.createBrush(xAxisScale, lineScale, xAxis, line, overViewXAxisScale)
    resetBtnId ? this.addChartReset(resetBtnId, xAxisScale, lineScale, overViewXAxisScale, line, xAxis) : null

    // TODO: Code Refactoring Module
  }

  componentDidMount = () => {
    const { timeData, lineData } = this.props
    if (isEmpty(timeData) || isEmpty(lineData)) {
      return this.errorMessage('haveData')
    }

    if (!Array.isArray(timeData) || !(lineData !== null && typeof lineData === 'object')) {
      return this.errorMessage('typeOfVariable')
    }

    return this.renderLineMergeTimeline(timeData, lineData)
  }

  render() {    
    return (
      <div className={styles.timelineChart}>

      </div>
    );
  }
}
export default LineMergeTimeline;