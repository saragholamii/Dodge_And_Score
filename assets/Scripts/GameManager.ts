import { _decorator, Component, director, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private score: number = 0;
    private static _instance: GameManager | null = null;

    public static get instance(): GameManager | null {
        return this._instance;
    }

    onLoad() {
        // Enable 2D physics and collision system
        GameManager._instance = this;

        const physics = PhysicsSystem2D.instance;
        physics.enable = true;

        // Optional: show collision outlines for debugging
        // physics.debugDrawFlags = EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass;
    }

    addScore(score: number)
    {
        this.score += score;
        console.log(this.score);
    }



}
