import React, { Component } from 'react'
import './EventPicker.css'
import { Actions } from 'jumpstate'

import EventPickerEntry from '../EventPickerEntry'

class EventPicker extends Component {

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

export default EventPicker