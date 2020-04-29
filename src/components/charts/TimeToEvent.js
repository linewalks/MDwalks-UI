import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import _ from 'lodash'
import {
  renderSVG, generateGroup, getStartAndEndTime,
  circleDataFilter, rectDataFilter, labelList, errorMessage,
} from '@src/helper/chartUtility'
import { colorV1 } from '@src/assets/styles/variables'

import {
  getColorsByTheme,
  Themes,
} from '@Components/ChartColor'

import styles from './TimeToEvent.module.css'

class TimeToEvent extends Component {
  constructor(props) {
    super(props);
    const {
      data, chartWidth, chartHeight, theme,
    } = this.props

    const { startTime, endTime } = !this.checkDataValidation() && getStartAndEndTime(
      _.flatten(_.map(data, (d) => d.dataPoints)),
    )

    this.colors = getColorsByTheme(theme)

    this.options = {
      width: chartWidth || 776, // 차트가 그려지는 전체 영역 넓이
      height: chartHeight || 290, // 차트가 그려지는 전체 영영 높이
      defaultMargin: {
        top: 55,
        right: 24,
        left: 96,
        bottom: 28,
      },
      defaultPadding: {
        top: 85,
        right: 24,
        left: 63,
        bottom: 50,
      },
      radius: 7.5,
      labelStartYPosition: 0,
      labelLastYPosition: 92,
      startTime,
      endTime,
    }

    this.xAxisWidth = this.options.width
      - this.options.defaultMargin.left - this.options.defaultMargin.right
    this.yAxisHeight = this.options.height
      - this.options.defaultMargin.top - this.options.defaultMargin.bottom
    this.rootElement = React.createRef()
    this.xAxisScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([4, this.xAxisWidth - 59])
      .nice()

    this.yAxisScale = d3
      .scalePoint()
      .domain(!this.checkDataValidation() && labelList(data))
      .range([this.options.labelStartYPosition, this.options.labelLastYPosition])
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  createXAxis = (xAxis) => {
    const { defaultMargin, height } = this.options

    const gXAxis = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: styles.xAxis,
      xOffset: defaultMargin.left,
      yOffset: height - defaultMargin.bottom,
    })

    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', colorV1.$grey06).attr('d', `M0.5,0.5H${this.xAxisWidth}.5`)
    gXAxis.selectAll('.tick line').remove()

    gXAxis
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.xAxisWidth)
      .attr('y1', -this.yAxisHeight)
      .attr('y2', -this.yAxisHeight)
      .attr('stroke', colorV1.$grey06)

    gXAxis
      .append('text')
      .text('Years')
      .attr('x', this.xAxisWidth - 15)
      .attr('y', 26)
      .attr('id', `${styles.xAxisTitle}`)
      .style('fill', colorV1.$grey08)
  }

  createTimeToEventLabel = (data) => {
    const { defaultMargin, defaultPadding } = this.options

    const gTimeToEventLabels = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: styles.timeToEventLabels,
      xOffset: defaultMargin.left,
      yOffset: defaultMargin.top + defaultPadding.top,
    })

    gTimeToEventLabels
      .selectAll('.timeToEventLabel')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.label[d.label.length - 1])
      .attr('x', -16)
      .attr('y', (d) => this.yAxisScale(d.label[d.label.length - 1]) + 4)
      .attr('text-anchor', 'end')
      .attr('class', `${styles.timeToEventLabel}`)
      .style('fill', colorV1.$grey08)
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
      .attr('stroke', '#dce0e4')
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

    gTimeToEventXAxisGrid.selectAll('.tick line').attr('stroke', '#dce0e4')
    gTimeToEventXAxisGrid.select('.domain').remove()
  }

  renderTimeToEventData = () => {
    const { defaultMargin, defaultPadding, radius } = this.options
    const { data } = this.props

    const gTimeToEventData = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: 'timelineData',
      xOffset: defaultMargin.left,
      yOffset: defaultMargin.top + defaultPadding.top,
    })

    _.each(data, (el, idx) => {
      gTimeToEventData
        .append('g')
        .attr('class', `rects-${idx}`)
        .selectAll('rect')
        .data(rectDataFilter(el.dataPoints))
        .enter()
        .append('rect')
        .attr('x', (d) => this.xAxisScale(Date.parse(d.startTime)))
        .attr('y', this.yAxisScale(el.label[el.label.length - 1]) - 1)
        .attr('height', 3)
        .attr('width', (d) => this.xAxisScale(Date.parse(d.endTime)) - this.xAxisScale(Date.parse(d.startTime)))
        .attr('fill', this.colors[idx])
    })

    _.each(data, (el, idx) => {
      gTimeToEventData
        .append('g')
        .attr('class', () => `circles-${idx}`)
        .selectAll('circle')
        .data(circleDataFilter(el.dataPoints))
        .enter()
        .append('circle')
        .attr('cx', (d) => this.xAxisScale(Date.parse(d.startTime)))
        .attr('cy', this.yAxisScale(el.label[el.label.length - 1]))
        .attr('r', radius)
        .attr('fill', this.colors[idx])
    })
  }

  createLegend = (...args) => {
    const gLegend = generateGroup(this.getRootElement().select('.timeToEvent'), {
      className: `${styles.gLegend}`,
    })

    gLegend
      .selectAll('legendCircle')
      .data(args)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => 5 + (i * 86))
      .attr('cy', 5)
      .attr('r', 5)
      .style('fill', (d, i) => this.colors[i])

    gLegend
      .selectAll('legend')
      .data(args)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => 18 + (86 * i))
      .attr('y', 10.5)
      .text((d) => d)
      .style('fill', colorV1.$grey08)
  }

  renderTimeToEvent = (data) => {
    const { width, height, startTime } = this.options
    const svg = renderSVG(d3.select(this.rootElement.current), width, height)

    generateGroup(svg, { className: 'timeToEvent' })

    const xAxis = d3
      .axisBottom(this.xAxisScale)
      .tickPadding(16)
      .tickSize(0)
      .tickArguments([d3.timeYear.every(1)])
      .tickFormat((d) => d3.timeFormat('%Y')(d) - d3.timeFormat('%Y')(new Date(startTime)))

    this.createLegend('Patient', 'Group')
    this.createXAxis(xAxis)
    this.createTimeToEventLabel(data)
    this.createTimeToEventGrid()
    this.renderTimeToEventData()
  }

  componentDidMount = () => {
    const { data } = this.props
    if (!this.checkDataValidation()) {
      this.renderTimeToEvent(data)
    }
  }

  checkDataValidation = () => {
    const { data } = this.props
    if (_.isEmpty(data)) return 'haveData'
    if (!Array.isArray(data)) return 'typeOfVariable'
    return null
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

TimeToEvent.defaultProps = {
  data: [],
  chartWidth: 776, // 차트가 그려지는 전체 영역 넓이
  chartHeight: 290, // 차트가 그려지는 전체 영영 높이
  theme: Themes.ThemeComparePrimarySea2,
}

TimeToEvent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dataPoints: PropTypes.arrayOf(
        PropTypes.shape({
          startTime: PropTypes.string,
          endTime: PropTypes.string,
        }),
      ),
      label: PropTypes.arrayOf(PropTypes.string),
      order: PropTypes.number,
    }),
  ),
  chartWidth: PropTypes.number,
  chartHeight: PropTypes.number,
  theme: PropTypes.oneOf([
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
  ]),
}

export default TimeToEvent;
