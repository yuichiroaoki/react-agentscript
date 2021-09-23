import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.scss";

import * as util from '../agentscript/utils.js'
import TwoDraw from '../agentscript/TwoDraw.js'
import Animator from '../agentscript/Animator.js'
import Color from '../agentscript/Color.js'
import ColorMap from '../agentscript/ColorMap.js'
import Model from '../models/AntsModel'

const TestComponent: React.FC<TestComponentProps> = ({ heading, content }) => {
  // Define colors and colormaps
  const nestColor = Color.typedColor('yellow')
  const foodColor = Color.typedColor('blue')
  const nestColorMap = ColorMap.gradientColorMap(20, [
    'black',
    nestColor,
  ])
  const foodColorMap = ColorMap.gradientColorMap(20, [
    'black',
    foodColor,
  ])

  const drawOptions = {
    patchesColor: p => {
      if (p.isNest) return nestColor
      if (p.isFood) return foodColor
      // return p.foodPheromone > p.nestPheromone
      //   ? foodColorMap.scaleColor(p.foodPheromone, 0, 1)
      //   : nestColorMap.scaleColor(p.nestPheromone, 0, 1)
    },
    turtlesShape: 'bug',
    turtlesSize: 3,
    turtlesColor: t => (t.carryingFood ? nestColor : foodColor),
  }

const model = new Model()
// await model.startup()
model.setup()

// const view = new TwoDraw(model, {
//   div: 'modelDiv',
//   useSprites: true, // ant shape difficult to draw
//   width: 700,
//   drawOptions,
// })

// const anim = new Animator(
//   () => {
//     model.step()
//     view.draw()
//   },
//   500, // run 500 steps
//   30 // 30 fps
// )

// util.toWindow({ util, model, view, anim })

  return (
    <div data-testid="test-component" className="test-component">
      <h1 data-testid="test-component__heading" className="heading">
        {heading}
      </h1>
      <div data-testid="test-component__content">{content}</div>
      <div id="modelDiv"></div>
    </div>
  )
};

export default TestComponent;
