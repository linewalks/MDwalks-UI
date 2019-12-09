import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Toast from '@Components/toast/Toast'

const Box = styled.article`
  &:not(:last-child):not(:empty) {
    margin-bottom: 20px;
  }
`

class ToastList extends React.Component {
  constructor(props) {
    super(props)

    const { data } = props

    const list = _.map(data, ({ type, msg, id = _.uniqueId('notification_') }) => ({ type, msg, id }))

    this.removeNotification = this.removeNotification.bind(this)

    this.state = {
      list,
    }
  }

  addNotification({ type = '', msg = '' }) {
    const { list: prevList } = this.state
    const list = prevList.concat({ type, msg, id: _.uniqueId('notification_') })

    this.setState({
      list,
    })
  }

  removeNotification(id = null) {
    this.setState((prevState) => ({
      list: prevState.list.filter((item) => item.id !== id),
    }));
  }

  render() {
    const { list } = this.state

    return (
      <Box>
        {
          _.map(list, ({ type, msg, id }) => <Toast variant={type} key={`${id}`} onClose={() => this.removeNotification(id)}>{msg}</Toast>)
        }
      </Box>
    )
  }
}

ToastList.defaultProps = {
  data: [],
}

ToastList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    msg: PropTypes.string.isRequired,
    id: PropTypes.string,
  })),
}

export default ToastList
