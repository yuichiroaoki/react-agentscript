// Generated with util/create-component.js
import React from "react";
import Agentscript from "./Agentscript";

import Model from '../models/AntsModel'

export default {
    title: "Agentscript"
};

export const WithBar = () => <Agentscript 
        view={
          { width: 800, height: 600 }
        }
        animation={{
          step: 50,
          fps: 30,
        }}
        Model={Model}
/>;
