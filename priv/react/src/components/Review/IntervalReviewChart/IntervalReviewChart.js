import React from 'react'
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ReferenceLine,
  Cell
} from 'recharts'

class IntervalReviewChart extends React.Component {
  render() {
    const { guilds, category } = this.props

    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    const width = window.innerWidth
    const intervalSize = Math.abs(category.interval_min - category.interval_max)

    return (
      <div>
        <BarChart layout="vertical" margin={margin} width={width-60} height={30 + 25*guilds.length} data={guilds}>
          <XAxis type="number" domain={[category.interval_min, category.interval_max]} tickCount={intervalSize} />
          <YAxis width={50} type="category" dataKey="name" />
          <Bar dataKey="score">
            {
              guilds.map((guild, index) => (
                <Cell key={index} fill={guild.color} stroke="black"/>
              ))
            }
          </Bar>
          <ReferenceLine x={0} stroke="black" strokeWidth={2}/>
        </BarChart>
      </div>
    )
  }
}

export default IntervalReviewChart

/**
 * Twists a tick. Hand as tick prop to <*Axis/> component
 */
// class CustomizedAxisTick extends React.Component {
//   render () {
//     const {x, y, stroke, payload} = this.props;

//    	return (
//     	<g transform={`translate(${x},${y})`}>
//         <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>
//       </g>
//     );
//   }
// }
