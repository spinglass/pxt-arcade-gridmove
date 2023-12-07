let mySprite = sprites.create(img`
    1 1 1 1
    1 . . 1
    1 . . 1
    1 1 1 1
`, SpriteKind.Player)
let myMover = gridmove.create(mySprite)
