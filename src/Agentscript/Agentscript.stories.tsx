// Generated with util/create-component.js
import React from "react";
import Agentscript from "./Agentscript";
import Animator from './lib/agentscript/Animator'
import Model from '../models/AntsModel'

export default {
  title: "Agentscript"
};

export const WithBar = () => {
  const [anim, setAnim] = React.useState<Animator | undefined>();
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
        fps: 30,
      }}
      Model={Model}
      anim={anim}
      setAnim={setAnim}
    />
    <input type="button" value="reset" onClick={() => {anim.reset(); }}/>
    <input type="button" value="toggle" onClick={() => {anim.toggle(); }}/>
    <input type="button" value="once" onClick={() => {anim.once(); }}/>
    </>
  )
}
