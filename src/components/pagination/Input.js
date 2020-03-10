import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { color, colorV1 } from '@src/assets/styles/variables'

const InputBox = styled.input`
  color: ${colorV1.$grey10};
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1;

  padding: 7px 18px;
  border-radius: 21px;
  border: solid 1px #dce0e4;
  background-color: ${color.primary_white};
`

export const Input = ({
  initPage, size, min, onChange, max,
}) => {
  const [page, setPage] = useState(initPage);

  useEffect(() => {
    setPage(initPage)
  }, [initPage])

  const onInputChange = (inputPage) => {
    setPage(inputPage)
  }

  const onInputKeyPress = (e) => {
    if (e.key !== 'Enter') return
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
      onChange={(e) => onInputChange(e.target.value)}
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
