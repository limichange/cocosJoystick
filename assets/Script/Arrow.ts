const {ccclass, property} = cc._decorator;

@ccclass
export default class Arrow extends cc.Component {

  rotate: number = 0
  direction: cc.Vec2 = cc.p(0, 0)

  onMove(e) {
    this.rotate = e.angle
    this.node.rotation = this.rotate
    this.direction = e.direction
  }

  update() {
    let originPosition = this.node.getPosition()
    originPosition.addSelf(this.direction.mul(2))
    this.node.setPosition(originPosition)
  }
}
