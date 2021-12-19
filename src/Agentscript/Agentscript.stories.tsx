// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import Agentscript from "./Agentscript";
import Model from '../models/AntsModel'
import { Settings } from '../components/Settings'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [anim, setAnim] = useState<any | undefined>();
  const [model, setModel] = useState<any | undefined>();
  const [step, setStep] = useState<number>(10);
  const [fps, setFps] = useState<number>(10);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    updateModel();
  }, []);

  const updateModel = () => {
    const newModel = new Model();
    newModel.token = "bar";
    setModel(newModel);
  }

  const handleReset = () => {
    updateModel();
    setReset(!reset);
  }

  if (!model) {
      return <div>loading</div>
  }
  return (
    <>
      <Agentscript
        view={
          {
            width: 800,
            drawOptions: {
              turtlesColor: t => (t.carryingFood ? "red" : "blue"),
              patchesColor: p => {
                if (p.isNest) return "blue"
                if (p.isFood) return "red"
                return "black"
              },
              turtlesSize: 5,
              turtlesShape: "bug"
            }
          }
        }
        animation={{
          step: step,
          fps: fps,
        }}
        reset={reset}
        model={model}
        setAnim={setAnim}
      />
      <button onClick={handleReset}>reset</button>
      <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
      <input type="button" value="once" onClick={() => { anim.once(); }} />
      <Settings updateModel={updateModel} step={step} fps={fps} setStep={setStep} setFps={setFps} />
    </>
  )
}