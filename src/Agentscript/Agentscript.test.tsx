// Generated with util/create-component.js
import React from "react";
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
    const [model, setModel] = React.useState<typeof Model | undefined>();
    const [anim, setAnim] = React.useState<typeof Animator | undefined>();
    const reset = () => {
      if (anim) {
        anim.reset();
      }
    }
    return (
      <>
        <Agentscript
          view={view}
          animation={animation}
          Model={Model}
          setModel={setModel}
          setAnim={setAnim}
        />
        <input type="button" value="reset" onClick={reset} />
        <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
        <input type="button" value="once" onClick={() => { anim.once(); }} />
      </>
    )
  }

  it('renders without crashing', () => {
    () => render(<TestWithBar />);
  });
});
