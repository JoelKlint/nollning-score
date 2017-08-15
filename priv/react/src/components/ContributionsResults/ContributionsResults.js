import React from 'react'
import './ContributionsResults.css'
import Results from '../Results/Results'
import RaisedButton from 'material-ui/RaisedButton';

class ContributionsResults extends React.Component {
  render() {

    const { goToNextScreen } = this.props

    return (
      <div className="ContributionsResults_Base">

        <div className="Title">Dina bidrag</div>

        <Results {...this.props} />

        <RaisedButton
          className="NextButton"
          label="Totalt resultat >"
          primary
          onClick={goToNextScreen}
        />
      </div>
    )
  }
}

export default ContributionsResults
