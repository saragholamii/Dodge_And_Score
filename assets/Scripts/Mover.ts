import { _decorator, Component, Node, screen } from 'cc';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('Mover')
export class Mover extends Component {
    @property
    speed: number = 200;

    update(dt: number) {
        const pos = this.node.position;
        this.node.setPosition(pos.x - this.speed * dt, pos.y, pos.z);

        if (pos.x < 0) {
            const spawner = Spawner.instance;
            if (spawner) {
                spawner.setAnotherParent(this.node);
            } else {
                console.warn('Spawner.instance is null — did you put the Spawner script in the scene?');
            }
        }

        if (pos.x < -screen.windowSize.width - 100) {
            this.node.destroy();
        }
    }
}
