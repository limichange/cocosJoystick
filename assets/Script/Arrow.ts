const {ccclass, property} = cc._decorator;

@ccclass
export default class Arrow extends cc.Component {

  rotate: number = 0

  onMove(e) {
    this.rotate = - e.angle / Math.PI * 180
    this.node.rotation = this.rotate
    cc.log(this.rotate)
  }

  update() {

  }
}
