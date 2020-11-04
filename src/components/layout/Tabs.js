import React from 'react';
import styled, { css } from 'styled-components'
import _ from 'lodash'
import PropTypes from 'prop-types'

import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

export const TYPE = {
  CATEGORY: 'catogory',
  TITLE: 'title',
}

const TabBox = styled.section`
  ${(props) => (props.type === TYPE.CATEGORY ? `border-bottom: 1px solid ${color.$grey05};` : '')}
  margin-bottom: 24px;
`

const UnderLineSize = 3

const typeCategory = css`
  color: ${(props) => (props['aria-selected'] ? color.$pmblue : color.$grey08)} !important;

  padding: 14px 10px ${13 + UnderLineSize}px;
  &:not(:last-child) {
    margin-right: 20px;
  }

  transition: color 0.5s ease;
  &:hover {
    color: ${color.$pmblue} !important;
  }

  position: relative;
`

const typeTitle = css`
  color: ${(props) => (props['aria-selected'] ? color.$grey10 : color.$grey07)} !important;

  &:not(:last-child) {
    margin-right: 40px;
  }

  transition: color 0.5s ease;
  &:hover {
    color: ${color.$grey10} !important;
  }
`

const Tab = styled.span.attrs((props) => {
  const className = [
    (props.type === TYPE.CATEGORY ? fontStyle.fs16 : fontStyle.fs22),
    fontStyle.bold,
  ]

  return { className }
})`
  ${(props) => (props.type === TYPE.CATEGORY ? typeCategory : typeTitle)};

  cursor: pointer;
  display: inline-block;
  text-align: center;
`

const TabUnderLine = styled.div`
  position: absolute;
  height: ${UnderLineSize}px;

  ${(props) => (props.type === TYPE.TITLE ? `` : `background-color: ${color.$pmblue}`)};
  bottom: -1px;
  width: 100%;
  left: 0;

  display: ${(props) => (props['aria-selected'] ? 'block' : 'none')};
`

const Hidden = css`
  height: 0;
  padding: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`

export const TabPane = styled.div`
  ${(props) => (props['aria-hidden'] ? Hidden : '')}
`

class Tabs extends React.Component {
  constructor(props) {
    super(props)

    const { defaultactivekey } = this.props

    const activeKey = defaultactivekey

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

    onChange(selectKey)
  }

  render() {
    const { activeKey, renderObj } = this.state

    const tabs = []
    const contents = []
    const { children, type } = this.props

    React.Children.forEach(children, (child, index) => {
      const key = child.key || String(index)
      tabs.push(
        React.cloneElement(
          <Tab
            type={type}
            aria-selected={activeKey === key}
            onClick={() => this.changeTab(key)}
          >
            {child.props.tab}
            <TabUnderLine
              type={type}
              aria-selected={activeKey === key}
            />
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
        <TabBox type={type}>
          {tabs}
        </TabBox>
        {_.filter(contents, (obj) => obj.props.isReander)}
      </article>
    )
  }
}

Tabs.defaultProps = {
  defaultactivekey: String(0),
  type: TYPE.CATEGORY,
  onChange: () => {},
}

Tabs.propTypes = {
  defaultactivekey: PropTypes.string,
  type: PropTypes.oneOf([TYPE.CATEGORY, TYPE.TITLE]),
  onChange: PropTypes.func,
}

Tabs.Tab = Tab
Tabs.TabPane = TabPane
Tabs.TabUnderLine = TabUnderLine
Tabs.TabBox = TabBox

export default Tabs
