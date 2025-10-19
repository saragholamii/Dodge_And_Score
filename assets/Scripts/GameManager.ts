import { _decorator, Component, director, PhysicsSystem2D, EPhysics2DDrawFlags, Collider2D, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private score: number = 0;
    private static _instance: GameManager | null = null;

    public static get instance(): GameManager | null {
        return this._instance;
    }

    
    @property(RichText)
    richText: RichText = null;

    @property(RichText)
    gameOver: RichText = null;

    
    onLoad() {
        // Enable 2D physics and collision system
        GameManager._instance = this;

        const physics = PhysicsSystem2D.instance;
        physics.enable = true;

        this.richText.string = "0";

        // Optional: show collision outlines for debugging
        // physics.debugDrawFlags = EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass;
    }

    public addScore(score: number, collectable: Collider2D) {
        if(collectable.node.name.includes("bread"))
        {
            this.score += score;
            this.richText.string = this.score.toString();
            console.log(this.score);
        }
            
        else{
            this.pauseGame();
            this.gameOver.string = "GAME OVER!!"
            console.log("GAME OVER!!!")
        }


        // Delay to next frame so physics can finish contact resolution
        this.scheduleOnce(() => {
            collectable.node.destroy();
        }, 0);
    }

    pauseGame() {

        this.scheduleOnce(() => {
           director.pause();
        }, 1);
            
    }

    resumeGame() {
        director.resume();
    }



}
