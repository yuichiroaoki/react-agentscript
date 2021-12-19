// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import { render } from "@testing-library/react";
import { Animator } from "ts-agent";
import Agentscript from "./Agentscript";
import Model from '../models/AntsModel'
import { Settings } from "../components/Settings";

describe("Test Component", () => {
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
          view={view}
          animation={animation}
          model={model}
          reset={reset}
          setAnim={setAnim}
        />
        <button onClick={handleReset}>reset</button>
        <input type="button" value="toggle" onClick={() => { anim.toggle(); }} />
        <input type="button" value="once" onClick={() => { anim.once(); }} />
        <Settings updateModel={updateModel} step={step} fps={fps} setStep={setStep} setFps={setFps} />
      </>
    )
  }

  it('renders without crashing', () => {
    () => render(<TestWithBar />);
  });
});
