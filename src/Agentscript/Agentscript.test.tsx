// Generated with util/create-component.js
import React, { useState } from "react";
import { render } from "@testing-library/react";

import { Animator, TwoDraw } from "ts-agent";
import Agentscript from "./Agentscript";
import { AgentscriptProps } from "./Agentscript.types";

import Model from '../models/AntsModel'
describe("Test Component", () => {
  let props: AgentscriptProps;
  let view = {
    width: 800,
    drawOptions: {
      turtlesColor: "white",
      turtlesSize: 5,
      turtlesShape: "bug"
    }
  }

  let animation = {
    step: 50,
    fps: 30,
  }
  const TestWithBar = () => {
    const [anim, setAnim] = React.useState<typeof Animator | undefined>();
    const [reset, setReset] = useState<boolean>(false);
    return (
      <>
        <Agentscript
          view={view}
          animation={animation}
          Model={Model}
          reset={reset}
          setAnim={setAnim}
        />
        <button onClick={() => setReset(!reset)} >reset</button>
        <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
        <input type="button" value="once" onClick={() => { anim.once(); }} />
      </>
    )
  }

  it('renders without crashing', () => {
    () => render(<TestWithBar />);
  });
});
