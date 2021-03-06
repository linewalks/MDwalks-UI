Tooltip example:

```js
<>
반갑습니다.
<Tooltip placement="top" desc="Linewalks는 의료데이터로 세상을 이롭게 만드는 것을 지향합니다.">Linewalks</Tooltip>입니다.
</>
```

```js
const showTooltip = () => {
  const desc = "의약품이란 병을 치료하거나 증상을 완화하는, 혹은 일시적으로 통증을 줄여 주는 데 쓰이는 특정한 물질"
  const innerStyle = { fontWeight: 'bold' }
  return (
    <div style={{ width: 800, wordBreak: 'break-all', wordWrap: 'break-word' }}>
      약국에서 구입할 수 있는 <Tooltip placement="bottom" width={360} desc={desc} innerStyle={innerStyle}>의약품</Tooltip> 경우 의사의 처방전이 필요한 전문의약품(ETC)과 처방전 없이 자유롭게 구입할 수 있는 일반의약품(OTC)이 있습니다. TV, 신문 등에서 광고로 소개되는 것이 일반의약품인데 영어로는 OTC(Over The Counter Drug)라고 합니다.
    </div>
  )
}

showTooltip()
```

```js
import styled from 'styled-components'

const showTooltip = () => {
  const WrapArticle = styled.article`
  `

  const Box = styled.div`
    border: solid 1px;
    border-radius: 8px;
    width: 70px;
    margin-right: 8px;
    margin-bottom: 8px;
    display: inline-block;
    text-align: center;
  `

  const text = 'prompt text'
  const buttonWidth = 70

  return (
    <WrapArticle>
      <div style={{ marginLeft: buttonWidth }}>
        <Tooltip placement="top" desc={text}>
          <Box>Top</Box>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Tooltip placement="left" desc={text}>
          <Box>Left</Box>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 + 6 }}>
        <Tooltip placement="right" desc={text}>
          <Box>Right</Box>
        </Tooltip>
      </div>
      <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottom" desc={text}>
          <Box>Bottom</Box>
        </Tooltip>
      </div>
    </WrapArticle>
  )
}

showTooltip()
```