import React, { Component } from 'react'
import GuildPicker from '../GuildPicker'
import ScoreCategories from '../ScoreCategories'

import { Route } from 'react-router-dom';

export default class EditScore extends Component {

    render() {
        return (
            <div>
                <GuildPicker />
                <br/>
                <Route component={ScoreCategories} />
            </div>
        )
    }
}