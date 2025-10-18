import { _decorator, Component, Collider2D, IPhysics2DContact, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColliderHandler')
export class ColliderHandler extends Component {

    onLoad() {
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
            collider.on('onCollisionStay', this.onCollisionStay, this);
            collider.on('onCollisionExit', this.onCollisionExit, this);
        }
    }

    onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('Collision started with', otherCollider.node.name);
    }

    onCollisionStay(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('Collision ongoing with', otherCollider.node.name);
    }

    onCollisionExit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('Collision ended with', otherCollider.node.name);
    }
}

