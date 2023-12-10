let myMover = gridmove.create(img`
    1 1 1 1
    1 . . 1
    1 . . 1
    1 1 1 1
`, SpriteKind.Player)
myMover.setSpeed(50)
myMover.setPlayerControl(true)
myMover.setMode(gridmove.Mode.Continuous)
