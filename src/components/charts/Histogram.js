import React, { Component } from 'react';
import * as d3 from 'd3'
import { renderSVG, generateGroup } from '../../helper/chartUtility'

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
    
    this.xAxisWidth = this.options.width - this.options.defaultPadding.left - this.options.defaultPadding.right;
    this.yAxisHeight = this.options.height - this.options.defaultPadding.top - this.options.defaultPadding.bottom;
    this.rootElement = React.createRef();
  }

  getRootElement() {
    return d3.select(this.rootElement.current)
  }

  createXAxis = (xAxis) => {
    const { height ,defaultPadding } = this.options
    // Create xAxis
    // 1. Create xAxis group
    const gXAxis = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'xAxis',
      xOffset: defaultPadding.left,
      yOffset: height - defaultPadding.bottom
    })  

    // 2. Render xAxis
    gXAxis.call(xAxis)
    gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4')
    gXAxis.selectAll('.tick line').remove()
  }

  createYAxis = (yAxis) => {
    const { defaultPadding } = this.options
    // Create yAxis
    // 1. Create yAxis group
    const gYAxis = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'yAxis',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })  

    // 2. Render yAxis
    gYAxis.call(yAxis)
    gYAxis.selectAll('.domain').remove()
    // gYAxis.selectAll('.tick line').remove()
  }

  createBar = (xAxisScale, yAxisScale, data) => {
    const { height, defaultPadding } = this.options

    const gBar = generateGroup(this.getRootElement().select('.histogram'), {
      className: 'Bar',
      xOffset: defaultPadding.left,
      yOffset: defaultPadding.top
    })

    const histogram = d3
      .histogram()
      .value(d => d)
      .domain(xAxisScale.domain())
      .thresholds(xAxisScale.ticks(10))
    
    const bins = histogram(data)
    bins.pop();

// 삼항연산자 함수로 => 테스트코드
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
      .attr('y', 0)
      .style('opacity', 0.6)
  }

  renderHistogram = () => {
    const histogramData = d3.range(100).map(d3.randomBates(3));
    const { width, height } = this.options
    const svg = renderSVG(this.getRootElement(), width, height)
    const gHistogram = generateGroup(svg, { className: 'histogram' })

    const xAxisScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.xAxisWidth])  


    const xAxis = d3.axisBottom(xAxisScale)
      .tickPadding(6)
      .ticks(10)
      // .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
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
      .tickPadding(6)
      .ticks(5, d => {
        return  `10${formatPower(Math.log10(d))}`
      })
   
    this.createTitle()
    this.createXAxis(xAxis)
    this.createYAxis(yAxis)
    this.createBar(xAxisScale, yAxisScale, histogramData)
   
  }

  componentDidMount = () => {
    this.renderHistogram()
  }

  render() {
    return (
      <div ref={this.rootElement}>
        
      </div>
    );
  }
}

export default Histogram;

/* 
TODO:
1. label 그리는 함수
2. bins 옵션 컨트롤러
3. x축에 평행한 그리드라인
4. 라벨없는 ticks 제거
5. 테스트코드
6. 디자인적용
7. 스코어가 없는 것(bins 1개의 데이터가 없을 때))에 대한 Scale 처리 - 신영님과 상의
*/