let mySprite = sprites.create(img`
    1 1 1 1
    1 . . 1
    1 . . 1
    1 1 1 1
`, SpriteKind.Player)
let myMover = gridmove.create(mySprite)
myMover.setSpeed(50)
myMover.setPlayerControl(true)
myMover.setMode(gridmove.Mode.Continuous)

let emptyMover = gridmove.create(null)
emptyMover.update()
