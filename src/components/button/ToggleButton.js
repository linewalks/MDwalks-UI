import React from 'react';
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fontStyle from '@src/assets/styles/font.module.sass'
import { color, colorV1 } from '@src/assets/styles/variables'

export const BtnSize = {
  large: {
    box: {
      height: 46,
      padding: 2,
    },
    button: {
      minWidth: 100,
      height: 42,
      fontSize: 16,
      padding: '9px 20px',
    },
  },
  middle: {
    box: {
      height: 38,
      padding: 2,
    },
    button: {
      minWidth: 90,
      height: 34,
      fontSize: 14,
      padding: '7px 18px',
    },
  },
}

const BoxShadow = css`
  box-shadow: ${(props) => (props.selected ? '0 1px 8px 0 rgba(117, 127, 139, 0.36);' : null)}
`

const ButtonContainer = styled.section`
  height: ${(props) => (props.height)}px;
  background-color: ${colorV1.$grey04};
  border-radius: ${(props) => (props.height / 2)}px;
  padding: 2px;
  display: table;
`

const ToggleBtn = styled.button.attrs(() => ({
  className: `${fontStyle.font} ${fontStyle.bold}`,
}))`
  color: ${colorV1.$grey10};
  font-size: ${(props) => (props.fontSize)}px;
  min-width: ${(props) => (props.minWidth)}px;
  height: ${(props) => (props.height)}px;
  padding: ${(props) => (props.padding)};
  border-radius: ${(props) => (props.height / 2)}px;
  outline: none;
  text-align: center;

  &:not(:last-child) {
    margin-right: 8px;
  }
  ${BoxShadow};
  background-color: ${(props) => (props.selected ? color.$primary_white : colorV1.$grey04)};
  &:hover {
    background-color: ${(props) => (props.selected ? color.$primary_white : colorV1.$grey05)};
    ${BoxShadow};
  }
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
    this.setState({
      active: value,
    })

    onChange(value)
  }

  render() {
    const { data, size } = this.props

    const BtnSizeObject = {
      md: BtnSize.middle,
      lg: BtnSize.large,
    }[size]

    return (
      <ButtonContainer height={BtnSizeObject.box.height}>
        {
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
                height={BtnSizeObject.button.height}
                fontSize={BtnSizeObject.button.fontSize}
                minWidth={BtnSizeObject.button.minWidth}
                padding={BtnSizeObject.button.padding}
              >
                {text}
              </ToggleBtn>
            )
          })
        }
      </ButtonContainer>
    )
  }
}

ToggleButton.defaultProps = {
  onChange: () => {},
  size: 'md',
}

ToggleButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
  onChange: PropTypes.func,
}

export default ToggleButton;
