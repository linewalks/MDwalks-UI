import React from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import icnNoData from '../../assets/svg/picto_nodata.svg'
import fontStyle from '@Styles/font.module.sass'

const EmptyContainer = styled.section<{ height: number }>`
  display: flex;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
`
const EmptyInner = styled.div`
  text-align: center;
  padding: 8px;
  margin: auto;
`

interface IEmptyDescriptionProps {
  newSrc: string
}

const EmptyDescription = styled.img.attrs(
  ({ newSrc }: IEmptyDescriptionProps) => ({
    src: `${newSrc ?? icnNoData}`,
  }),
)<IEmptyDescriptionProps>`
  width: 198px;
  height: 140px;
  margin-bottom: 8px;
  font-size: 0;
`

const EmptyText = styled.div.attrs({
  className: clsx(fontStyle.fs18, fontStyle.fc_grey08),
})``

interface EmptyPlaceHolderProps {
  height: number
  text: string | React.ReactNode
  imgSrc: string
}

const EmptyPlaceHolder = ({ height, text, imgSrc }: EmptyPlaceHolderProps) => (
  <EmptyContainer height={height}>
    <EmptyInner>
      <EmptyDescription newSrc={imgSrc} />
      <EmptyText>{text}</EmptyText>
    </EmptyInner>
  </EmptyContainer>
)

EmptyPlaceHolder.defaultProps = {
  height: undefined,
  text: 'There is no data',
  imgSrc: undefined,
}

export default EmptyPlaceHolder
