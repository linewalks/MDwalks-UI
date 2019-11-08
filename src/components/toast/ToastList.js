import React from 'react';
import _ from 'lodash'
import styled  from 'styled-components'

import Toast from '@Components/toast/Toast'

const ReactDOM = require('react-dom');

const Box = styled.article`
  &:not(:last-child):not(:empty) {
    margin-bottom: 20px;
  }
`

class ToastBox extends React.Component {
  constructor(props) {
    super(props)

    const list = _.map(props.data, ({type, msg, id = _.uniqueId('notification_')}) => {
      return {type, msg, id}
    })

    this.state = {
      list
    }
  }
  
  addNotification({type = '', msg = ''}) {
    const list = this.state.list.concat({type, msg, id: _.uniqueId('notification_')})

    this.setState({
      list
    })
  }

  removeNotification(id = null) {
    this.setState(prevState => ({
      list: prevState.list.filter((item) => item.id !== id)
    }));
  }

  render() {
    return <Box>{
      _.map(this.state.list, ({type, msg, id}, idx) => {
        return <Toast variant={type} key={`${id}`} onClose={this.removeNotification.bind(this, id)}>{msg}</Toast>
      })
    }
    </Box>
  }
}

export default ToastBox