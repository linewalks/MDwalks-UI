import React, { Component } from 'react';
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styles from '@Charts/Histogram.module.css';
import _ from 'lodash'
import { renderSVG, generateGroup, errorMessage } from '@src/helper/chartUtility'
import { color, colorV1 } from '@src/assets/styles/variables'
import fontStyle from '@src/assets/styles/font.module.sass'
import SelectBox from '@Components/form/SelectBox'

import {
  getColorsByTheme,
  Themes,
} from '@Components/ChartColor'

class Histogram extends Component {
  constructor(props) {
    super(props);
    const { chartWidth, chartHeight, theme } = this.props
    this.options = {
      width: chartWidth || 1140,
      height: chartHeight || 385,
      defaultPadding: {
        top: 67,
        right: 0,
        left: 43,
        bottom: 34,
      },
    };

    this.colors = getColorsByTheme(theme)

    this.fakeData = {
      risks: d3.range(1000).map(d3.randomBates(10)),
      patientRisk: 0.42,
      avgRisk: 0.305,
    };
    this.xAxisWidth = this.options.width
      - this.options.defaultPadding.left
      - this.options.defaultPadding.right

    this.yAxisHeight = this.options.height
      - this.options.defaultPadding.top
      - this.options.defaultPadding.bottom

    this.xAxisScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.xAxisWidth]);

    this.yAxisScale = d3
      .scaleLog()
      .domain([1e0, 2e4 + 5e3])
      .range([this.yAxisHeight, 0])

    this.rootElement = React.createRef();
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  createXAxis = (xAxis) => {
    const { height, defaultPadding } = this.options
    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gXAxis',
      xOffset: defaultPadding.left,
      yOffset: height - defaultPadding.bottom,
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
      yOffset: defaultPadding.top,
    })

    // 2. Render yAxis
    gYAxis.call(yAxis)
    gYAxis.selectAll('.domain').remove()
    gYAxis.selectAll('.tick line').attr('x2', -6).attr('stroke', color.$line_graph_xy_grey)
    gYAxis.selectAll('.tick:last-child line').attr('stroke', color.$line_btn_grey)
    gYAxis.selectAll('.tick:last-child text').attr('class', `${fontStyle.fs14} ${fontStyle.bold}`).style('fill', colorV1.$grey08).text('명')
    gYAxis
      .selectAll('.tick text')
      .attr('font-size', 14)
      .attr('font-family', 'Spoqa Han Sans')
      .style('fill', color.$black)
      .attr('opacity', 0.4)
  }

  createHistogramData = (data, binsNumber = 10) => {
    const histogram = d3
      .histogram()
      .value((d) => d)
      .domain(this.xAxisScale.domain())
      .thresholds(this.xAxisScale.ticks(binsNumber))
    const bins = histogram(data)
    bins.pop();
    return bins
  }

  createBar = (bins) => {
    const { data: { patientRisk } } = this.props
    const { defaultPadding } = this.options
    const gBar = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gBar',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top,
    })

    const patientRiskIndex = this.getPatientRiskScoreIndex(patientRisk, bins.length)

    gBar
      .selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 1)
      .attr('transform', (d) => `translate(${this.xAxisScale(d.x0)}, ${d.length && this.yAxisScale(d.length)})`)
      .attr('width', (d) => (d.length === 0 ? this.xAxisScale(d.x1) - this.xAxisScale(d.x0) : (this.xAxisScale(d.x1) - this.xAxisScale(d.x0) - 1)))
      .attr('height', (d) => (d.length === 0 ? 0 : (this.yAxisHeight - this.yAxisScale(d.length))))
      .style('fill', (d, i) => {
        if (i === patientRiskIndex) {
          return this.colors[0]
        }
        return this.colors[1]
      })
      .transition()
      .duration(500)

    gBar
      .exit()
      .remove()
  }

  createLegend = (...args) => {
    const gLegend = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gLegend',
      xOffset: 0,
      yOffset: 0,
    })
    // add legend circle
    gLegend
      .selectAll('legendCircle')
      .data(args)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => 5 + (86 * i))
      .attr('cy', 10)
      .attr('r', 5)
      .style('fill', (d, i) => this.colors[i])

    // add legend text
    gLegend
      .selectAll('legend')
      .data(args)
      .enter()
      .append('text')
      .attr('x', (d, i) => 18 + (86 * i))
      .attr('y', 15)
      .text((d) => d)
      .attr('text-anchor', 'start')
      .attr('class', fontStyle.fs14)
      .attr('font-family', 'Spoqa Han Sans')
      .style('fill', colorV1.$grey08)
  }

  createXAxisGridLines = (gridXAxis) => {
    const { defaultPadding } = this.options

    const gXAxisGridLine = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gXAxisGridLine',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top,
    })

    // 2. Render gridXAxis
    gXAxisGridLine.call(gridXAxis)
    gXAxisGridLine.selectAll('.domain').remove()
    gXAxisGridLine.selectAll('.tick line').attr('stroke', color.$line_graph_xy_grey)
    gXAxisGridLine.select('.tick:last-child line').attr('stroke', color.$line_btn_grey)
    gXAxisGridLine.selectAll('.tick text').remove()
  }

  createRiskMeanLine = (data) => {
    const { defaultPadding } = this.options

    const gRiskMeanLine = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'gRiskMeanLine',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top,
    })

    gRiskMeanLine
      .append('line')
      .attr('x1', this.xAxisScale(data.avgRisk))
      .attr('x2', this.xAxisScale(data.avgRisk))
      .attr('y1', 0)
      .attr('y2', this.yAxisHeight)
      .attr('stroke', '#091840')
      .attr('stroke-width', 2)

    gRiskMeanLine
      .append('text')
      .attr('x', this.xAxisScale(data.avgRisk) + 4)
      .attr('y', 12)
      .attr('class', `${fontStyle.fs12} ${fontStyle.bold}`)
      .style('fill', colorV1.$grey09)
      .text('Average Risk Score')
  }

  getPatientRiskScoreIndex = (score, binsNumber) => (Math.floor(score * binsNumber))

  renderHistogram = (data) => {
    const { width, height } = this.options
    const { yMaxValue } = this.props
    const { risks } = data
    const bins = this.createHistogramData(risks)
    const svg = renderSVG(this.getRootElement(), width, height)
    generateGroup(svg, { className: 'histogram' })
    const tickValues = [1e0, 1e1, 1e2, 1e3, 1e4, 2e4 + 5e3]

    const xAxis = d3.axisBottom(this.xAxisScale)
      .tickPadding(14)
      .ticks(10)
      .tickSize(0)

    if (yMaxValue) {
      tickValues[_.findLastIndex(tickValues)] = yMaxValue
      this.yAxisScale = d3
        .scaleLog()
        .domain([1e0, yMaxValue])
        .range([this.yAxisHeight, 0])
    }

    // 10^n으로 바꾸는 포맷 함수
    const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const formatPower = (d) => superscript[d]
    const yAxis = d3
      .axisLeft(this.yAxisScale)
      .tickPadding(21)
      .tickSize(0)
      .tickValues(tickValues)
      .ticks(5, (d) => (`10${formatPower(Math.log10(d))}`))

    this.yAxis = yAxis

    const gridXAxis = d3
      .axisRight(this.yAxisScale)
      .tickSize(this.xAxisWidth)
      .tickValues(tickValues)

    this.gridXAxis = gridXAxis

    this.createXAxis(xAxis)
    this.createYAxis(yAxis)
    this.createLegend('Patient', 'Group')
    this.createXAxisGridLines(gridXAxis)
    this.createBar(bins)
    this.createRiskMeanLine(data)
  }

  removeHistogram = () => {
    this.getRootElement().select('svg')
      .remove()
  }

  componentDidMount = () => {
    const { data, onChange, initOnChangeFlag } = this.props
    if (!this.checkDataValidation()) {
      this.renderHistogram(data)
      if (initOnChangeFlag) onChange(10, this.createHistogramData(data.risks))
    }
  }

  componentDidUpdate = (prevProps) => {
    const {
      data, yMaxValue, onChange, initOnChangeFlag,
    } = this.props
    if (!_.isEqual(prevProps.data, data)) {
      this.removeHistogram()
      this.renderHistogram(data)
      if (initOnChangeFlag) onChange(10, this.createHistogramData(data.risks))
    }

    if (!_.isEqual(prevProps.yMaxValue, yMaxValue)) {
      this.removeHistogram()
      this.renderHistogram(data)
      if (initOnChangeFlag) onChange(10, this.createHistogramData(data.risks))
    }
  }

  checkDataValidation = () => {
    const { data } = this.props
    if (_.isEmpty(data)) return 'haveData'
    if (Array.isArray(data)) return 'typeOfVariable'
    return null
  }

  onChangeHistogram = ({ target: { value } }) => {
    const { data, onChange } = this.props
    this.getRootElement().select('.gBar')
      .remove()

    this.getRootElement().select('.gRiskMeanLine')
      .remove()

    const bins = this.createHistogramData(data.risks, value)

    this.createBar(bins)
    this.createRiskMeanLine(data)
    onChange(value, bins)
  }

  render() {
    const dropDownList = [10, 20, 50, 100]

    if (this.checkDataValidation()) {
      return <div>{errorMessage(this.checkDataValidation())}</div>
    }

    return (
      <div ref={this.rootElement} style={{ position: 'relative' }}>
        <div className={styles.gDropDown}>
          <span className={`${fontStyle.fs14} ${fontStyle.fc_grey10}`}>
            Bins :
          </span>
          <SelectBox style={{ marginLeft: 8 }}>
            <select onChange={this.onChangeHistogram}>
              {
                dropDownList.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))
              }
            </select>
          </SelectBox>
        </div>
      </div>
    )
  }
}

Histogram.defaultProps = {
  data: undefined,
  yMaxValue: undefined,
  chartWidth: undefined,
  chartHeight: undefined,
  onChange: () => {},
  initOnChangeFlag: false,
  theme: Themes.ThemeComparePrimarySea1,
}

Histogram.propTypes = {
  data: PropTypes.shape({
    risks: PropTypes.arrayOf(PropTypes.number),
    patientRisk: PropTypes.number,
  }),
  yMaxValue: PropTypes.number,
  chartWidth: PropTypes.number,
  chartHeight: PropTypes.number,
  onChange: PropTypes.func,
  initOnChangeFlag: PropTypes.bool,
  theme: PropTypes.oneOf([
    Themes.ThemeComparePrimarySea, Themes.ThemeComparePrimarySea1,
    Themes.ThemeComparePrimarySea2, Themes.ThemeComparePrimarySea3,
    Themes.ThemeCompareSecondaryTeal, Themes.ThemeCompareSecondaryTeal1,
    Themes.ThemeCompareSecondaryTea2, Themes.ThemeCompareSecondaryTeal3,
  ]),
}

export default Histogram
