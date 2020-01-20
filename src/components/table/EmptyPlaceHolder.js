import React from 'react';
import styled from 'styled-components'
import visualAlert from '@src/assets/svg/visual-alert.svg';
import * as font from '@src/assets/styles/font'

const EmptyContainer = styled.section`
  text-align: center;
`

const EmptyDescription = styled.div`
  width: 290px;
  height: 230px;
  margin: 0 auto;
  background: url('${visualAlert}')
`

const EmptyText = styled.span.attrs(() => {
  return {
    size: 16,
    opacity: 6,
  }
})`
  ${font.Text}
  margin: auto;
  display: block;
`

export default () => (
  <EmptyContainer>
    <EmptyDescription />
    <EmptyText as="span">There is no data<br />Please search again</EmptyText>
  </EmptyContainer>
)