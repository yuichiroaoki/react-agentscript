import React, { useEffect, useState } from "react";

import { Animator, TwoDraw } from "ts-agent";
import { AgentscriptProps } from "./Agentscript.types";

import "./Agentscript.scss";


const Agentscript: React.FC<AgentscriptProps> = ({
	view, animation, Model, setAnim, reset
}) => {
	useEffect(() => {
		const agentSetup = async () => {
			document.querySelector('#modelDiv').innerHTML = ''
			const model = new Model()
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
	}, [animation.step, animation.fps, reset])

	return (
		<div id="modelDiv"></div>
	)
}

export default Agentscript;