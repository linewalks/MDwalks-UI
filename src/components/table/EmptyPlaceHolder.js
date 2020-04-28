import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import icnNoData from '@src/assets/svg/icn-nodata.svg';
import fontStyle from '@src/assets/styles/font.module.sass'

const EmptyContainer = styled.section`
  display: flex;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
`
const EmptyInner = styled.div`
  text-align: center;
  padding: 8px;
  margin: auto;
`

const EmptyDescription = styled.img.attrs({
  src: `${icnNoData}`,
})`
  width: 198px;
  height: 140px;
  margin-bottom: 8px;
  font-size: 0;
`

const EmptyText = styled.p.attrs(() => ({
  className: [fontStyle.fs18, fontStyle.fc_grey08].join(' '),
}))`
`

const EmptyPlaceHolder = ({ height }) => (
  <EmptyContainer height={height}>
    <EmptyInner>
      <EmptyDescription />
      <EmptyText>
        There is no data
      </EmptyText>
    </EmptyInner>
  </EmptyContainer>
)

EmptyPlaceHolder.defaultProps = {
  height: undefined,
}

EmptyPlaceHolder.propTypes = {
  height: PropTypes.number,
}

export default EmptyPlaceHolder
