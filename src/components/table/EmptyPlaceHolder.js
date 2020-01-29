import React from 'react';
import styled from 'styled-components'
import visualAlert from '@src/assets/svg/visual-alert.svg';
import fontStyle from '@src/assets/styles/font.module.sass'

const EmptyContainer = styled.section`
  text-align: center;
`

const EmptyDescription = styled.img.attrs({
  src: `${visualAlert}`
})`
  display: block;
  width: 290px;
  height: 230px;
  margin: 0 auto;
`

const EmptyText = styled.span.attrs(() => ({
  className: fontStyle.fs16_black_opacity6,
}))`
  margin: auto;
  display: block;
`

export default () => (
  <EmptyContainer>
    <EmptyDescription />
    <EmptyText as="span">There is no data<br />Please search again</EmptyText>
  </EmptyContainer>
)