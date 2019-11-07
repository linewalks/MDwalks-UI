import React, { Component } from 'react';
import * as d3 from 'd3'
import _ from 'lodash'
import styles from './TimeToEvent.module.css'
import { renderSVG, generateGroup,  getStartAndEndTime, circleDataFilter, rectDataFilter, labelList, errorMessage } from '@src/helper/chartUtility'
import { color } from '@src/assets/styles/variables'

class TimeToEvent extends Component {
  constructor(props) {
    super(props);
    const { startTime, endTime } = !this.checkDataValidation() && getStartAndEndTime(
      this.props.data.map(d => d.dataPoints).flat(),
    )

    this.options = {
      width: this.props.chartWidth || 776, // 차트가 그려지는 전체 영역 넓이
      height: this.props.chartHeight || 290, // 차트가 그려지는 전체 영영 높이
      defaultMargin: {
        top: 58,         
        right: 24, 
        left: 63,         
        bottom: 78         
      },
      defaultPadding: {
        top: 39,         
        right: 24, 
        left: 63,         
        bottom: 50        
      },
      radius: 7.5,
      labelStartYPosition: 0,
      labelLastYPosition: 70,
      startTime,
      endTime
    }

    this.xAxisWidth = this.options.width - this.options.defaultMargin.left - this.options.defaultMargin.right
    this.yAxisHeight = this.options.height - this.options.defaultMargin.top - this.options.defaultMargin.bottom
    this.rootElement = React.createRef()
    this.xAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([0, this.xAxisWidth])
      .nice()
    
    this.yAxisScale = d3
      .scalePoint()
      .domain(!this.checkDataValidation() && labelList(this.props.data))
      .range([this.options.labelStartYPosition, this.options.labelLastYPosition])
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  createXAxis = (xAxis) => {
    const { defaultMargin, defaultPadding, height } = this.options
 
    const gXAxis = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: styles.xAxis,
      xOffset: defaultMargin.left,
      yOffset: height - defaultMargin.bottom,
    })  

    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4')
    gXAxis.selectAll('.tick line').remove()    

    gXAxis
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.xAxisWidth)
      .attr('y1', -this.yAxisHeight)
      .attr('y2', -this.yAxisHeight)
      .attr('stroke', '#c4c4c4')

    gXAxis
      .append('text')
      .text('Years')
      .attr('x', 328)
      .attr('y', defaultPadding.bottom)
      .attr('id', `${styles.xAxisTitle}`)
      .style('fill', color.$black)
  }

  createTimeToEventLabel = (data) => {
    const { defaultMargin, defaultPadding } = this.options
  
    const gTimeToEventLabels = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: styles.timeToEventLabels,
      xOffset: defaultMargin.left ,
      yOffset: defaultMargin.top + defaultPadding.top
    })

    gTimeToEventLabels
      .selectAll('.timeToEventLabel')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.label[d.label.length - 1])
      .attr('x', -16)
      .attr('y', d => this.yAxisScale(d.label[d.label.length - 1]) + 4)
      .attr('text-anchor', 'end')
      .attr('class', `${styles.timeToEventLabel}`)
  }

  createTimeToEventGrid = () => {
    const { height, defaultMargin, defaultPadding } = this.options

    const gTimelToEventGrid = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: 'gTimeToEventGrid',
      xOffset: defaultMargin.left,
      yOffset: defaultMargin.top,
    })

    const timeToEventYAxisGridHeight = height - defaultMargin.top - defaultMargin.bottom
    const timeToEventYAxisGridLines = d3
      .axisTop(this.xAxisScale)
      .tickSize(-timeToEventYAxisGridHeight)
      .tickFormat('')
     
    const gTimeToEventYAxisGrid = gTimelToEventGrid
      .append('g')
      .attr('class', 'timeToEventYAxisGrid')
      .call(timeToEventYAxisGridLines)

    gTimeToEventYAxisGrid
      .selectAll('.tick line')
      .attr('stroke', '#e8e8e8')
      .attr('stroke-dasharray', '2')

      gTimeToEventYAxisGrid.select('.domain').remove()

    const timeToEventXAxisGridLines = d3
      .axisRight(this.yAxisScale)
      .tickSize(this.xAxisWidth)
      .tickFormat('')

    const gTimeToEventXAxisGrid = gTimelToEventGrid
      .append('g')
      .attr('class', 'timeToEventXAxisGrid')
      .attr('transform', `translate(0, ${defaultPadding.top})`)
      .call(timeToEventXAxisGridLines)

    gTimeToEventXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8')
    gTimeToEventXAxisGrid.select('.domain').remove()
  }

  renderTimeToEventData = () => {
    const { defaultMargin, defaultPadding, radius } = this.options
    const { data } = this.props
    const circleColorScale = [color.$primary_navy, color.$legend_timeline_red_01]
    
    const gTimeToEventData = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: 'timelineData',
      xOffset: defaultMargin.left ,
      yOffset: defaultMargin.top + defaultPadding.top,
    })
  
    data.forEach((el, idx) => {
      gTimeToEventData
        .append('g')
        .attr('class', `rects-${idx}`)
        .selectAll('rect')
        .data(rectDataFilter(el.dataPoints))
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.xAxisScale(Date.parse(d.startTime)))
        .attr('y', this.yAxisScale(el.label[el.label.length - 1]) - 1)
        .attr('height', 3)
        .attr('width', d => this.xAxisScale(Date.parse(d.endTime)) - this.xAxisScale(Date.parse(d.startTime)))
        .attr('fill', color.$primary_navy)
    })

    data.forEach((el, idx) => {
      gTimeToEventData
        .append('g')
        .attr('class', d => `circles-${idx}`)
        .selectAll('circle')
        .data(circleDataFilter(el.dataPoints))
        .enter()
        .append('circle')
        .attr('cx', (d, i) => this.xAxisScale(Date.parse(d.startTime)))
        .attr('cy', this.yAxisScale(el.label[el.label.length - 1]))
        .attr('r', radius)
        .attr('fill', (d, i) => circleColorScale[i])
    })
    
  }

  createLegend = (...args) => {
    const { $primary_navy, $legend_timeline_red_01 } = color
    const legendColorSet = [$primary_navy, $legend_timeline_red_01]
    const gLegend = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: `${styles.gLegend}`
    })

    gLegend
      .selectAll('legendCircle')
      .data(args)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => 5 + (i * 189))
      .attr('cy', 5)
      .attr('r', 5)
      .style('fill', (d, i) => legendColorSet[i])

    gLegend
      .selectAll('legend')
      .data(args)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => 18 + (189 * i))
      .attr('y', 10.5)
      .text(d => d)
      .style('fill', color.$black)
  } 

  renderTimeToEvent = (data) => {
    const { width, height, startTime } = this.options
    const svg = renderSVG(d3.select(this.rootElement.current), width, height)
    
    const gTimeToEvent = generateGroup(svg, { className: 'timeToEvent' })  

    const xAxis = d3
      .axisBottom(this.xAxisScale)
      .tickPadding(14)
      .tickSize(0)
      .tickArguments([d3.timeYear.every(1)])
      .tickFormat(d => d3.timeFormat('%Y')(d) - d3.timeFormat('%Y')(new Date(startTime)))

    this.createLegend('Index Invasive Treatment', 'MACE')
    this.createXAxis(xAxis)
    this.createTimeToEventLabel(data)
    this.createTimeToEventGrid()
    this.renderTimeToEventData()
  }

  componentDidMount = () => {
    const { data } = this.props
    !this.checkDataValidation() && this.renderTimeToEvent(data)
  }

  checkDataValidation = () => {
    const { data } = this.props    
    if (_.isEmpty(data)) return 'haveData'
    if (!Array.isArray(data)) return 'typeOfVariable' 
  }

  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return (
      <div ref={this.rootElement} className={styles.timeToEvent} />
    );
  }
}

export default TimeToEvent;
