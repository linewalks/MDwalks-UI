import { EventEmitter } from 'events';
import _ from 'lodash'

const Constants = {
  CHANGE: 'change',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

class NotificationManager extends EventEmitter {
  constructor(props) {
    super(props)
    this.listNotify = []
  }

  create(notify) {
    const defaultNotify = {
      id: _.uniqueId('notification_'),
      type: 'info',
      title: null,
      message: null,
      timeOut: 5000,
    }

    if (notify.priority) {
      this.listNotify.unshift(Object.assign(defaultNotify, notify))
    } else {
      this.listNotify.push(Object.assign(defaultNotify, notify))
    }
    this.emitChange();
  }

  info(message, props = {}) {
    const {
      title, timeOut, onClick, priority,
    } = props

    this.create({
      type: Constants.INFO,
      message,
      title,
      timeOut,
      onClick,
      priority,
    })
  }

  success(message, props = {}) {
    const {
      title, timeOut, onClick, priority,
    } = props

    this.create({
      type: Constants.SUCCESS,
      message,
      title,
      timeOut,
      onClick,
      priority,
    })
  }

  warning(message, props = {}) {
    const {
      title, timeOut, onClick, priority,
    } = props

    this.create({
      type: Constants.WARNING,
      message,
      title,
      timeOut,
      onClick,
      priority,
    })
  }

  error(message, props = {}) {
    const {
      title, timeOut, onClick, priority,
    } = props

    this.create({
      type: Constants.ERROR,
      message,
      title,
      timeOut,
      onClick,
      priority,
    })
  }

  remove(notification) {
    this.listNotify = this.listNotify.filter((n) => (notification.id !== n.id))
    this.emitChange()
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.listNotify)
  }

  addChangeListener(callback) {
    this.addListener(Constants.CHANGE, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback)
  }
}

export default new NotificationManager()
