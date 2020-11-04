import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import _ from 'lodash'
import styles from '@Charts/LineMergeTimeline.module.css'
import {
  renderSVG, generateGroup, getStartAndEndTime,
  circleDataFilter, rectDataFilter, labelList,
  lineDataFormatConvert, errorMessage,
} from '@src/helper/chartUtility'
import { getColorsByTheme, Themes, ColorSetMap } from '@Components/ChartColor'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

class LineMergeTimeline extends Component {
  rootElement = React.createRef()

  constructor(props) {
    super(props);
    const { chartWidth, chartHeight } = this.props

    this.options = {
      width: chartWidth || 1200, // 차트가 그려지는 전체 영역 넓이
      height: chartHeight || 835, // 차트가 그려지는 전체 영영 높이
      xAxisHeight: 64, // 화면상단에서 x축까지의 거리
      yAxisWidth: 208, // 화면좌측에서 y축까지의 거리
      overViewAxisHeight: 50, // 차트 브러쉬 높이
      defaultPadding: {
        top: 42, // x축에서 처음 그리드 라인까지의 거리
        right: 50, // x축 오른쪽 끝과 차트 오른쪽 끝 사이의 거리
        left: 23, // 축에서 라벨까지의 거리
        bottom: 64, // 차트 전체높이에서 브러쉬 밑부분까지의 거리
      },
      defaultMargin: {
        top: 40,
      },
      lineYAxisHeight: 206,
      labelStartYPosition: 0,
      labelLastYPosition: 369,

    }

    this.xAxisWidth = this.options.width
      - this.options.yAxisWidth
      - this.options.defaultPadding.right
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  createXAxis = (xAxis) => {
    const { yAxisWidth, xAxisHeight } = this.options

    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(this.getRootElement().select('.timeline'), {
      className: styles.xAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Render xAxis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', color.$grey06).attr('d', 'M0.5 0V0.5H942.5 V0.5')
    gXAxis.selectAll('.tick line').remove()
    gXAxis
      .selectAll('.tick text')
      .attr('class', fontStyle.fs14)
      .style('fill', color.$grey08)
  }

  createLineYAxis = (lineYAxisScale) => {
    const { yAxisWidth, xAxisHeight } = this.options
    const { yAxisChartLabel: { line } } = this.props
    // 1. Create Line YAxis group
    const gLineYAxis = generateGroup(this.getRootElement().select('.timeline'), {
      className: styles.gLineYAxis,
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Create Line YAxis
    const lineYAxis = d3
      .axisLeft(lineYAxisScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat((d) => `${d}`)
      .tickPadding(17)

    // 3. Add LineTitle
    // const lineTitle =
    this.getRootElement().select('.timeline')
      .append('text')
      .text(line)
      .attr('text-anchor', 'end')
      .attr('dx', -23)
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight + 6)
      .attr('class', `${fontStyle.fs14} ${fontStyle.bold}`)
      .style('fill', color.$grey09)

    // 4. Render Line YAxis
    gLineYAxis.call(lineYAxis)
    gLineYAxis.selectAll('.domain').remove()
    gLineYAxis.selectAll('.tick line').remove()
    gLineYAxis
      .selectAll('.tick text')
      .attr('class', fontStyle.fs14)
      .style('fill', color.$grey08)
  }

  createLineGrid = (xAxisScale, lineYAxisScale) => {
    const {
      xAxisHeight, yAxisWidth, defaultPadding, lineYAxisHeight,
    } = this.options
    // 1. Creat  Entire LineGrid Group
    const gLineGrid = generateGroup(this.getRootElement().select('.timeline'), {
      className: 'gLineGrid',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Create Line YAxis GridLines
    const lineYAxisGridLines = d3
      .axisTop(xAxisScale)
      .tickSize(-lineYAxisHeight)
      .tickFormat('')

    // 3. Render LicircleColorList YAxis Gridlines
    const gLineYAxisGrid = gLineGrid
      .append('g')
      .attr('class', 'lineYAxisGrid')
      .call(lineYAxisGridLines)

    // 4. CSS Line YAxis
    gLineYAxisGrid
      .selectAll('.tick line')
      .attr('stroke', color.$grey04)
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
    gLineXAxisGrid.selectAll('.tick line').attr('stroke', color.$grey04).attr('x2', this.xAxisWidth)
    gLineXAxisGrid.select('.domain').remove()
  }

  createVerticalLine = (svg, xAxisScale, lineScale) => {
    const {
      xAxisHeight, yAxisWidth, defaultPadding, height, overViewAxisHeight,
    } = this.options

    // Create Entire Vertical Line
    const focus = this.getRootElement().select('.timeline')
      .append('line')
      .attr('class', 'focus')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .style('pointer-events', 'none')

    // 1. Create vertical line text
    const verticalLineText = svg
      .append('text')
      .attr('class', `${styles.verticalLineText} ${fontStyle.fs12} ${fontStyle.bold}`)
      .attr('y', xAxisHeight)
      .attr('fill', color.$grey09)

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
        .attr('stroke', color.$grey09)

      verticalLineText
        .text(d3.timeFormat('%Y.%m.%d')(lineScale.invert(d3.mouse(nodes[i])[0])))
        .attr('x', xAxisScale(linePositionX))
    }

    const mouseout = () => {
      focus.style('opacity', 0)
      verticalLineText.style('opacity', 0)
    }

    // 3. Create Vertical Area and Add Mouse Event
    // const verticalLine =
    this.getRootElement().select('.timeline')
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
    const {
      yAxisWidth, xAxisHeight, defaultPadding, lineYAxisHeight,
    } = this.options
    const { scoreClickEvent } = this.props
    // Create Line Chart
    //  Create Line Color Gradient
    const defs = svg.append('defs');

    const gradient = defs.append('linearGradient')
      .attr('id', 'svgGradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', _.nth(getColorsByTheme(Themes.ThemeArrangeGradientPrimarySea), 2))
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', _.nth(getColorsByTheme(Themes.ThemeArrangeGradientPrimarySea), 0))
      .attr('stop-opacity', 1)

    //  Create Line Point Gradient
    const colorScale = d3.scaleLinear()
      .domain([defaultPadding.top, lineYAxisHeight])
      .range([
        _.nth(getColorsByTheme(Themes.ThemeArrangeGradientPrimarySea), 2),
        _.nth(getColorsByTheme(Themes.ThemeArrangeGradientPrimarySea), 0),
      ])

    // 1. Create Line Chart group
    const gLine = generateGroup(this.getRootElement().select('.timeline'), {
      className: 'gLine',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight,
    })

    // 2. Render Line Chart
    gLine
      .append('g')
      .append('path')
      .datum(lineChartData)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (_lineChartData) => {
        const lineChartFirstYValue = _lineChartData[0].y
        return _lineChartData.every((el) => el.y === lineChartFirstYValue) ? colorScale(lineYAxisScale(lineChartFirstYValue)) : 'url(#svgGradient)'
      })
      .attr('stroke-width', 2)
      .attr('d', line);

    // 3. Render Line Point
    gLine
      .append('g')
      .selectAll(`${styles.lineDot}`)
      .data(lineChartData)
      .enter()
      .append('circle')
      .attr('class', `${styles.lineDot}`)
      .attr('fill', (d) => colorScale(lineYAxisScale(d.y)))
      .attr('cx', (d) => xAxisScale(Date.parse(d.x)))
      .attr('cy', (d) => lineYAxisScale(d.y))
      .attr('r', 5)
      .on('mouseover', (d) => {
        const x = xAxisScale(Date.parse(d.x)) + yAxisWidth + 2.5
        const y = lineYAxisScale(d.y)
        const label = d.y
        const tooltip = this.getRootElement().select(`.${styles.tooltip}`)
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
      .on('mouseout', () => this.getRootElement().select(`.${styles.tooltip}`).transition().duration(200)
        .style('opacity', 0))
      .on('click', (d, i) => {
        if (_.isFunction(scoreClickEvent)) {
          scoreClickEvent(d, i)
        }
      })
  }

  createTimelineLabel = (timelineYAxisScale, timelineData) => {
    const {
      defaultPadding, defaultMargin, xAxisHeight, lineYAxisHeight, yAxisWidth,
    } = this.options
    const { yAxisChartLabel: { bar } } = this.props
    // 1. Create Timeline Label Group
    const gTimelineLabels = generateGroup(this.getRootElement().select('.timeline'), {
      className: styles.timelineLabels,
      xOffset: -defaultPadding.left,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.top,
    })

    // 2. Render Timeline Label
    // const timelineTitle =
    this.getRootElement().select('.timeline')
      .append('text')
      .text(bar)
      .attr('text-anchor', 'end')
      .attr('dx', -23)
      .attr('x', yAxisWidth)
      .attr('y', xAxisHeight + lineYAxisHeight + defaultMargin.top + 6)
      .attr('class', `${fontStyle.fs14} ${fontStyle.bold}`)
      .style('fill', color.$grey09)

    gTimelineLabels
      .selectAll('.timelineLabel')
      .data(timelineData)
      .enter()
      .append('text')
      .text((d) => d.label[d.label.length - 1])
      .attr('x', yAxisWidth)
      .attr('y', (d) => timelineYAxisScale(d.label[d.label.length - 1]))
      .attr('text-anchor', 'end')
      .attr('class', fontStyle.fs14)
      .style('fill', color.$grey08)
  }

  createTimelineXAxis = (xAxis) => {
    const {
      yAxisWidth, xAxisHeight, lineYAxisHeight, defaultMargin,
    } = this.options

    // 1. Create Timeline XAxis Group
    const gTimelineXAxis = generateGroup(this.getRootElement().select('.timeline'), {
      className: 'timelineXAxis',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top,
    })

    // 2. Render Timeline XAxis
    gTimelineXAxis.call(xAxis)
    gTimelineXAxis.selectAll('.domain').attr('stroke', color.$grey06).attr('d', 'M0.5 0V0.5H942.5V0.5')
    gTimelineXAxis.selectAll('.tick').remove()
  }

  createTimelineGrid = (xAxisScale, timelineYAxisScale) => {
    const {
      yAxisWidth, xAxisHeight,
      lineYAxisHeight, defaultMargin,
      height, defaultPadding, overViewAxisHeight,
    } = this.options
    // Creat Timeline Grid
    // 1. Create Timeline Grid Group
    const gTimelineGrid = generateGroup(this.getRootElement().select('.timeline'), {
      className: 'gTimelineGrid',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top,
    })

    // 2. Create Timeline YAxis GridLines
    const timelineYAxisGridHeight = height
      - (xAxisHeight + lineYAxisHeight
        + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight
      )

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
      .attr('stroke', color.$grey04)
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

    gTimelineXAxisGrid.selectAll('.tick line').attr('stroke', color.$grey04)
    gTimelineXAxisGrid.select('.domain').remove()
  }

  renderTimelineChart = (timelineData, xAxisScale, timelineYAxisScale) => {
    const {
      yAxisWidth, xAxisHeight, lineYAxisHeight, defaultMargin,
    } = this.options

    const rectColorList = _.map(
      ['teal400', 'sea600', 'rose200', 'bluegrey300', 'bluegrey230', 'bluegrey170', 'bluegrey120', 'bluegrey80', 'bluegrey50'],
      (name) => ColorSetMap[name],
    )

    const circleColorList = _.map(['teal600', 'sea600', 'rose200', 'bluegrey300', 'bluegrey230', 'bluegrey170', 'bluegrey120', 'bluegrey80', 'bluegrey50'], (name) => ColorSetMap[name])

    // Create Timeline Chart
    const circleColorScale = d3.scaleOrdinal()
      .domain(_.slice(labelList(timelineData), 0, 3))
      .range(circleColorList)

    const rectColorScale = d3.scaleOrdinal().domain(labelList(timelineData)).range(rectColorList)

    // 1. Create Timeline Data Group
    const gTimelineData = generateGroup(this.getRootElement().select('.timeline'), {
      className: 'timelineData',
      xOffset: yAxisWidth,
      yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top * 2 - 2.5,
    })

    // 2. Add Rect Group
    timelineData.forEach((data, idx) => {
      gTimelineData
        .append('g')
        .attr('class', `rects-${idx}`)
        .selectAll('rect')
        .data(rectDataFilter(data.dataPoints))
        .enter()
        .append('rect')
        .attr('x', (d) => xAxisScale(Date.parse(d.startTime)))
        .attr('y', timelineYAxisScale(data.label[data.label.length - 1]) - 7.5)
        .attr('height', 15)
        .attr('width', (d) => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
        .attr('fill', rectColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltip = this.getRootElement().select(`.${styles.tooltip}`)
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot} style="background-color: ${rectColorScale(data.label[data.label.length - 1])};"></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x + yAxisWidth}px`)
            .style('top', `${y + xAxisHeight + lineYAxisHeight + 7.5}px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', () => this.getRootElement().select(`.${styles.tooltip}`).transition().duration(200)
          .style('opacity', 0))
    })

    // 3. Render Timeline Circle
    timelineData.forEach((data, idx) => {
      gTimelineData
        .append('g')
        .attr('class', () => `circles-${idx}`)
        .selectAll('circle')
        .data(circleDataFilter(data.dataPoints))
        .enter()
        .append('circle')
        .attr('cx', (d) => xAxisScale(Date.parse(d.startTime)))
        .attr('cy', timelineYAxisScale(data.label[data.label.length - 1]))
        .attr('r', 7.5)
        .attr('fill', circleColorScale(data.label[data.label.length - 1]))
        .attr('clip-path', 'url(#clip)')
        .on('mouseover', (d, i, nodes) => {
          const [x, y] = d3.mouse(nodes[i])
          const label = data.label[data.label.length - 1]
          const tooltip = this.getRootElement().select(`.${styles.tooltip}`)
          const tooltipDescription = `
            <div>
              <div class=${styles.tooltipLabel}><span class=${styles.dot} style="background-color: ${circleColorScale(data.label[data.label.length - 1])};"></span> ${label}</div>
              <div class=${styles.tooltipDay}>${d3.timeFormat('%Y.%m.%d')(new Date(d.startTime))} ~ ${d3.timeFormat('%Y.%m.%d')(new Date(d.endTime))}</div>
            </div>
            `
          tooltip.transition().duration(200).style('opacity', 1)

          tooltip
            .style('left', `${x + yAxisWidth}px`)
            .style('top', `${y + xAxisHeight + lineYAxisHeight + 7.5}px`)
            .style('pointer-events', 'none')
            .html(tooltipDescription)
        })
        .on('mouseout', () => this.getRootElement().select(`.${styles.tooltip}`).transition().duration(200)
          .style('opacity', 0))
    })
  }

  createTimelineOverView = (xAxisScale) => {
    const {
      defaultPadding, yAxisWidth, height, overViewAxisHeight, width,
    } = this.options
    // Create OverViewAxis
    // 1. Create OverViewAxis Group
    const gOverViewAxis = generateGroup(this.getRootElement().select('.timeline'), {
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
    overViewGrid.selectAll('.domain').attr('stroke', color.$grey07)
    overViewGrid.selectAll('.tick line').attr('stroke', 'none')

    // 3. Render OverViewXAxis
    const overViewXAxis = generateGroup(gOverViewAxis, {
      className: styles.overViewXAxis,
      xOffset: 0,
      yOffset: overViewAxisHeight,
    }).call(d3.axisBottom(xAxisScale).tickPadding(17))

    overViewXAxis.selectAll('.domain').attr('stroke', color.$grey07).attr('d', 'M0.5 0V0.5H942.5V0.5')
    overViewXAxis.selectAll('.tick line').remove()
    overViewXAxis
      .selectAll('.tick text')
      .attr('class', fontStyle.fs14)
      .style('fill', color.$grey08)

    // 4. Render OverView Cover Line
    this.getRootElement().select('.timeline')
      .append('line')
      .attr('x1', yAxisWidth)
      .attr('x2', width - defaultPadding.right)
      .attr('y1', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('y2', height - overViewAxisHeight - defaultPadding.bottom + 10)
      .attr('stroke', color.$grey07)

    this.getRootElement().select('.timeline')
      .append('line')
      .attr('x1', yAxisWidth)
      .attr('x2', width - defaultPadding.right)
      .attr('y1', height - defaultPadding.bottom + 10)
      .attr('y2', height - defaultPadding.bottom + 10)
      .attr('stroke', color.$grey07)
  }

  createBrush = (xAxisScale, lineScale, xAxis, line, overViewXAxisScale) => {
    const {
      height, xAxisHeight, defaultPadding, defaultMargin, overViewAxisHeight, lineYAxisHeight,
    } = this.options
    // Create Brush
    // 1. Create Brush point
    const brushLeftTopPositionX = 0
    const brushLeftTopPositionY = 0
    const brushRightTopPositionX = this.xAxisWidth
    const brushRightTopPositionY = overViewAxisHeight

    // 2. Create Brush Funtion
    const brushed = () => {
      const { brushEvent } = this.props
      const { selection } = d3.event
      if (selection === null) return

      const [brushStart, brushEnd] = selection
      const start = overViewXAxisScale.invert(brushStart)
      const end = overViewXAxisScale.invert(brushEnd)
      const time = { start, end }

      if (_.isFunction(brushEvent)) {
        brushEvent(time)
      }

      xAxisScale.domain([Date.parse(start), Date.parse(end)])

      lineScale.domain([Date.parse(start), Date.parse(end)])

      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .call(xAxis)
        .selectAll('.tick text')
        .attr('class', fontStyle.fs14)
        .style('fill', color.$grey08)

      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .selectAll('.domain')
        .attr('stroke', color.$grey06)
        .attr('d', 'M0.5 0V0.5H942.5V0.5')

      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .selectAll('.tick line')
        .remove()

      // Line Chart Grid
      this.getRootElement().select('.lineYAxisGrid').selectAll('tick').remove()

      const lineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-lineYAxisHeight)
        .tickFormat('')

      this.getRootElement().select('.lineYAxisGrid')
        .transition()
        .duration(500)
        .call(lineYAxisGridLines)

      this.getRootElement().select('.lineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', color.$grey04)
        .attr('stroke-dasharray', '2')

      this.getRootElement().select('.lineYAxisGrid').select('.domain').remove()

      // Timeline Chart Grid
      this.getRootElement().select('.timelineYAxisGrid').selectAll('tick').remove()
      const timelineYAxisGridHeight = height
        - (xAxisHeight + lineYAxisHeight
          + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight
        )

      const timelineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-timelineYAxisGridHeight)
        .tickFormat('')

      this.getRootElement().select('.timelineYAxisGrid')
        .transition()
        .duration(500)
        .call(timelineYAxisGridLines)

      this.getRootElement().select('.timelineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', color.$grey04)
        .attr('stroke-dasharray', '2')

      this.getRootElement().select('.timelineYAxisGrid').select('.domain').remove()

      // Line Chart Data Render
      this.getRootElement().select('.gLine')
        .selectAll('path')
        .transition()
        .duration(500)
        .attr('d', line)
        .attr('clip-path', 'url(#clip)')

      this.getRootElement().select('.gLine')
        .selectAll(`.${styles.lineDot}`)
        .transition()
        .duration(500)
        .attr('clip-path', 'url(#clip)')
        .attr('cx', (d) => xAxisScale(Date.parse(d.x)))

      // Timeline Data Render
      this.getRootElement().select('.timelineData')
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d) => xAxisScale(Date.parse(d.startTime)))
        .attr('clip-path', 'url(#clip)')

      this.getRootElement().select('.timelineData')
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d) => xAxisScale(Date.parse(d.startTime)))
        .attr('width', (d) => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))
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

    const gBrush = generateGroup(this.getRootElement().select('.overViewAxis'), {
      className: 'overViewXAxisBrush',
    })

    gBrush.call(brush)
  }

  addChartReset = (id, xAxisScale, lineScale, overViewXAxisScale, line, xAxis) => {
    const {
      lineYAxisHeight, height, xAxisHeight, defaultMargin, defaultPadding, overViewAxisHeight,
    } = this.options
    const { brushEvent } = this.props;
    d3.select(`#${id}`).on('click', () => {
      // Initialize XAxisScale, VerticalLineScale
      xAxisScale.domain(overViewXAxisScale.domain())
      lineScale.domain(overViewXAxisScale.domain())
      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .call(xAxis)
        .selectAll('.tick text')
        .attr('class', fontStyle.fs14)
        .style('fill', color.$grey08)

      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .selectAll('.domain')
        .attr('stroke', color.$grey06)
        .attr('d', 'M0.5 0V0.5H942.5 V0.5')

      this.getRootElement().select(`.${styles.xAxis}`)
        .transition()
        .duration(500)
        .selectAll('.tick line')
        .remove()

      // Initialize Line Chart Grid
      const lineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-lineYAxisHeight)
        .tickFormat('')

      this.getRootElement().select('.lineYAxisGrid')
        .transition()
        .duration(500)
        .call(lineYAxisGridLines)

      this.getRootElement().select('.lineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', color.$grey04)
        .attr('stroke-dasharray', '2')

      this.getRootElement().select('.lineYAxisGrid').select('.domain').remove()
      const timelineYAxisGridHeight = height
        - (xAxisHeight + lineYAxisHeight
          + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight)

      // Initialize Timeline Grid
      const timelineYAxisGridLines = d3
        .axisTop(xAxisScale)
        .tickSize(-timelineYAxisGridHeight)
        .tickFormat('')

      this.getRootElement().select('.timelineYAxisGrid')
        .transition()
        .duration(500)
        .call(timelineYAxisGridLines)

      this.getRootElement().select('.timelineYAxisGrid')
        .selectAll('.tick line')
        .attr('stroke', color.$grey04)
        .attr('stroke-dasharray', '2')

      this.getRootElement().select('.timelineYAxisGrid').select('.domain').remove()

      // Initialize Line Chart Data
      this.getRootElement().select('.gLine')
        .selectAll('path')
        .transition()
        .duration(500)
        .attr('d', line)

      this.getRootElement().select('.gLine')
        .selectAll(`.${styles.lineDot}`)
        .transition()
        .duration(500)
        .attr('cx', (d) => xAxisScale(Date.parse(d.x)))

      // Initialize Timeline
      this.getRootElement().select('.timelineData')
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d) => xAxisScale(Date.parse(d.startTime)))

      this.getRootElement().select('.timelineData')
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', (d) => xAxisScale(Date.parse(d.startTime)))
        .attr('width', (d) => xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime)))

      // Initialize Brush
      this.getRootElement().select('.overViewXAxisBrush')
        .select('rect.selection')
        .transition()
        .duration(500)
        .attr('width', 0)

      if (_.isFunction(brushEvent)) {
        brushEvent()
      }
    })
  }

  getScaleTime = () => {
    const { timeData, scale } = this.props
    if (_.isEmpty(scale)) {
      return getStartAndEndTime(_.flatten(_.map(timeData, (d) => d.dataPoints)))
    }

    const { start, end } = scale
    return {
      startTime: Date.parse(start),
      endTime: Date.parse(end),
    }
  }

  renderLineMergeTimeline = (timeData, lineData) => {
    const timelineData = timeData;
    const lineChartData = lineDataFormatConvert(lineData);
    const {
      width, height,
      overViewAxisHeight, yAxisWidth,
      lineYAxisHeight, defaultPadding, labelStartYPosition, labelLastYPosition,
    } = this.options
    const { resetBtnId } = this.props
    const { startTime, endTime } = this.getScaleTime()

    // Create tooltip
    this.getRootElement()
      .append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)

    const svg = renderSVG(this.getRootElement(), this.options.width, this.options.height)

    // Create Entire groups
    // 1. Entire timeline group
    const gTimeline = generateGroup(svg, { className: 'timeline' })

    // Create Clip (avoid displaying the chart outside the chart area)
    gTimeline
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
      .range([yAxisWidth, width - defaultPadding.right])

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
      .x((d) => xAxisScale(Date.parse(d.x))) // set the x values for the line generator
      .y((d) => lineYAxisScale(d.y)) // set the y values for the line generator

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

    if (resetBtnId) {
      this.addChartReset(resetBtnId, xAxisScale, lineScale, overViewXAxisScale, line, xAxis)
    }
    // TODO: Code Refactoring Module
  }

  componentDidMount = () => {
    const { timeData, lineData } = this.props
    if (!this.checkDataValidation()) {
      this.renderLineMergeTimeline(timeData, lineData)
    }
  }

  componentDidUpdate = (preProps) => {
    const { timeData, lineData } = this.props
    if (!_.isEqual(preProps.timeData, timeData) || !_.isEqual(preProps.lineData, lineData)) {
      this.removeLineMergedTimeline()

      if (!this.checkDataValidation()) {
        this.renderLineMergeTimeline(timeData, lineData)
      }
    }
  }

  checkDataValidation = () => {
    const { timeData, lineData } = this.props
    if (_.isEmpty(timeData) || _.isEmpty(lineData)) return 'haveData'
    if (!Array.isArray(timeData) || Array.isArray(lineData)) return 'typeOfVariable'
    return null
  }

  removeLineMergedTimeline = () => {
    this.getRootElement().select('div').remove()
    this.getRootElement().select('svg').remove()
  }

  render() {
    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return (
      <div ref={this.rootElement} className={styles.timelineChart} />
    );
  }
}

LineMergeTimeline.defaultProps = {
  timeData: undefined,
  scale: {},
  chartWidth: undefined,
  chartHeight: undefined,
  scoreClickEvent: null,
  brushEvent: null,
  lineData: null,
  resetBtnId: undefined,
  yAxisChartLabel: {
    line: 'Risk Score per Visiting',
    bar: 'Clinical Timeline',
  },
}

LineMergeTimeline.propTypes = {
  timeData: PropTypes.arrayOf(
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
  scale: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  chartWidth: PropTypes.number,
  chartHeight: PropTypes.number,
  scoreClickEvent: PropTypes.func,
  brushEvent: PropTypes.func,
  lineData: PropTypes.shape({
    xaxis: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  resetBtnId: PropTypes.string,
  yAxisChartLabel: PropTypes.shape({
    line: PropTypes.string,
    bar: PropTypes.string,
  }),
}

export default LineMergeTimeline
