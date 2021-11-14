// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Agentscript from "./Agentscript";
import { AgentscriptProps } from "./Agentscript.types";

import Model from '../models/AntsModel'
describe("Test Component", () => {
  let props: AgentscriptProps;

  beforeEach(() => {
    props = {
      view: {
        width: 800, height: 600,
        drawOptions: {
          turtlesColor: "white",
          turtlesSize: 5,
          turtlesShape: "bug"
        }
      },
      animation: {
        step: 50,
        fps: 30,
      },
      Model: Model
    }
  });


  it("renders without crashing", () => {
    () => render(<Agentscript {...props} />);
  });
});
