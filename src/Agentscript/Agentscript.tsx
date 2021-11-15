import React, { useEffect } from "react";

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
	useEffect(() => {
		const agentSetup = async () => {
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
	}, [])

	return (
		<div id="modelDiv"></div>
	)
}
