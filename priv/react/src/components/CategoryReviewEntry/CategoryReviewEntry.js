import React from 'react'
import './CategoryReviewEntry.css'
import R from 'ramda'
import RcSlider from 'rc-slider/lib/Slider';
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
                    <RcSlider 
                        disabled={true}
                        min={category.interval_min}
                        max={category.interval_max}
                        dots={true}
                        value={R.pathOr(category.interval_min, ['value'], score)}
                        handleStyle={{
                            transform: 'scale(2)'
                        }}
                    />
                </div>
                
            </div>
        )
    }
}

export default CategoryReviewEntry