// Generated with util/create-component.js
import React from "react";
import Agentscript from "./Agentscript";
import { Animator, TwoDraw } from "ts-agent";
import Model from '../models/AntsModel'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [model, setModel] = React.useState<typeof Model | undefined>();
  const [twoDraw, setTwoDraw] = React.useState<typeof TwoDraw | undefined>();
  const [anim, setAnim] = React.useState<typeof Animator | undefined>();
  const reset = () => {
    if(anim) {
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
            turtlesColor: 'blue',
            patchesColor: "black",
            turtlesSize: 5,
            turtlesShape: "bug"
          }
        }
      }
      animation={{
        step: 50,
        fps: 10,
      }}
      Model={Model}
      setModel={setModel}
      setTwoDraw={setTwoDraw}
      setAnim={setAnim}
    />
    <input type="button" value="reset" onClick={reset}/>
    <input type="button" value="toggle" onClick={() => {anim.toggle(); }}/>
    <input type="button" value="once" onClick={() => {anim.once(); }}/>
    </>
  )
}
