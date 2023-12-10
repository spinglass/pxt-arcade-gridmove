//% weight=100 color=#0fbc11 icon="\uf0b2" block="GridMove"
//% groups='["Create", "Movement", "State"]'
namespace gridmove {
    export enum Direction {
        None,
        Stop,
        Up,
        Down,
        Left,
        Right,
    }

    export enum Mode {
        Step,
        WallStop,
        Continuous,
    }

    class MoverManager {
        _movers: Mover[]

        constructor() {
            this._movers = []
        }

        public init() {
            game.onUpdate(function () {
                const mm = getMoverManager()
                mm._movers.forEach(mover => mover.update())
            })
        }

        public createMover(sprite: Sprite): Mover {
            const mover = new Mover(sprite)
            this._movers.push(mover)
            return mover
        }
    }

    export class Mover {
        _sprite: Sprite
        _speed: number
        _playerControl: boolean
        _mode: Mode
        _request: Direction
        _freeze: boolean
        _x: number
        _y: number
        _vx: number
        _vy: number
        _loc: tiles.Location

        constructor(sprite: Sprite) {
            this._sprite = sprite;
            this._speed = 100
            this._playerControl = false
            this._mode = Mode.Step
            this._request = Direction.None
            this._freeze = false
            this._x = sprite ? sprite.x : 0
            this._y = sprite ? sprite.y : 0
        }

        public update() {
            if (!this._sprite || this._freeze) {
                return
            }
            
            this.updatePlayerControl()
            this.updateMovement()
        }

        private updatePlayerControl() {
            if (!this._playerControl) {
                return
            }

            if (this._mode == Mode.Step) {
                this._request = Direction.None
            }

            if (controller.up.isPressed()) {
                this._request = Direction.Up
            }
            if (controller.down.isPressed()) {
                this._request = Direction.Down
            }
            if (controller.left.isPressed()) {
                this._request = Direction.Left
            }
            if (controller.right.isPressed()) {
                this._request = Direction.Right
            }
        }

        private canMove(direction: CollisionDirection): boolean {
            if (this._mode != Mode.WallStop) {
                // Can't move in requested direction if there's a wall there
                const neighbor = this._loc.getNeighboringLocation(direction)
                if (neighbor) {
                    return !neighbor.isWall()
                }
            }
            return true
        }

        private updateMovement() {
            const tileSize = 16

            const x = this._sprite.x
            const y = this._sprite.y
            const vx = this._sprite.vx
            const vy = this._sprite.vy
            const lx = this._x
            const ly = this._y

            // Get the current tile
            this._loc = this._sprite.tilemapLocation()
            if (!this._loc) {
                return
            }
            const tx = this._loc.x
            const ty = this._loc.y

            // are we at mid point of the tile
            let midx = true
            let midy = true
            if (vx > 0) {
                midx = (lx < tx && x >= tx) // crossing tx
            } else if (vx < 0) {
                midx = (lx > tx && x <= tx) // crossing tx
            } else if (vy > 0) {
                midy = (ly < ty && y >= ty) // crossing ty
            } else if (vy < 0) {
                midy = (ly > ty && y <= ty) // crossing ty
            }

            const canStop = (this._mode == Mode.Step) || (this._request == Direction.Stop)

            // moving in x or middle of y
            if (vx != 0 || midy) {
                if (this._request == Direction.Right && this.canMove(CollisionDirection.Right)) {
                    this._sprite.vx = this._speed
                    this._sprite.vy = 0
                } if (this._request == Direction.Left && this.canMove(CollisionDirection.Left)) {
                    this._sprite.vx = -this._speed
                    this._sprite.vy = 0
                } else if (canStop && vx != 0 && midx) {
                    this._sprite.vx = 0
                    this._sprite.vy = 0
                }
            }
            // moving in y or middle of x
            if (vy != 0 || midx) {
                if (this._request == Direction.Up && this.canMove(CollisionDirection.Top)) {
                    this._sprite.vx = 0
                    this._sprite.vy = -this._speed
                } else if (this._request == Direction.Down && this.canMove(CollisionDirection.Bottom)) {
                    this._sprite.vx = 0
                    this._sprite.vy = this._speed
                } else if (canStop && vy != 0 && midy) {
                    this._sprite.vx = 0
                    this._sprite.vy = 0
                }
            }

            // ensure centered in non-moving direction(s)
            if (this._sprite.vx == 0) {
                this._sprite.x = tx
            }
            if (this._sprite.vy == 0) {
                this._sprite.y = ty
            }

            this._x = this._sprite.x
            this._y = this._sprite.y
            this._vx = this._sprite.vx
            this._vy = this._sprite.vy
        }

        //% group="State"
        //% blockSetVariable="myMover"
        //% blockCombine block="x"
        get x(): number {
            return this._x
        }

        //% group="State"
        //% blockSetVariable="myMover"
        //% blockCombine block="y"
        get y(): number {
            return this._y
        }

        //% group="State"
        //% blockSetVariable="myMover"
        //% blockCombine block="vx"
        get vx(): number {
            return this._vx
        }

        //% group="State"
        //% blockSetVariable="myMover"
        //% blockCombine block="vy"
        get vy(): number {
            return this._vy
        }
        
        //% blockId=gridmove_request_direction
        //% group="Movement" weight=100
        //% block="set $this request to $request"
        //% this.defl=myMover
        //% request.defl=Direction.None
        public setRequest(request: Direction) {
            this._request = request;
        }

        //% blockId=gridmove_set_speed
        //% group="Movement" weight=90
        //% block="set $this speed to $speed"
        //% this.defl=myMover
        //% speed.defl=100
        public setSpeed(speed: number) {
            this._speed = speed
        }

        //% blockId=gridmove_set_player_control
        //% group="Movement" weight=80
        //% block="set $this player control $enable"
        //% this.defl=myMover
        //% enable.defl=true
        //% enable.shadow=toggleOnOff
        public setPlayerControl(enable: boolean) {
            this._playerControl = enable
        }

        //% blockId=gridmove_set_mode
        //% group="Movement" weight=70
        //% block="set $this mode to $mode"
        //% this.defl=myMover
        //% mode.defl=Mode.Step
        public setMode(mode: Mode) {
            this._mode = mode
        }

        //% blockId=gridmove_set_freeze
        //% group="Movement" weight=60
        //% block="set $this freeze to %enable"
        //% this.defl=myMover
        //% enable.defl=true
        //% enable.shadow=toggleOnOff
        public setFreeze(enable: boolean) {
            this._freeze = enable
            if (this._sprite) {
                if (this._freeze) {
                    this._vx = this._sprite.vx
                    this._vy = this._sprite.vy
                    this._sprite.vx = 0
                    this._sprite.vy = 0
                } else {
                    this._sprite.vx = this._vx
                    this._sprite.vy = this._vy
                }
            }
        }

        //% blockId=gridmove_place
        //% group="Create" weight=90
        //% block="place $this on top of $loc"
        //% this.defl=myMover
        //% loc.shadow=mapgettile
        public place(loc: tiles.Location) {
            if (this._sprite)
            {
                tiles.placeOnTile(this._sprite, loc)
                this._sprite.vx = 0
                this._sprite.vy = 0
                this._x = this._sprite.x
                this._y = this._sprite.y
                this._vx = 0
                this._vy = 0
                this._request = Direction.None
                this._freeze = false
            }
        }

        //% blockId=gridmove_camera_follow
        //% group="Create" weight=80
        //% block="camera follow $this"
        //% this.defl=myMover
        public cameraFollow() {
            scene.cameraFollowSprite(this._sprite)
        }
    }

    //% blockId=gridmove_create
    //% group="Create" weight=100
    //% block="mover %img=screen_image_picker of kind %kind=spritekind"
    //% blockSetVariable=myMover
    export function create(img: Image, kind?: number): Mover {
        const mm = getMoverManager()
        const sprite = sprites.create(img, kind);
        return mm.createMover(sprite)
    }

    function getMoverManager(): MoverManager {
        let mm = game.currentScene().data.moverManager
        if (!mm) {
            mm = new MoverManager()
            mm.init()
            game.currentScene().data.moverManager = mm
        }
        return mm
    }
}
