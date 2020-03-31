import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Notification from './Notification';

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
`
export const Animation = styled.div`
  transition: 0.5s;
  transform: translateX(
    ${({ state }) => (state === 'entering' || state === 'entered' ? 400 : 0)}px
  );
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
      {notifications.map((notification) => {
        const key = notification.id || new Date().getTime();
        return (
          <Notification
            key={key}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            timeOut={notification.timeOut}
            onClick={notification.onClick}
            onRequestHide={handleRequestHide(notification)}
          />
        );
      })}
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
