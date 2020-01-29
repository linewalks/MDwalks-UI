import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

const ButtonContainer = styled.div`
  min-width: 180px;
  height: 34px;
  background-color: ${color.$btn_lightshaded_default};
  border-radius: 21px;
  padding: 2px;
  display: inline-block;
`

const ToggleBtn = styled.button.attrs(() => ({
  className: `${fontStyle.fs14_black_opacity8} ${fontStyle.bold}`,
}))`
  min-width: 90px;
  height: 34px;
  border-radius: 17px;
  background-color: ${(props) => (props.selected ? color.$primary_white : color.$btn_lightshaded_default)};
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: ${(props) => (props.selected ? '0 4px 10px 0 rgba(0, 0, 0, 0.08)' : null)}
`

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props
    const defaultActive = _.head(data).type
    this.state = {
      active: defaultActive,
    }
  }

  changeBtn = ({ target: { value } }) => {
    const { onChange } = this.props
    if (_.isFunction(onChange)) {
      onChange(value)
    }

    return this.setState({
      active: value,
    })
  }

  renderToggleBtn = (data) => (
    data.map(({ type, text }) => {
      const { active } = this.state
      const selectedCheck = active === type
      return (
        <ToggleBtn
          key={type}
          onClick={this.changeBtn}
          selected={selectedCheck}
          disabled={selectedCheck}
          value={type}
        >
          {text}
        </ToggleBtn>
      )
    })
  )

  render() {
    const { data } = this.props
    return (
      <ButtonContainer>
        {data && this.renderToggleBtn(data)}
      </ButtonContainer>
    )
  }
}

ToggleButton.defaultProps = {
  data: [],
  onChange: () => {},
}


ToggleButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
}

export default ToggleButton;
