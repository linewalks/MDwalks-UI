import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color } from '@src/assets/styles/variables'

const ButtonContainer = styled.div`
  min-width: 454px;
  height: 40px;
  background-color: ${color.$primary_white};
  border: 1px solid ${color.$line_btn_grey};
  border-radius: 21px;
  display: inline-block;
  box-sizing: border-box;
`

const ToggleLargeBtn = styled.button.attrs({
  className: `${fontStyle.fs16_black_opacity8} ${fontStyle.bold}`,
})`
  min-width: 229px;
  height: 100%;
  background-color: ${(props) => (props.selected ? color.$azure : color.$primary_white)};
  color: ${(props) => (props.selected ? color.$primary_white : null)} !important;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  padding: 0;
  &:first-child {
    border-radius: 21px 0 0 21px;
  }

  &:last-child {
    border-radius: 0 21px 21px 0;
  }

  &.leftLine::after {
    position: absolute;
    content: "";
    top: 19%;
    right: -1px;
    width: 1px;
    height: 62%;
    background-color: ${color.$line_search_grey};
    margin-right: 1px;
  }

  &.rightLine::before {
    position: absolute;
    content: "";
    top: 19%;
    left: -1px;
    width: 1px;
    height: 62%;
    background-color: ${color.$line_search_grey};
    margin-right: 1px;
  }
`

class ToggleLargeButton extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props
    const defaultActive = _.head(data).type
    this.state = {
      active: defaultActive,
    }
  }

  addPartitionLine = async (data, activeValue) => {
    const toggleList = document.querySelectorAll('.toggleBtn')
    const selectedIdx = await _.findIndex(data, (el) => el.type === activeValue)

    _.each(toggleList, (button, idx) => {
      button.classList.remove('leftLine', 'rightLine')

      if (selectedIdx - 1 > idx) {
        return button.classList.add('leftLine')
      }

      if (selectedIdx + 1 < idx) {
        return button.classList.add('rightLine')
      }

      return null
    })
  }


  changeBtn = ({ target: { value } }) => {
    const { onChange, data } = this.props

    this.setState({
      active: value,
    })

    this.addPartitionLine(data, value)

    return onChange(value)
  }

  renderToggleLargeBtn = (data) => (
    data.map(({ type, text }) => {
      const { active } = this.state
      const selectedCheck = active === type
      return (
        <ToggleLargeBtn
          key={type}
          onClick={this.changeBtn}
          selected={selectedCheck}
          disabled={selectedCheck}
          value={type}
          className="toggleBtn"
        >
          {text}
        </ToggleLargeBtn>
      )
    })
  )

  componentDidMount = () => {
    const { active } = this.state
    const { data } = this.props

    return this.addPartitionLine(data, active)
  }

  render() {
    const { data } = this.props
    return (
      <ButtonContainer>
        {this.renderToggleLargeBtn(data)}
      </ButtonContainer>
    );
  }
}

ToggleLargeButton.defaultProps = {
  onChange: () => {},
}

ToggleLargeButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func,
}


export default ToggleLargeButton;
