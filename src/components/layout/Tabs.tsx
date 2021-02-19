import React from 'react'
import styled, { css } from 'styled-components'
import _ from 'lodash'

import fontStyle from '@Styles/font.module.sass'
import { color } from '@Styles/variables'

export const TYPE = {
  CATEGORY: 'category',
  TITLE: 'title',
}

interface IType {
  type: 'category' | 'title';
}

const TabBox = styled.section < IType > `
  border-bottom: ${(props) => (_.isEqual(props.type, TYPE.CATEGORY) && `1px solid ${color.$grey05}`)};
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

const Tab = styled.span.attrs((props:IType) => {
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

  ${(props:IType) => (props.type === TYPE.TITLE ? `` : `background-color: ${color.$pmblue}`)};
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

interface IProps extends IType {
  defaultactivekey: string;
  onChange?: (key:string) => void;
}

interface IState {
  activeKey: string;
  renderObj: any;
}

class Tabs extends React.Component<IProps, IState> {
  static Tab: any;

  static TabPane: any;

  static TabUnderLine: any;

  static TabBox: any;

  static defaultProps = {
    defaultactivekey: String(0),
    type: TYPE.CATEGORY,
    onChange: () => {},
  }

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

    React.Children.forEach(children, (child:any, index) => {
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

Tabs.Tab = Tab
Tabs.TabPane = TabPane
Tabs.TabUnderLine = TabUnderLine
Tabs.TabBox = TabBox

export default Tabs
