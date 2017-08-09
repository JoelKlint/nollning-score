import React, { Component } from 'react'
import './EventPickerEntry.css'

class EventPickerEntry extends Component {
    render() {
        return (
            <div 
                className="EventPickerEntry_Base"
                onClick={this.props.onClick}
            >
                {this.props.event.name}
            </div>
        )
    }
}

export default EventPickerEntry