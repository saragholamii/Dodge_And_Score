import { GameManager } from "./GameManager";

declare const cc: any;

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    @property
    moveSpeed: number = 300;

    @property
    upperLimit: number= 0;

    @property
    lowerLimit: number = 0;

    firstY: number = 0;

    private moveUp: boolean = false;
    private moveDown: boolean = false;
    private static _instance: Player | null = null;

    public static get instance(): Player | null {
        return this._instance;
    }

    onLoad() {
        Player._instance = this;

        // Register keyboard listeners
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.firstY = this.node.y;
    }

    onDestroy() {
        // Clean up listeners
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: any) {
        if (event.keyCode === cc.macro.KEY.w) {
            this.moveUp = true;
        } else if (event.keyCode === cc.macro.KEY.s) {
            this.moveDown = true;
        }
    }

    onKeyUp(event: any) {
        if (event.keyCode === cc.macro.KEY.w) {
            this.moveUp = false;
        } else if (event.keyCode === cc.macro.KEY.s) {
            this.moveDown = false;
        }
    }

    update(dt: number) {
        if (this.moveUp) {
            this.node.setPosition(this.node.position.x, Math.min(this.node.position.y + this.moveSpeed * dt,this.upperLimit), this.node.position.z);
        } else if (this.moveDown) {
            this.node.setPosition(this.node.position.x, Math.max(this.node.position.y - this.moveSpeed * dt,this.lowerLimit), this.node.position.z);
        }

    }

    onGetFood(food: any) {
        food.destroy();
        GameManager.instance.addScore(10);
    }
}
