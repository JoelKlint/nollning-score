import React from 'react'
import './CategoryReviewEntry.css'
import { connect } from 'react-redux'
import R from 'ramda'
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class CategoryReviewEntry extends React.Component {

    render() {
        const { category, score, guild } = this.props

        return (
            <div className="CategoryReviewEntry_Base">

                <div className="CategoryReviewEntry_Guild">
                    {guild.name}
                </div>

                <div className="CategoryReviewEntry_Slider">
                    <Slider 
                        disabled={true}
                        min={category.min}
                        max={category.max}
                        dots={true}
                        value={R.pathOr(category.min, ['value'], score)}
                        handleStyle={{
                            transform: 'scale(2)'
                        }}
                    />
                </div>
                
            </div>
        )
    }
}

const Connect = connect(state => {
    return {
    }
})

export default Connect(CategoryReviewEntry)