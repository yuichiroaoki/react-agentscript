import React, { useState } from "react";

interface SettingsProps {
	setStep: (step: number) => void
	step: number
	fps: number
	setFps: (fps: number) => void
	updateModel: () => void
  }
  
  export const Settings: React.FC<SettingsProps> = ({
	setStep, step, fps, setFps, updateModel
  }) => {
	const [stepInput, setStepInput] = useState(step.toString())
	const [fpsInput, setFpsInput] = useState(fps.toString())
  
	const stepChange = (e: any) => {
	  setStepInput(e.target.value)
	}
	const fpsChange = (e: any) => {
	  setFpsInput(e.target.value)
	}
	const applyChanges = () => {
	  setStep(Number(stepInput))
	  setFps(Number(fpsInput))
	  updateModel()
	}
  
  
	return (
	  <div>
		<input value={stepInput} onChange={stepChange} />
		<input value={fpsInput} onChange={fpsChange} />
		<button onClick={applyChanges}>set</button>
	  </div>
	);
  }
  