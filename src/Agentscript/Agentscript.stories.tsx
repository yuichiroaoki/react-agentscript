// Generated with util/create-component.js
import React, { useState } from "react";
import Agentscript from "./Agentscript";
import Model from '../models/AntsModel'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [anim, setAnim] = useState<any | undefined>();
  const [step, setStep] = useState<number>(40);
  const [fps, setFps] = useState<number>(10);

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
        Model={Model}
        setAnim={setAnim}
      />
      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />
      <input type="number" value={fps} onChange={e => setFps(Number(e.target.value))} />
      <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
      <input type="button" value="once" onClick={() => { anim.once(); }} />
    </>
  )
}
