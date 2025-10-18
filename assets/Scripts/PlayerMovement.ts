import { _decorator, Component, Vec3, input, Input, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property
    speed: number = 200; // pixels per second

    private keysPressed: Set<KeyCode> = new Set();

    onLoad() {
        // Listen to key down
        input.on(Input.EventType.KEY_DOWN, (event) => {
            this.keysPressed.add(event.keyCode);
        }, this);

        // Listen to key up
        input.on(Input.EventType.KEY_UP, (event) => {
            this.keysPressed.delete(event.keyCode);
        }, this);
    }

    update(deltaTime: number) {
        let direction = new Vec3();

        if (this.keysPressed.has(KeyCode.ARROW_UP)) direction.y += 1;
        if (this.keysPressed.has(KeyCode.ARROW_DOWN)) direction.y -= 1;
        if (this.keysPressed.has(KeyCode.ARROW_LEFT)) direction.x -= 1;
        if (this.keysPressed.has(KeyCode.ARROW_RIGHT)) direction.x += 1;

        if (direction.length() > 0) {
            direction.normalize();
            this.node.setPosition(
                this.node.position.x + direction.x * this.speed * deltaTime,
                this.node.position.y + direction.y * this.speed * deltaTime,
                this.node.position.z
            );
        }
    }
}

