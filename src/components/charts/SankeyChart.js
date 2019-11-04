import React from 'react'
import * as d3Core from 'd3'
import * as sankeyCircular from 'd3-sankey-circular'
import _ from 'lodash'
import { color } from '@src/assets/styles/variables'

import { strIdConvert } from '@src/helper/chartUtility'

class SankeyChart extends React.Component {

  rootElement = React.createRef()

  constructor(props) {
    super(props)
    this.d3 = { ...d3Core, ...sankeyCircular }
    this.mapLinks = new Map()
    this.state = {
      selectedNodes: props.selectedNodes || []
    }
  }

  getRootElement() {
    return this.d3.select(this.rootElement.current)
  }

  getNodeName = node => node.name

  setSelectedNode = selectedNode => {
    this.setState({
      selectedNodes: _.uniq(this.state.selectedNodes.concat(selectedNode))
    })
  }

  highlightLink = () => {
    this.d3.selectAll(`.sankey-link`).style('opacity', 0.04).style('stroke', '#000000')

    const ids = this.createLinkId(this.state.selectedNodes)

    for(let i = 0; i < ids.length; i++) {
      const [ source, target ] = ids[i].split('X');
      const forwardPath = this.getRootElement().select(`#${source}X${target}`);
      const reversePath = this.getRootElement().select(`#${target}X${source}`);

      const sourceXPosition = this.getRootElement().select(`#${source}`).attr('x')
      const targetXPosition = this.getRootElement().select(`#${target}`).attr('x')

      if (targetXPosition > sourceXPosition) {
        forwardPath.style('opacity', 1).style('stroke', color.$pathway_link_blue)
      } else {
        reversePath.style('opacity', 1).style('stroke', color.$pathway_link_red)
      }
    }
  }

  createLinkId = (selectedNodes) => {
    return selectedNodes.map((node, i) => `${strIdConvert([node, selectedNodes[i+1] || ''])}`).slice(0, -1)
  }

  renderPlaceholder = () => {
    return <div>No data is provided!</div>
  }

  initializeSankey = ({ nodeWidth, width, height, iterations, circularLinkGap }) => {
    return this.d3
      .sankeyCircular()
      .nodeWidth(nodeWidth)
      .nodePaddingRatio(0.5)
      .size([width, height])
      .nodeId(d => d.name)
      .iterations(iterations)
      .circularLinkGap(circularLinkGap)
  }

  initializeSVG = ({ width, height, margin }) => {
    return this.d3
      .select(this.rootElement.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
  }

  initializeGroups = (svg, { margin }) => {
    const entireGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const nodeGroup = entireGroup
      .append('g')
      .attr('class', 'nodes')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('g')

    const linkGroup = entireGroup
      .append('g')
      .attr('class', 'links')
      .attr('fill', 'none')
      .selectAll('path')

    return [nodeGroup, linkGroup]
  }

  renderNodes = (nodeG, sankeyNodesData, { width }) => {
    this.d3
      .scaleSequential(this.d3.interpolateCool)
      .domain([0, width])
    // Enter node g
    const node = nodeG
      .data(sankeyNodesData)
      .enter()
      .append('g')
    // Render rect
    node
      .append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('height', d => d.y1 - d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('id', d => strIdConvert(d.name))
      .style('fill', "#002d4f")
      .style('cursor', "pointer")

    // Render node name
    node
      .append('text')
      .attr('x', d => (d.x0 + d.x1) / 2)
      .attr('y', d => d.y0 - 12)
      .attr('dy', '0.35em')
      .attr('fill', 'rgba(0, 0, 0, 0.4)')
      .attr('font-famliy','Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif')
      .attr('text-anchor', 'middle')
      .attr('font-size', '14')
      .attr('font-weight', 'normal')
      .attr('font-style', 'normal')
      .attr('font-stretch', 'normal')
      .attr('line-height', 'normal')
      .attr('letter-spacing', '0.5px')
      .text(d => {
        return d.name
      })
    /*
    pr url:https://github.com/linewalks/Cardio_Demo_View/pull/52/files
    TODO: node tooltip 사용성이 확정되면 다시 기능 추가할것.
    Render node title
    node.append('title').text(d => `${d.name}\n${d.value}`)
    */
    return node
  }

  renderLinks = (linkG, sankeyLinksData) => {
    const link = linkG
      .data(sankeyLinksData)
      .enter()
      .append('g')

    const mapLinks = this.mapLinks

    link
      .append('path')
      .attr('class', 'sankey-link')
      .attr('id', function({source, target}) {
        const id =`${strIdConvert([source.name, target.name])}`
        mapLinks.set(id, this)
        return id
      })
      .attr('d', link => link.path)
      .style('stroke-width', d => Math.max(1, d.width))
      .style('opacity', 0.04)
      .style('stroke', '#000000') // reset 과 동일

    this.mapLinks = mapLinks
    // link.selectAll(`.sankey-link`).style('opacity', 0.04).style('stroke', '#000000')
    /*
    pr url:https://github.com/linewalks/Cardio_Demo_View/pull/52/files
    TODO: link tooltip 사용성이 확정되면 다시 기능 추가할것.
    link.append('title').text(d => {
      return `${d.source.name} → ${d.target.name}\n Count: ${d.value}`
    })
    */
    return link
  }

  linkConnectCheck = (prevSelectedNode, currentSelectedNode) => {
    if (_.isEmpty(prevSelectedNode)) {
      return true
    }

    const key1 = strIdConvert([prevSelectedNode, currentSelectedNode])
    const key2 = strIdConvert([currentSelectedNode, prevSelectedNode])

    return this.mapLinks.has(key1) || this.mapLinks.has(key2)
  }

  renderSankey = () => {
    const d3 = this.d3

    const {
      height,
      width,
      margin,
      nodeWidth,
      // nodePadding,
      iterations,
      circularLinkGap,
    } = this.props.options

    this.sankey = this.initializeSankey({
      height,
      width,
      nodeWidth,
      iterations,
      circularLinkGap,
    })

    this.svg = this.initializeSVG({
      width,
      height,
      margin,
    })

    // initialize entire group, link group, node group
    const [nodeG, linkG] = this.initializeGroups(this.svg, { margin })

    const sankeyData = this.sankey(this.props.data)

    let nodes = this.renderNodes(nodeG, sankeyData.nodes, { width })
    this.renderLinks(linkG, sankeyData.links)

    this.attachEventHandlersToNode(d3, nodes, {
      onChange: this.props.onChange,
    })
  }

  attachEventHandlersToNode = (d3, nodes, { onChange }) => {
    nodes.on('click', (node) => {
      const prevSelectedNode = _.last(this.state.selectedNodes)
      const currentSelectedNode = this.getNodeName(node)
      if (this.linkConnectCheck(prevSelectedNode, currentSelectedNode)) {
        this.setSelectedNode(this.getNodeName(node))
      }
    })
  }

  componentDidMount = () => {
    const { data, resetBtnId } = this.props
    if (!_.isEmpty(resetBtnId)) {
      this.d3.select(`#${resetBtnId}`).on('click', this.resetSankey)
    }

    if (!_.isEmpty(data)) {
      this.renderSankey()
      this.highlightLink()
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (JSON.stringify(this.state.selectedNodes) != JSON.stringify(prevState.selectedNodes)) {
      this.props.onChange(this.state.selectedNodes)
    }
    this.highlightLink()
  }

  resetSankey = () => {
    this.setState({selectedNodes: this.props.defaultdNode})
  }

  render() {
    const { data } = this.props
    return _.isEmpty(data) ? (
      this.renderPlaceholder()
    ) : (
      <div ref={this.rootElement} />
    )
  }
}

SankeyChart.defaultProps = {
  defaultdNode: [],
  onChange: () => {},
  options: {
    height: 254,
    width: 1000,
    nodeWidth: 25,
    nodePadding: 20,
    iterations: 15,
    circularLinkGap: 1,
    margin: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
    },
  },
}

export default SankeyChart