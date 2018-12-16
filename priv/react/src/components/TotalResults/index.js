import TotalResults from './TotalResults'
import { connect } from 'react-redux'
import Actions from '../../state/Actions'
import {
  getResultsForCurrentEvent
} from '../../state/Selectors';

const stateful = connect(state => {
  return {
    values: getResultsForCurrentEvent(state) || [],
    getData: () => Actions.getResultsForEvent(state.current.event),
  }
})

export default stateful(TotalResults)
