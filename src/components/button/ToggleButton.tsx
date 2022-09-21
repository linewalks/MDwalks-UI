import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import _ from 'lodash'
import fontStyle from '@Styles/font.module.sass'
import { color } from '@Styles/variables'

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
  small: {
    box: {
      height: 32,
      padding: 2,
    },
    button: {
      minWidth: 85,
      height: 28,
      fontSize: 14,
      padding: '5px 16px',
    },
  },
}

const BoxShadow = css<{ selected: boolean }>`
  box-shadow: ${(props) =>
    props.selected ? '0 1px 8px 0 rgba(117, 127, 139, 0.36);' : null};
`

interface ButtonContainerProps {
  height: number
}

const ButtonContainer = styled.section<ButtonContainerProps>`
  height: ${(props) => props.height}px;
  background-color: ${color.$grey04};
  border-radius: ${(props) => props.height / 2}px;
  padding: 2px;
  display: table;
`

interface ToggleBtnProps extends ButtonContainerProps {
  fontSize: number
  minWidth: number
  padding: string
  selected: boolean
  onClick: (e: React.SyntheticEvent) => void
}

const ToggleBtn = styled.button.attrs(() => ({
  className: `${fontStyle.font} ${fontStyle.bold}`,
}))<ToggleBtnProps>`
  color: ${color.$grey10};
  font-size: ${(props) => props.fontSize}px;
  min-width: ${(props) => props.minWidth}px;
  height: ${(props) => props.height}px;
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.height / 2}px;
  outline: none;
  text-align: center;

  &:not(:last-child) {
    margin-right: 8px;
  }
  ${BoxShadow};
  background-color: ${(props) =>
    props.selected ? color.$white : color.$grey04};
  &:hover {
    background-color: ${(props) =>
      props.selected ? color.$white : color.$grey05};
    ${BoxShadow};
  }
`

interface IState {
  active: string
}

interface IData {
  type: string
  text: string | ReactNode
}

interface IProps {
  data: IData[]
  size: 'md' | 'lg' | 'sm'
  onChange: (value: string) => void
}

const defaultProps = {
  onChange: () => {},
  size: 'md',
}

class ToggleButton extends React.Component<IProps, IState> {
  static defaultProps = {
    onChange: () => {},
    size: 'md',
  }

  constructor(props) {
    super(props)
    const { data } = this.props
    const defaultActive = _.head(data).type
    this.state = {
      active: defaultActive,
    }
  }

  changeBtn = (type) => {
    const { onChange } = this.props
    this.setState({
      active: type,
    })

    onChange(type)
  }

  render() {
    const { data, size } = this.props

    const BtnSizeObject = {
      md: BtnSize.middle,
      lg: BtnSize.large,
      sm: BtnSize.small,
    }[size]

    return (
      <ButtonContainer height={BtnSizeObject.box.height}>
        {data.map(({ type, text }) => {
          const { active } = this.state
          const selectedCheck = active === type
          return (
            <ToggleBtn
              key={type}
              onClick={() => this.changeBtn(type)}
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
        })}
      </ButtonContainer>
    )
  }
}

export default ToggleButton
