import React from 'react'
import './TotalResults.css'
import Results from '../Results/Results'

class TotalResults extends React.Component {
  render() {
    return (
      <div className="TotalResults_Base">

      <div className="Title">Totalt resultat</div>

        <Results {...this.props} />

      </div>
    )
  }
}

export default TotalResults
