// Generated with util/create-component.js
import React from "react";
import Agentscript from "./Agentscript";
import { Animator, TwoDraw } from "ts-agent";
import Model from '../models/AntsModel'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [model, setModel] = React.useState<any | undefined>();
  const [twoDraw, setTwoDraw] = React.useState<typeof TwoDraw | undefined>();
  const [anim, setAnim] = React.useState<any | undefined>();

  if (model) {
  console.log(model.patches)
  }

  const reset = () => {
    if (anim) {
      anim.reset();
    }
  }
  return (
    <>
      <Agentscript
        view={
          {
            width: 800, height: 600,
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
        setTwoDraw={setTwoDraw}
        setAnim={setAnim}
      />
      <input type="button" value="reset" onClick={reset} />
      <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
      <input type="button" value="once" onClick={() => { anim.once(); }} />
    </>
  )
}
