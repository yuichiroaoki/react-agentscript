import React, { useEffect } from "react";

import { Animator, TwoDraw } from "ts-agent";
import { AgentscriptProps } from "./Agentscript.types";

import "./Agentscript.scss";


const Agentscript: React.FC<AgentscriptProps> = ({
	view, animation, Model, setModel, setAnim
}) => {
	useEffect(() => {
		const agentSetup = async () => {
			const model = new Model()
			await model.startup()
			model.setup()
			setModel(model)

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
	}, [])

	return (
		<div id="modelDiv"></div>
	)
}

export default Agentscript;