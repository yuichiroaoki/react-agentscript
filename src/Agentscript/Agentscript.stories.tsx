// Generated with util/create-component.js
import React, { useState } from "react";
import Agentscript from "./Agentscript";
import Model from '../models/AntsModel'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [model, setModel] = useState<any | undefined>();
  const [anim, setAnim] = useState<any | undefined>();

  if (model) {
  console.log(model.patches)
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
          step: 300,
          fps: 30,
        }}
        Model={Model}
        setModel={setModel}
        setAnim={setAnim}
      />
      <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
      <input type="button" value="once" onClick={() => { anim.once(); }} />
    </>
  )
}
