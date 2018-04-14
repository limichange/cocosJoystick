const {ccclass, property} = cc._decorator;

@ccclass
export default class Arrow extends cc.Component {

  rotate: number = 0
  direction: cc.Vec2 = cc.p(0, 0)
  power: 0

  onMove(e) {
    if (e.angle) {
      this.rotate = - e.angle
    }
    this.node.rotation = this.rotate
    this.direction = e.direction
    this.power = e.power
  }

  update() {
    if (this.power > 0) {
      let originPosition = this.node.getPosition()
      originPosition.addSelf(this.direction.mul(this.power * 4))
      this.node.setPosition(originPosition)
    }
  }
}
