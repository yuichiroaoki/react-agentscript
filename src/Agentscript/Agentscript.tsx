import React, { useEffect } from "react";

import { Animator, TwoDraw } from "ts-agent";
import { AgentscriptProps } from "./Agentscript.types";

import "./Agentscript.scss";


const Agentscript: React.FC<AgentscriptProps> = ({
	view, animation, Model, setAnim
}) => {
	useEffect(() => {
		const agentSetup = async () => {
			document.querySelector('#modelDiv').innerHTML = ''
			const model = new Model(animation.fps, animation.step)
			await model.startup()
			model.setup()

			const { width, drawOptions } = view;
			const twoDraw = new TwoDraw(model, {
				div: 'modelDiv',
				width: width,
				drawOptions,
			})

			const { step, fps } = animation;
			const newAnim = new Animator(
				() => {
					model.step()
					twoDraw.draw()
				},
				step,
				fps
			)
			setAnim(newAnim)
		}
		agentSetup()
	}, [animation.step, animation.fps])

	return (
		<div id="modelDiv"></div>
	)
}

export default Agentscript;