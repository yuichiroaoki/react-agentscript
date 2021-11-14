// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Agentscript from "./Agentscript";
import { AgentscriptProps } from "./Agentscript.types";

describe("Test Component", () => {
  let props: AgentscriptProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<Agentscript {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("Agentscript");

    expect(component).toHaveTextContent("harvey was here");
  });
});
