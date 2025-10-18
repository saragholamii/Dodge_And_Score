import { _decorator, Component, Prefab, Node, instantiate, Vec3,screen } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export class Spawner extends Component {
    private static _instance: Spawner | null = null;

    public static get instance(): Spawner | null {
        return this._instance;
    }

    @property(Prefab)
    foodPrefab: Prefab = null!;

    @property(Prefab)
    bombPrefab: Prefab = null!;

    @property(Node)
    UnderPlayerParent: Node = null!;

    private timer: number = 0;
    private spawnInterval: number = 1.5;

    onLoad() {
        // ✅ Ensure singleton is set before other scripts use it
        Spawner._instance = this;
    }

    update(dt: number) {
        this.timer += dt;
        if (this.timer >= this.spawnInterval) {
            this.spawnObject();
            this.timer = 0;
        }
    }

    private spawnObject() {
        const isFood = Math.random() < 0.6;
        const prefab = isFood ? this.foodPrefab : this.bombPrefab;
        const obj = instantiate(prefab);

        obj.setPosition(this.node.worldPosition.x + screen.windowSize.width / 2 + 100, 0, 0)
        this.node.addChild(obj);
    }

    public setAnotherParent(spawnObject: Node) {
        if (this.UnderPlayerParent && spawnObject) {
            //this.UnderPlayerParent.addChild(spawnObject);
        }
    }
}
