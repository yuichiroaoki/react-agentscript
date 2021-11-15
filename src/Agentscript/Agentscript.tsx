import React, { useEffect } from "react";

import TwoDraw from './lib/agentscript/TwoDraw'
import Animator from './lib/agentscript/Animator'

import { AgentscriptProps } from "./Agentscript.types";

import "./Agentscript.scss";


const Agentscript: React.FC<AgentscriptProps> = ({ 
	view, animation, Model
}) => {
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

export default Agentscript;