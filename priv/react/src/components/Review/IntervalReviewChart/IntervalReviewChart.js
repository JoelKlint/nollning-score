import React from 'react'
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ReferenceLine,
  Cell
} from 'recharts'
import Color from 'color'

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

    return (
      <div>
        <BarChart margin={margin} width={width - 45} height={200} data={guilds}>
          <XAxis minTickGap={0} dataKey="name" tickLine={false}/>
          <YAxis width={25} domain={[category.interval_min, category.interval_max]} />
          <ReferenceLine y={0} stroke="black" />
          <Bar dataKey="score">
            {
              guilds.map((guild, index) => {
                const color = Color(guild.color)
                return <Cell cursor="pointer" fill={Color(guild.color).white() > 87 ? 'black' : guild.color}/>
              })
            }
          </Bar>
        </BarChart>
      </div>
    )
  }
}

export default IntervalReviewChart
