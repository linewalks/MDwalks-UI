import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components'

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import Notification from './Notification';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const List = styled.section`
  box-sizing: border-box;
  position: fixed;
  top: 99px;
  left: 50%;
  margin-left: -350px;
  z-index: 999999;
  max-height: calc(100% - 30px -99px);
  overflow-x: hidden;
  overflow-y: auto;

  .item-enter {
    animation: ${fadeInDown} 100ms linear;
    animation-fill-mode: both;
  }

  .item-enter-active {
  }

  .item-exit {
    animation: ${fadeOutUp} 100ms linear;
    animation-fill-mode: both;
  }

  .item-exit-active {
  }
`

const Notifications = (props) => {
  const {
    notifications,
    onRequestHide,
    // enterTimeout,
    // leaveTimeout,
  } = props;

  const handleRequestHide = (notification) => () => {
    onRequestHide(notification);
  }

  return (
    <List>
      <TransitionGroup>
        {notifications.map((notification) => {
          const key = notification.id || new Date().getTime();
          return (
            <CSSTransition
              key={key}
              timeout={100}
              classNames="item"
            >
              <Notification
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timeOut={notification.timeOut}
                onClick={notification.onClick}
                onRequestHide={handleRequestHide(notification)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </List>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
    timeOut: PropTypes.number,
    onClick: PropTypes.func,
  })).isRequired,
  onRequestHide: PropTypes.func,
  // enterTimeout: PropTypes.number,
  // leaveTimeout: PropTypes.number,
};

Notifications.defaultProps = {
  // notifications: [],
  onRequestHide: () => {},
  // enterTimeout: 400,
  // leaveTimeout: 400,
};

export default Notifications
