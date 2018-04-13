const { ccclass, property } = cc._decorator;

@ccclass
export default class Joystick extends cc.Component {

  @property(cc.Node)
  panel: cc.Node = null

  @property(cc.Node)
  controller: cc.Node = null

  @property([cc.Component.EventHandler])
  EventHandler: cc.Component.EventHandler = []

  angle: number = null
  power: number = 0
  radius: number = 0

  start() {
    this.radius = this.node.width / 2
    this.panel.on(cc.Node.EventType.TOUCH_START, this.onTouchMove, this)
    this.panel.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    this.panel.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }

  onTouchMove(e: cc.Event) {
    e.stopPropagation()
    this.setHandlePosition(e.touch.getLocation())
  }

  setHandlePosition(touchPosition: cc.Vec2) {
    let position = this.panel.convertToNodeSpaceAR(touchPosition)

    if (position.mag() > this.radius) {
      position.normalizeSelf().mulSelf(this.radius)
    }

    this.power = position.mag() / this.radius
    this.angle = position.angle(cc.p(0, 1))
    this.controller.setPosition(position)
  }

  onTouchEnd() {
    this.angle = null
    this.power = 0
    this.controller.setPosition(0, 0)
  }

  onDestroy() {
    this.panel.off(cc.Node.EventType.TOUCH_START, this.onTouchMove, this)
    this.panel.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.panel.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    this.panel.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }
}
