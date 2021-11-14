import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.scss";
import Agentscript from "./Agentscript";

import Model from '../models/AntsModel'

const TestComponent: React.FC<TestComponentProps> = ({ heading, content }) => {
  return (
    <div data-testid="test-component" className="test-component">
      <h1 data-testid="test-component__heading" className="heading">
        {heading}
      </h1>
      <div data-testid="test-component__content">{content}</div>
      <Agentscript
        view={
          { width: 800, height: 600 }
        }
        animation={{
          step: 50,
          fps: 30,
        }}
        Model={Model}
      />
    </div>
  )
};

export default TestComponent;
