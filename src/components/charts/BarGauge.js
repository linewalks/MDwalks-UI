import React from 'react'
import _ from 'lodash'

const styles = {
  "gauge_container":{
    "background":"#f2f2f2",
    "position":"relative",
    "height":"6px",
    "width":"100px",
    "borderRadius":"2px",
    "overflow":"hidden",
  },
  "bar_gauge_fill":{
    "position":"absolute",
    "backgroundImage":"linear-gradient(to right, #189bff , #002d4f 100px)",
    "height":"100%",
    "width": 'auto'
  }
}

class BarGauge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styles
    }

    this.state.styles.bar_gauge_fill = Object.assign(_.clone(styles.bar_gauge_fill), {
      width: `${this.props.score}%`
    })

  }

  render() {
    const score = this.props.score

    if (_.inRange(score, 0, 101)) {
      return (
        <div style={this.state.styles.gauge_container}>
          <div style={this.state.styles.bar_gauge_fill}></div>
        </div>
      );
    } else {
      return (
        <div>Invalid Score</div>
      )
    }
  }
}

export default BarGauge;