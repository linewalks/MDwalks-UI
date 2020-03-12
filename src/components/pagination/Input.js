import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { color, colorV1 } from '@src/assets/styles/variables'

const InputBox = styled.input`
  color: ${colorV1.$grey10};
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1;

  max-width: 100px;

  padding: 7px 18px;
  border-radius: 21px;
  border: solid 1px #dce0e4;
  background-color: ${color.primary_white};
`

// 범위도 추가 되어야겟다
const Input = ({
  initPage, size, min, onChange, max,
}) => {
  const [page, setPage] = useState(initPage);
  const pattern = `^[0-9]+$`

  useEffect(() => {
    setPage(initPage)
  }, [initPage])

  const valid = (e) => {
    if (e.target.validity) return e.target.validity.valid
    return (new RegExp(pattern)).test(e.target.value) // for enzyme // keypress 인 경우는 있다
  }

  // only isInteger
  const onInputChange = (e) => {
    const financialGoal = valid(e) ? e.target.value : page
    setPage(financialGoal)
  }

  const onInputKeyPress = (e) => {
    if (e.key !== 'Enter') return
    if (e.target.value === '') return

    let inputPage = Number(e.target.value)

    if (inputPage < min) {
      inputPage = min
    }
    if (inputPage > max) {
      inputPage = max
    }

    setPage(inputPage)
    onChange(inputPage)
  }

  return (
    <InputBox
      inputsize={size}
      size={String(page).length || 1}
      value={page}
      pattern={pattern}
      onChange={(e) => onInputChange(e)}
      onKeyPress={(e) => onInputKeyPress(e)}
    />
  )
}

Input.defaultProps = {
  onChange: () => {},
  min: 1,
  size: undefined,
  initPage: 1,
}

Input.propTypes = {
  initPage: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
}

export default Input
