import React from 'react'
import './EventPickerEntry.css'

export default class EventPickerEntry extends React.Component {
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