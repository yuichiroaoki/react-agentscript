interface IView {
  width: number;
  height: number;
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
