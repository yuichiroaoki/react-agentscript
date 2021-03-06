import { Model, TwoDraw, Animator } from "ts-agent";

export interface IDrawOptions {
  patchesColor?: string | ((p: any) => void);
  initPatches?: (p: any) => void;
  turtlesColor?: string | ((t: any) => void);
  turtlesStrokeColor?: string;
  turtlesShape?: string | ((t: any) => void);
  turtlesSize?: number | ((t: any) => void);
  linksColor?: string;
  linksWidth?: number;
  textProperty?: null | string;
  textSize?: number | ((t: any) => void);
  textColor?: string | ((t: any) => void);
  patchesMap?: string;
  turtlesMap?: string;
}

interface IView {
  width: number;
  drawOptions?: IDrawOptions;
}

interface IAnimation {
  step: number;
  fps: number;
}

export interface AgentscriptProps {
  view: IView;
  animation: IAnimation;
  model: any;
  anim: Animator;
  setAnim: React.Dispatch<React.SetStateAction<Animator>>;
  reset: boolean;
}
