// import * as util from "../Agentscript/lib/agentscript/utils";
import { Model, World } from "ts-agent";

/**
 * Returns a random float in [min, max)
 *
 * @param {number} min The min float to return
 * @param {number} max The max float to return
 * @return {number} a float in [min, max)
 */
const randomFloat2 = (min, max) => min + Math.random() * (max - min);

/**
 * Return a random float centered around r, in [-r/2, r/2)
 * @param {number} r The center float
 * @return {number} a float in [-r/2, r/2)
 */
const randomCentered = (r) => randomFloat2(-r / 2, r / 2);

export default class AntsModel extends Model {
  population = 255;
  speed = 1.0;
  maxPheromone = 36;
  diffusionRate = 0.3;
  evaporationRate = 0.01;
  wiggleAngle = 30; // degrees
  foodX = (world) => world.minX + 6;
  foodY = () => 0;
  nestX = (world) => world.maxX - 6;
  nestY = () => 0;

  // ======================

  constructor(worldOptions = World.defaultOptions(40)) {
    super(worldOptions);
  }

  setup() {
    this.turtles.setDefault("atEdge", "bounce");
    this.setupPatches();
    this.setupTurtles();
  }
  /**
   * 全てのpatchにisNest, isFood, netPheromone, foodPheromoneというインスタンス変数を付与
   * isNest, isFoodの初期値はfalse
   * netPheromone, foodPheromoneの初期値は0
   * 巣と食べ物の範囲のpatchのisNest, isFoodはtrueに変更
   */
  setupPatches() {
    this.patches.ask((p) => {
      p.isNest = p.isFood = false;
      p.nestPheromone = p.foodPheromone = 0;
    });
    this.patches
      .patchRectXY(this.nestX(this.world), this.nestY(this.world), 3, 3)
      .ask((p) => {
        p.isNest = true;
      });
    this.patches
      .patchRectXY(this.foodX(this.world), this.foodY(this.world), 3, 3)
      .ask((p) => {
        p.isFood = true;
      });
  }
  setupTurtles() {
    // populationの数だけturtleを生成
    this.turtles.create(this.population, (t) => {
      t.setxy(this.nestX(this.world), this.nestY(this.world));

      // 巣にいるアリのフェロモンを最大にする
      this.resetTurtle(t, false); // sets t.pheromone to max
    });
  }
  resetTurtle(t, withFood) {
    t.carryingFood = withFood;
    t.pheromone = this.maxPheromone;
  }

  step() {
    this.updateTurtles();
    this.updatePatches();
  }
  updateTurtles() {
    this.turtles.ask((t) => {
      // this.ticksは時間
      if (t.id >= this.ticks) return; // slowly release ants

      // 動いているturtleに対するアクション
      this.wiggleUphill(t);
      this.dropPheromone(t);
    });
  }

  /**
   * それぞれのpatchの中でフェロモンの値が高いへ移動
   * @param {turtle} t
   */
  wiggleUphill(t) {
    // turtleが位置しているpatch
    const p = t.patch;

    // turtleが空間の端に来たとき反対方向へ進路変更
    if (p.isOnEdge()) {
      // t.rotate(Math.PI)
      t.rotate(180);
    } else {
      // Note: neighbors is an AgentArray who's inCone uses radians.
      // const nAhead = p.neighbors.inCone(p, 2, Math.PI, t.theta)
      // turtleが位置するpatchの半径２，前方180度の範囲内のagentを取得
      const nAhead = p.neighbors.inCone(p, 2, 180, t.heading);

      // 食べ物を担いでいる際は上記の範囲内のagentの巣の、そうでないときは食べ物のフェロモンを調べる
      const pheromone = t.carryingFood ? "nestPheromone" : "foodPheromone";
      // 周囲のagentでフェロモンの値が一番高いエージェントとその値を出す
      const [n, max] = nAhead.maxValOf(pheromone);
      // その最大値がある一定以上でそのエージェントの方へ向かう
      if (max > 0.001 / this.maxPheromone) t.face(n);
    }

    // wiggleAngleの範囲内（今回は30度、-15から15度）でランダムに回転する
    t.rotate(randomCentered(this.wiggleAngle));
    // this.speedの距離を進む
    t.forward(this.speed);
  }

  /**
   * フェロモンを落とす
   * @param {turtle} t
   */
  dropPheromone(t) {
    const p = t.patch;
    if ((!t.carryingFood && p.isFood) || (t.carryingFood && p.isNest)) {
      this.resetTurtle(t, !t.carryingFood);
    }
    const pheromone = t.carryingFood ? "foodPheromone" : "nestPheromone";
    // patchのフェロモンは１０％づつ増加
    p[pheromone] += 0.1 * t.pheromone;
    // turtleのフェロモンは１０％づつ減少
    t.pheromone *= 0.9;
  }

  updatePatches() {
    this.patches.diffuse("nestPheromone", this.diffusionRate);
    this.patches.diffuse("foodPheromone", this.diffusionRate);
    this.patches.ask((p) => {
      p.foodPheromone *= 1 - this.evaporationRate;
      p.nestPheromone *= 1 - this.evaporationRate;
    });
  }
}
