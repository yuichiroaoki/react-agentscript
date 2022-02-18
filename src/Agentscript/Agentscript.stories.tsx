// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import Agentscript from "./Agentscript";
import Model from '../models/AntsModel'
import { Settings } from '../components/Settings'
import { Color } from "ts-agent"

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
              turtlesColor: t => (t.carryingFood ? Color.typedColor(0, 0, 200) : Color.typedColor(0, 200, 0)),
              patchesColor: p => {
                if (p.isNest) return Color.typedColor(0, 200, 0)
                if (p.isFood) return Color.typedColor(0, 0, 200)
                return Color.typedColor(0, 0, 0)
              },
              textProperty: "id",
              textSize: 4,
              textColor: Color.typedColor(200, 200, 200),
              turtlesSize: 5,
              turtlesShape: "bug"
            }
          }
        }
        anim={anim}
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
