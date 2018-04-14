const { ccclass, property } = cc._decorator;

@ccclass
export default class Joystick extends cc.Component {

  @property(cc.Node)
  panel: cc.Node = null

  @property(cc.Node)
  controller: cc.Node = null

  @property([cc.Component.EventHandler])
  moveEvents: cc.Component.EventHandler = []

  angle: number = null
  power: number = 0
  radius: number = 0
  direction: cc.Vec2 = cc.p(0, 0)

  start() {
    cc.log(cc.p(1,1).rotate(Math.PI * 0.5))
    this.name = 'joystick'
    this.radius = this.node.width / 2
    this.panel.on(cc.Node.EventType.TOUCH_START, this.onTouchMove, this)
    this.panel.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    this.panel.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }

  onTouchMove(e: cc.Event) {
    e.stopPropagation()
    this.setHandlePosition(e.touch.getLocation())
    cc.Component.EventHandler.emitEvents(this.moveEvents, this)
  }

  setHandlePosition(touchPosition: cc.Vec2) {
    let position = this.panel.convertToNodeSpaceAR(touchPosition)

    if (position.mag() > this.radius) {
      position.normalizeSelf().mulSelf(this.radius)
    }

    this.power = position.mag() / this.radius
    this.angle = Math.atan2(position.y, position.x) * 180 / Math.PI
    this.direction = position.normalize()
    this.controller.setPosition(position)
  }

  onTouchEnd() {
    this.angle = null
    this.power = 0
    this.direction = cc.p(0, 0)
    this.controller.setPosition(0, 0)
    cc.Component.EventHandler.emitEvents(this.moveEvents, this)
  }

  onDestroy() {
    this.panel.off(cc.Node.EventType.TOUCH_START, this.onTouchMove, this)
    this.panel.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.panel.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    this.panel.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }
}
