import React, { Component } from 'react'
import './Results.css'

class Results extends Component {

  constructor(props) {
    super(props)
    props.getData()
  }

  render() {
    const { guilds } = this.props
    return (
      <div className="Results_Base">
        {guilds.map((g, i) => {
          if(i === 0) {
            return (
              <div key={i} className="Winner">
                {g.name}: {g.result}
              </div>
            )
          }
          return (
            <div key={i} className="NotWinner">
            {g.name}: {g.result}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Results
