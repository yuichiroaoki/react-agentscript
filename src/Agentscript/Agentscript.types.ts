export interface IDrawOptions {
  patchesColor?: string | ((p: any) => void);
  initPatches?: (p: any) => void;
  turtlesColor?: string | ((t: any) => void);
  turtlesStrokeColor?: string;
  turtlesShape?: string | ((t: any) => void);
  turtlesSize?: number | ((t: any) => void);
  linksColor?: string;
  linksWidth?: number;
  //   textProperty?: null;
  textSize?: number | ((t: any) => void);
  textColor?: string | ((t: any) => void);
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
