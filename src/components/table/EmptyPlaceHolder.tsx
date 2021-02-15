import React from 'react';
import styled from 'styled-components'
import icnNoData from '../../assets/svg/picto_nodata.svg';
import fontStyle from '@Styles/font.module.sass'

const EmptyContainer = styled.section<{ height: number; }>`
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

const EmptyText = styled.div.attrs(() => ({
  className: [fontStyle.fs18, fontStyle.fc_grey08].join(' '),
}))`
`

interface EmptyPlaceHolderProps {
  height: number;
  text: string | React.ReactNode;
}

const EmptyPlaceHolder = ({ height, text }:EmptyPlaceHolderProps) => (
  <EmptyContainer height={height}>
    <EmptyInner>
      <EmptyDescription />
      <EmptyText>
        {text}
      </EmptyText>
    </EmptyInner>
  </EmptyContainer>
)

EmptyPlaceHolder.defaultProps = {
  height: undefined,
  text: 'There is no data',
}

export default EmptyPlaceHolder
