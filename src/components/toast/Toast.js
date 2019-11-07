import React from 'react';
import styled  from 'styled-components'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import icn_message_error from '@src/assets/svg/toast/icn_message_error.svg';
import icn_toast_error_close_default from '@src/assets/svg/toast/icn_toast_error_close_default.svg';

import icn_message_complete from '@src/assets/svg/toast/icn_message_complete.svg';
import icn_toast_complete_close_default from '@src/assets/svg/toast/icn_toast_complete_close_default.svg';

// size : xlg, lg, md
const Box = styled.section.attrs((props = {}) => {
  return {
    size: 16,
    opacity: 8,
  }
})`
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.2);
  border: 2px solid ${props => props.variant === 'error' ? color.$alert_red : color.$solid_default };
  background-color: ${color.$primary_white};
  padding: 15px 56px 15px 24px;
  max-width: 700px;
  line-height: 1;
  ${font.Text}
  text-align: center;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const InnerBox = styled.article`
  margin: 0 auto;
  display: inline-block;
`

const TextBox = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 8px;
    line-height: 1.34em;
  }
`

const CloseButton = styled.button`
  position: absolute;
  line-height: 0;
  right: 16px;
  top: 16px;
`

class Toast extends React.Component {
  render() {
    const {children, variant, onClose = () => {}} = this.props
    return (
      <Box variant={variant}>
        <InnerBox>
          <TextBox>
            <img src={variant === 'error' ? icn_message_error : icn_message_complete} />
            <p>{children}</p>
          </TextBox>
          <CloseButton onClick={() => onClose()}>
            <img src={variant === 'error' ? icn_toast_error_close_default : icn_toast_complete_close_default} />
          </CloseButton>
        </InnerBox>
      </Box>
    )
  }
}

Toast.CloseButton = CloseButton

export default Toast