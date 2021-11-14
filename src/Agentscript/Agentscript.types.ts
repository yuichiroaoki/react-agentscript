interface IDrawOptions {
  patchesColor?: string;
  //   initPatches?: null;
  turtlesColor?: string;
  turtlesStrokeColor?: string;
  turtlesShape?: string;
  turtlesSize?: number;
  linksColor?: string;
  linksWidth?: number;
  //   textProperty?: null;
  textSize?: number;
  textColor?: string;
  patchesMap?: string;
  turtlesMap?: string;
}

interface IView {
  width: number;
  height: number;
  drawOptions?: IDrawOptions;
}

interface IAnimation {
  step: number;
  fps: number;
}

export interface AgentscriptProps {
  view: IView;
  animation: IAnimation;
  Model: any;
}
