import React from 'react'
import * as d3Core from 'd3'
import * as sankeyCircular from 'd3-sankey-circular'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import last from 'lodash/last'
import { strIdConvert } from '../../helper/chartUtility'
import sankeyData from '../../data/dataForSankey';

class SankeyChart extends React.Component {
  constructor(props) {
    super(props)
    this.d3 = { ...d3Core, ...sankeyCircular }
    this.id = props.id
    this.state = {
      selectedNodes: props.defaultdNode || []
    }
  }

  getNodeName = node => node.name

  setSelectedNode = selectedNode => {
    if (!this.state.selectedNodes.includes(selectedNode)) {
      this.setState({
        selectedNodes: this.state.selectedNodes.concat(selectedNode)
      })
    }
  }

  highlightLink = (id) => {
    const d3 = this.d3;
    for(let i = 0; i < id.length; i++) {
      const [ source, target ] = id[i].split('X');
      const forwardPath = d3.select(`#${source}X${target}`);
      const reversePath = d3.select(`#${target}X${source}`);
      
      const sourceXPosition = document.getElementById(source).getBoundingClientRect().x;
      const targetXPosition = document.getElementById(target).getBoundingClientRect().x;

      if (targetXPosition > sourceXPosition) {
        forwardPath.style('opacity', 1).style('stroke', 'rgba(24, 155, 255, 0.4)')
      } else {
        reversePath.style('opacity', 1).style('stroke', 'rgba(255, 58, 31, 0.4)')
      }
    }
  }

  createLinkId = (selectedNodes) => {
    if (selectedNodes.length === 0) return null
    const idCollection = [];
    for (let i = 0; i < selectedNodes.length; i++) {
      if (i === selectedNodes.length - 1) break;
      let id = `${strIdConvert(selectedNodes[i])}X${strIdConvert(selectedNodes[i+1])}`;
      idCollection.push(id)
    }
    return idCollection
  }

  renderPlaceholder = () => {
    return <div>No data is provided!</div>
  }

  initializeSankey = (
    d3,
    { nodeWidth, width, height, iterations, circularLinkGap },
  ) => {
    return d3
      .sankeyCircular()
      .nodeWidth(nodeWidth)
      .nodePaddingRatio(0.5)
      .size([width, height])
      .nodeId(d => d.name)
      .iterations(iterations)
      .circularLinkGap(circularLinkGap)
  }

  initializeSVG = (d3, { width, height, margin }) => {
    return this.d3
      .select(`div#chart_${this.id}`)
      .append('svg')
      .attr('id', this.id)
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

    return [entireGroup, nodeGroup, linkGroup]
  }

  processDataForSankey = (sankey, data) => {
    return sankey(data)
  }

  renderNodes = (nodeG, sankeyNodesData, { width }) => {
    const nodeColor = this.d3
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

    link
      .append('path')
      .attr('class', 'sankey-link')
      .attr('id', ({source: { name: startNode }, target: { name: endNode }}) => `${strIdConvert(startNode)}X${strIdConvert(endNode)}`)
      .attr('d', link => link.path)
      .style('stroke-width', d => Math.max(1, d.width))
      .style('opacity', 0.04)
      .style('stroke', '#000000')

    /*
    pr url:https://github.com/linewalks/Cardio_Demo_View/pull/52/files
    TODO: link tooltip 사용성이 확정되면 다시 기능 추가할것.
    link.append('title').text(d => {
      return `${d.source.name} → ${d.target.name}\n Count: ${d.value}`
    })
    */
    return link
  }

  attachEventHandlersToNode = (d3, nodes, { onClick }) => {
    const highlightNodes = (nodeToHighlight, name) => {
      let opacity = 0.5

      if (nodeToHighlight.name == name) {
        opacity = 1
      }
      nodeToHighlight.sourceLinks.forEach(link => {
        if (link.target.name === name) {
          opacity = 1
        }
      })
      nodeToHighlight.targetLinks.forEach(link => {
        if (link.source.name === name) {
          opacity = 1
        }
      })
      return opacity
    }

    // Add additonal events
    if (onClick) {
      nodes.on('click', data => {
        const { selectedNodes } = this.state
        const prevSelectedNode = last(selectedNodes)
        const currentSelectedNode = this.getNodeName(data)
        if (this.linkConnectCheck(prevSelectedNode, currentSelectedNode)) {
          this.setSelectedNode(this.getNodeName(data))
          onClick(this.state.selectedNodes)
        }
      })
    } 

    return nodes
  }

  attachEventHandlersToLink = (d3, links, { onClick }) => {
    if (onClick) {
      links.on('click', data => {
        onClick(data)
      })
    }

    return links
  }

  linkConnectCheck = (prevSelectedNode, currentSelectedNode) => {
    if (isEmpty(prevSelectedNode)) {
      return true
    }

    return this.props.data.links.some(({source: { name: startNode }, target: { name: endNode }}) => {
      return (startNode === prevSelectedNode && endNode === currentSelectedNode) || (startNode === currentSelectedNode && endNode === prevSelectedNode)
    })
  }

  renderSankey = () => {
    const d3 = this.d3
    const {
      data,
      options,
      onChange,
      onNodeHover,
      onLinkClick,
      onLinkHover,
    } = this.props

    const {
      height,
      width,
      margin,
      nodeWidth,
      nodePadding,
      iterations,
      circularLinkGap,
    } = options

    this.sankey = this.initializeSankey(d3, {
      height,
      width,
      nodeWidth,
      iterations,
      circularLinkGap,
    })

    this.svg = this.initializeSVG(d3, {
      width,
      height,
      margin,
    })

    // initialize entire group, link group, node group
    const [g, nodeG, linkG] = this.initializeGroups(this.svg, { margin })

    const sankeyData = this.processDataForSankey(this.sankey, data)
    const sankeyNodesData = sankeyData.nodes
    const sankeyLinksData = sankeyData.links

    let nodes = this.renderNodes(nodeG, sankeyNodesData, { width })
    let links = this.renderLinks(linkG, sankeyLinksData)

    if (onChange) {
      nodes = this.attachEventHandlersToNode(d3, nodes, {
        onClick: onChange,
      })
    } else {
      nodes.on('click', data => {
        this.setSelectedNode(this.getNodeName(data))
      })
    }

    links = this.attachEventHandlersToNode(d3, links, {
      onClick: onLinkClick,
    })
  }

  componentDidMount = () => {
    const { data, resetBtnId, defaultdNode } = this.props
    isEmpty(resetBtnId) ? null : this.resetSankey(resetBtnId, defaultdNode)
    return isEmpty(data) ? null : this.renderSankey()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const prevSelectedNode = last(prevState.selectedNodes)
    const currentSelectedNode = last(this.state.selectedNodes)

    if (!isEqual(prevState.selectedNodes, this.state.selectedNodes) && this.linkConnectCheck(prevSelectedNode, currentSelectedNode)) {
      const LinkId = this.createLinkId(this.state.selectedNodes)
      this.highlightLink(LinkId)
    }    
  }

  resetSankey = (id, defaultNode = []) => {
    const d3 = this.d3
    d3.select(`#${id}`).on('click', () => {
      const el = document.querySelector('svg')
      if (el) el.remove()
      this.setState({
        selectedNodes: defaultNode
      })
      this.props.onChange(this.state.selectedNodes)
      this.renderSankey()
    })
  }

  render() {
    const { data, id } = this.props
    return isEmpty(data) ? (
      this.renderPlaceholder()
    ) : (
      <div id={`chart_${this.id}`} />
    )
  }
}

SankeyChart.defaultProps = {
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
  data: sankeyData
}

export default SankeyChart