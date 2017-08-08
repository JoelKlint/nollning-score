import React from 'react'
import './EventPicker.css'
import { Actions } from 'jumpstate'
import { connect } from 'react-redux'
import R from 'ramda'

import EventPickerEntry from './EventPickerEntry'

class EventPicker extends React.Component {

    componentDidMount() {
        Actions.getAllEvents()
    }

    render() {
        return (
            <div className="EventPicker_Base">

                <h1 className="EventPicker_Title">Events</h1>

                <div className="EventPicker_Entries">
                    {this.props.events.map((e, i) => {
                        return (
                            <EventPickerEntry 
                                key={i} 
                                event={e} 
                                onClick={() => {
                                    this.props.history.push(`/events/${e.id}/edit`)
                                }}
                            />
                        )
                    })}
                </div>

            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        events: R.values(state.entities.events)
    }
})

export default Connect(EventPicker)