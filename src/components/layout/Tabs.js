import React from 'react';
import styled, { css } from 'styled-components'
import _ from 'lodash'
import PropTypes from 'prop-types'

import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

const TabBox = styled.section`
  border-bottom: 1px solid ${color.$line_dashboard_edge_grey};
  margin-bottom: 24px;
`

const Tab = styled.span.attrs((props) => {
  const options = props['aria-selected'] ? {
    color: color.$solid_default,
  } : {
    color: color.$black,
    opacity: 4,
  }

  return { size: 16, bold: true, ...options }
})`
  ${font.Text}
  padding: 10px;
  &:not(:last-child) {
    margin-right: 20px;
  }

  cursor: pointer;

  display: inline-block;
  border-bottom: 2px solid ${(props) => (props['aria-selected'] ? color.$solid_default : 'transparent')};
`

const Hidden = css`
  height: 0;
  padding: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`

export const TabPane = styled.div.attrs()`
  ${(props) => (props['aria-hidden'] ? Hidden : '')}
  // display: ${(props) => (props['aria-hidden'] ? 'none' : '')}
`

class Tabs extends React.Component {
  constructor(props) {
    super(props)

    const { defaultactivekey } = this.props

    const activeKey = defaultactivekey || 0

    this.state = {
      activeKey,
      renderObj: new Set().add(activeKey),
    }
  }

  // eslint-disable-next-line consistent-return
  changeTab(selectKey) {
    const { activeKey } = this.state
    if (activeKey === selectKey) return null

    const { renderObj } = this.state
    const { onChange } = this.props

    renderObj.add(selectKey)

    this.setState({
      activeKey: selectKey,
      renderObj,
    })

    if (_.isFunction(onChange)) {
      onChange(selectKey)
    }
  }

  render() {
    const { activeKey, renderObj } = this.state

    const tabs = []
    const contents = []
    const { children } = this.props
    React.Children.forEach(children, (child, index) => {
      const key = child.key || String(index)
      tabs.push(
        React.cloneElement(
          <Tab
            aria-selected={activeKey === key}
            onClick={() => this.changeTab(key)}
          >
            {child.props.tab}
          </Tab>,
          { key },
        ),
      )

      contents.push(React.cloneElement(child, {
        contents: (
          { child }
        ),
        'aria-hidden': activeKey !== key,
        isReander: renderObj.has(key),
        key,
      }))
    })

    return (
      <article>
        <TabBox>
          {tabs}
        </TabBox>
        {_.filter(contents, (obj) => obj.props.isReander)}
      </article>
    )
  }
}

Tabs.defaultProps = {
  defaultactivekey: String(0),
  onChange: () => ({}),
}

Tabs.propTypes = {
  defaultactivekey: PropTypes.string,
  onChange: PropTypes.func,
}

Tabs.Tab = Tab
Tabs.TabPane = TabPane

export default Tabs
