import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components'
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
  border: 2px solid ${(props) => (props.variant === 'error' ? color.$red01 : color.$pmblue)};
  background-color: ${color.$white};
  padding: 15px 56px 15px 24px;
  min-width: 700px;
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

  h4 {
    margin-right: 8px;
  }

  img {
    margin-right: 8px;
  }

  p {
    line-height: 1.34em;
  }
`

const CloseButton = styled.button`
  position: absolute;
  line-height: 0;
  right: 16px;
  top: 16px;
  font-size: 0;
`

class Notification extends React.Component {
  componentDidMount = () => {
    const { timeOut } = this.props;
    if (timeOut !== 0) {
      this.timer = setTimeout(this.requestHide, timeOut);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
    this.requestHide();
  };

  requestHide = () => {
    const { onRequestHide } = this.props;
    if (onRequestHide) {
      onRequestHide();
    }
  };

  render() {
    const { type: variant, message } = this.props;
    let { title } = this.props;
    title = title ? (<h4>{title}</h4>) : null;
    return (
      <Box variant={variant}>
        <InnerBox>
          <TextBox>
            <img src={variant === 'error' ? IcnMessageError : IcnMessageComplete} alt="" />
            {title}
            <p>{message}</p>
          </TextBox>
          <CloseButton onClick={this.handleClick} onKeyPress={this.handleClick}>
            <img src={variant === 'error' ? IcnToastErrorCloseDefault : IcnToastCompleteCloseDefault} alt="" />
          </CloseButton>
        </InnerBox>
      </Box>
    );
  }
}

Notification.defaultProps = {
  type: 'info',
  title: null,
  timeOut: 5000,
  onClick: () => {
  },
  onRequestHide: () => {
  },
};

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  title: PropTypes.node,
  message: PropTypes.node.isRequired,
  timeOut: PropTypes.number,
  onClick: PropTypes.func,
  onRequestHide: PropTypes.func,
};

export default Notification
