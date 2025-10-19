import { _decorator, Component, Collider2D, IPhysics2DContact, BoxCollider2D, Contact2DType, PhysicsSystem2D } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('ColliderHandler')
export class ColliderHandler extends Component {

    onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // // Registering global contact callback functions
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        // }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        GameManager.instance.addScore(20, otherCollider);
    }
    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called once when the contact between two colliders just about to end.
    //     console.log('onEndContact');
    // }


    // onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called every time collider contact should be resolved
    //     console.log('onPreSolve');
    // }
    // onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called every time collider contact should be resolved
    //     console.log('onPostSolve');
    // }
}

