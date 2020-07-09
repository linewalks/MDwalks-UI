import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as font from '@src/assets/styles/font'
import { color } from '@src/assets/styles/variables'

import IcnMessageError from '@src/assets/svg/toast/icn_message_error.svg';
import IcnToastErrorCloseDefault from '@src/assets/svg/toast/icn_toast_error_close_default.svg';

import IcnMessageComplete from '@src/assets/svg/toast/icn_message_complete.svg';
import IcnToastCompleteCloseDefault from '@src/assets/svg/toast/icn_toast_complete_close_default.svg';

// size : xlg, lg, md
const Box = styled.section.attrs(() => ({
  size: 16,
  opacity: 8,
}))`
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.2);
  border: 2px solid ${(props) => (props.variant === 'error' ? color.$alert_red : color.$solid_default)};
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

const Toast = ({ children, variant, onClose }) => (
  <Box variant={variant}>
    <InnerBox>
      <TextBox>
        <img src={variant === 'error' ? IcnMessageError : IcnMessageComplete} alt="" />
        <p>{children}</p>
      </TextBox>
      <CloseButton onClick={() => onClose()}>
        <img src={variant === 'error' ? IcnToastErrorCloseDefault : IcnToastCompleteCloseDefault} alt="" />
      </CloseButton>
    </InnerBox>
  </Box>
)

Toast.CloseButton = CloseButton

Toast.defaultProps = {
  onClose: () => {},
  variant: '',
}

Toast.propTypes = {
  onClose: PropTypes.func,
  variant: PropTypes.string,
}

export default Toast
