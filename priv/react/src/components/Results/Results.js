import React, { Component } from 'react'
import './Results.css'

class Results extends Component {

  componentWillMount() {
    this.props.getData()
  }

  render() {
    const {
      values
    } = this.props
    return (
      <div className="Results_Base">
        {values.map((val, i) => {
          if(i === 0) {
            return (
              <div key={i} className="Winner">
                {val.name}: {val.value}
              </div>
            )
          }
          return (
            <div key={i} className="NotWinner">
            {val.name}: {val.value}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Results
