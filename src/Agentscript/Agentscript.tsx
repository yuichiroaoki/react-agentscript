import React from "react";

import TwoDraw from './lib/agentscript/TwoDraw'
import Animator from './lib/agentscript/Animator'
// import Color from '../agentscript/Color'
// import ColorMap from '../agentscript/ColorMap'

import { AgentscriptProps } from "./Agentscript.types";

import "./Agentscript.scss";


export default function Agentscript({
	view, animation, Model
}: AgentscriptProps
) {

	const agentSetup = async () => {

		// Define colors and colormaps
		// const nestColor = Color.typedColor('yellow')
		// const foodColor = Color.typedColor('blue')
		// const nestColorMap = ColorMap.gradientColorMap(20, [
		// 	'black',
		// 	nestColor,
		// ])
		// const foodColorMap = ColorMap.gradientColorMap(20, [
		// 	'black',
		// 	foodColor,
		// ])

		// const drawOptions = {
		// 	// patchesColor: p => {
		// 	// 	if (p.isNest) return nestColor
		// 	// 	if (p.isFood) return foodColor
		// 	// 	// return p.foodPheromone > p.nestPheromone
		// 	// 	//   ? foodColorMap.scaleColor(p.foodPheromone, 0, 1)
		// 	// 	//   : nestColorMap.scaleColor(p.nestPheromone, 0, 1)
		// 	// },
		// 	turtlesShape: 'bug',
		// 	turtlesSize: 3,
		// 	// turtlesColor: t => (t.carryingFood ? nestColor : foodColor),
		// }

		const model = new Model()
		await model.startup()
		model.setup()


		const { width, drawOptions } = view;
		const twoDraw = new TwoDraw(model, {
			div: 'modelDiv',
			useSprites: true, // ant shape difficult to draw
			width: width,
			drawOptions,
		})

		const { step, fps } = animation;
		const anim = new Animator(
		  () => {
		    model.step()
		    twoDraw.draw()
		  },
		  step, 
		  fps
		)
	}
	agentSetup()

	return (
		<div id="modelDiv"></div>
	)
}
