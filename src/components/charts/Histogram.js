import React, { Component } from 'react';
import * as d3 from 'd3'
import { renderSVG, generateGroup } from '../../helper/chartUtility'
import { color } from '../../assets/styles/variables';
import styles from './Histogram.css';
import isEmpty from 'lodash/isEmpty'

class Histogram extends Component {
  constructor(props) {
    super(props);
    this.options = {
      width: this.props.chartWidth || 1200,
      height: this.props.chartHeight || 589,
      defaultPadding: {
        top: 145,
        right: 30,
        left: 73,
        bottom: 64
      }
    };
    
    this.fakeData = {
      risks: d3.range(1000).map(d3.randomBates(10)),
      patientRisk: 0.42,
      avgRisk: 0.305
    };
    this.xAxisWidth = this.options.width - this.options.defaultPadding.left - this.options.defaultPadding.right;
    this.yAxisHeight = this.options.height - this.options.defaultPadding.top - this.options.defaultPadding.bottom;
    this.rootElement = React.createRef();
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  errorMessage = (errorType) => {
    let message;
    if (errorType === 'typeOfVariable') {
      message = 'type is invalid'
    }
  
    if (errorType === 'haveData') {
      message = 'No data is provided'
    }

    this.getRootElement().append('div').text(message)  
  }

  createXAxis = (xAxis) => {
    const { height ,defaultPadding } = this.options
    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gXAxis',
      xOffset: defaultPadding.left,
      yOffset: height - defaultPadding.bottom
    })  

    // 2. Render xAxis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4')
    gXAxis.selectAll('.tick line').remove()
    gXAxis
      .selectAll('.tick text')
      .attr('font-size', 14)
      .attr('opacity', 0.6)
      .attr('font-family', 'Spoqa Han Sans')
      .style('fill', color.$black)
  }

  createYAxis = (yAxis) => {
    const { defaultPadding } = this.options
    // Create yAxis
    // 1. Create yAxis group
    const gYAxis = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gYAxis',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })  

    // 2. Render yAxis
    gYAxis.call(yAxis)
    gYAxis.selectAll('.domain').remove()
    gYAxis.selectAll('.tick line').attr('x2', -6).attr('stroke', color.$line_graph_xy_grey)
    gYAxis.selectAll('.tick:last-child line').attr('stroke', color.$line_btn_grey)
    gYAxis
      .selectAll('.tick text')
      .attr('font-size', 14)
      .attr('font-family', 'Spoqa Han Sans')
      .style('fill', color.$black)
      .attr('opacity', 0.4)
  }

  createBar = (xAxisScale, yAxisScale, data, binsNumber = 10) => {
    const { risks: histogramData, patientRisk } = data;
    const { defaultPadding } = this.options
    const { $primary_navy } = color
    const gBar = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gBar',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })

    const histogram = d3
      .histogram()
      .value(d => d)
      .domain(xAxisScale.domain())
      .thresholds(xAxisScale.ticks(binsNumber))
    
    const bins = histogram(histogramData)
    bins.pop();
    const patientRiskIndex = this.getPatientRiskScoreIndex(patientRisk, bins.length)

    gBar
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr('transform', d => `translate(${xAxisScale(d.x0)}, ${d.length && yAxisScale(d.length)})`)
      .attr('width', d => d.length === 0 ? xAxisScale(d.x1) - xAxisScale(d.x0) : (xAxisScale(d.x1) - xAxisScale(d.x0) - 1))
      .attr('height', d => d.length === 0 ? 0  : (this.yAxisHeight - yAxisScale(d.length)))
      .style('fill', (d, i) => {
        if (i === patientRiskIndex) {
          return $primary_navy
        } else {
          return '#e1e1e1'
        }
      })
      .transition()
      .duration(500)

    gBar
      .exit()
      .remove()
    
    const tooltipDescription = `
      <div style='display:flex;'>
        <span class=${styles.tooltipTitle} style='width: 85px; height: 20px; margin-right:24px;'>I.I.T Risk Score</span>
        <span class=${styles.tooltipValue} style='margin-left:auto;'>${patientRisk}</span>
      </div>
      <div style='display:flex;'>
        <span class=${styles.tooltipTitle} style='width: 118px; height: 20px; margin-right: 24px;'>Number of Patients</span>
        <span class=${styles.tooltipValue} style='margin-left:auto;'>${bins[patientRiskIndex].length}</span>
      </div>
    `

    this.getRootElement()
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('border', `solid 1px ${color.$menu_grey}`)
      .style('border-radius', '4px')
      .style('padding', '12px 14px')
      .style('box-sizing', 'border-box')
      .style('background', `${color.$primary_white}`)
      .style('top', `${yAxisScale(bins[patientRiskIndex].length) + defaultPadding.top - 30}px`)
      .style('left', `${xAxisScale(bins[patientRiskIndex].x0) + defaultPadding.left}px`)
      .html(tooltipDescription)
  }

  createTitle = () => {
    const { defaultPadding } = this.options
    const gTitle = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'Title',
      xOffset: defaultPadding.right,
      yOffset: defaultPadding.right
    })
    
    gTitle
      .append('text')
      .text(`${this.props.title}`)
      .attr('text-anchor', 'start')
      .attr('font-size', 18)
      .attr('letter-spacing', -0.5)
      .attr('font-weight', 'bold')
      .attr('x', 0)
      .attr('y', 22)
      .style('fill', color.$black)
      .style('opacity', 0.6)
  }

  createLegend = (...args) => {
    const { $primary_navy, $legend_timeline_red_01 } = color
    const legendColorSet = [$primary_navy, $legend_timeline_red_01]
    const { defaultPadding } = this.options
    const gLegend = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gLegend',
      xOffset: defaultPadding.right,
      yOffset: 88
    })
    // add legend circle 
    gLegend
      .selectAll('legendCircle')
      .data(args)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => 5 + (140 * i))
      .attr('cy', 10)
      .attr('r', 5)
      .style('fill', (d, i) => legendColorSet[i])


    // add legend text
    gLegend
      .selectAll('legend')
      .data(args)
      .enter()
      .append('text')
      .attr('x', (d, i) => 18 + (140 * i))
      .attr('y', 15)
      .text(d => d)
      .attr('text-anchor', 'start')
      .attr('font-size', 14)
      .attr('textLength', 108)
      .attr('font-family', 'Spoqa Han Sans')
      .style('fill', '#999999')
  }

  createDropDown = (xAxisScale, yAxisScale, data) => {
    const dropDownList = [10, 20, 50, 100]

    const dropDownBox = this.getRootElement()
      .append('div')
      .attr('class', 'gDropDown')
      .style('position', 'absolute')
      .style('top', '142px')
      .style('left', '1090px')
      .append('select')
      .attr('id', 'binsDropDown')
      .on('change', ()=> {
        d3.select('.gBar')
          .remove()

        d3.select('.tooltip')
          .remove()

        d3.select('.gRiskMeanLine')
          .remove()
        const binsN = d3.select('#binsDropDown').property('value')
        this.createBar(xAxisScale, yAxisScale, data, binsN)
        this.createRiskMeanLine(data, xAxisScale)
      })



    dropDownBox
      .selectAll('option')
      .data(dropDownList)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => d)

  }

  createXAxisGridLines = (gridXAxis) => {
    const { defaultPadding } = this.options

    const gXAxisGridLine = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gXAxisGridLine',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })  

    // 2. Render gridXAxis
    gXAxisGridLine.call(gridXAxis)
    gXAxisGridLine.selectAll('.domain').remove()
    gXAxisGridLine.selectAll('.tick line').attr('stroke', color.$line_graph_xy_grey)
    gXAxisGridLine.select('.tick:last-child line').attr('stroke', color.$line_btn_grey)
    gXAxisGridLine.selectAll('.tick text').remove()
  }

  createRiskMeanLine = (data, xAxisScale) => {
    const { defaultPadding } = this.options

    const gRiskMeanLine = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gRiskMeanLine',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })  

    gRiskMeanLine
      .append('line')
      .attr('x1', xAxisScale(data.avgRisk))
      .attr('x2', xAxisScale(data.avgRisk))
      .attr('y1', 0)
      .attr('y2', this.yAxisHeight)
      .attr('stroke', color.$legend_timeline_red_01)
  }

  getPatientRiskScoreIndex = (score, binsNumber) => {
    return Math.floor(score * binsNumber)
  }

  renderHistogram = (data) => {
    const { width, height } = this.options
    const svg = renderSVG(this.getRootElement(), width, height)
    const gHistogram = generateGroup(svg, { className: 'histogram' })

    const xAxisScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.xAxisWidth])  


    const xAxis = d3.axisBottom(xAxisScale)
      .tickPadding(14)
      .ticks(10)
      .tickSize(0)
      
    const yAxisScale = d3
      .scaleLog()
      .domain([1e0, 2e4])
      .range([this.yAxisHeight, 0])  

    // 10^n으로 바꾸는 포맷 함수
    const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const formatPower = d => superscript[d]
    const yAxis = d3
      .axisLeft(yAxisScale)
      .tickPadding(21)
      .tickSize(0)
      .tickValues([1e0, 1e1, 1e2, 1e3, 1e4, 2e4])
      .ticks(5, d => {
        return  `10${formatPower(Math.log10(d))}`
      })

    const gridXAxis =  d3
      .axisRight(yAxisScale)
      .tickSize(this.xAxisWidth)
      .tickValues([1e0, 1e1, 1e2, 1e3, 1e4, 2e4])
   
    this.createTitle()
    this.createXAxis(xAxis)
    this.createYAxis(yAxis)
    this.createLegend('Patient Risk Score', 'Average Risk Score')
    this.createDropDown(xAxisScale, yAxisScale, data)
    this.createXAxisGridLines(gridXAxis)
    this.createBar(xAxisScale, yAxisScale, data)
    this.createRiskMeanLine(data, xAxisScale)
   
  }

  componentDidMount = () => {
    const { data } = this.props

    if (isEmpty(data)) {
      return this.errorMessage('haveData')
    }

    if (!(data !== null && typeof data === 'object' && !Array.isArray(data))) {
      return this.errorMessage('typeOfVariable')
    }

    this.renderHistogram(data)
  }

  render() {
    return (
      <div ref={this.rootElement} style={{display: 'relative'}}>
        
      </div>
    );
  }
}

export default Histogram;