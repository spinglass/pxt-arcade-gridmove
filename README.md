 


> Open this page at [https://spinglass.github.io/pxt-arcade-gridmove/](https://spinglass.github.io/pxt-arcade-gridmove/)

## Blocks 

### Create

#### ``create``

Allow Grid Move to control a Sprite

```blocks
let myMover = gridmove.create(img`
    1 1 1 1
    1 . . 1
    1 . . 1
    1 1 1 1
`, SpriteKind.Player)
```

#### ``place``

Reset the mover on a tile location.

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.place(tiles.getTileLocation(1, 1))
```

#### ``cameraFollow``

Set the scene camera to follow the myMover

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.cameraFollow()
```

### Movement

#### ``setPlayerControl``

Enable or disable control of the mover with buttons.

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.setPlayerControl(true)
```

#### ``setSpeed``

Set the speed for a mover when not stopped.

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.setSpeed(100)
```

#### ``setMode``

Determine how the mover behaves
- _Step_ : moves one grid square at a time, unless a direction is held
- _Continuous_ : only stops when direction of travel is blocked
- _WallStop_ : like continuous, except the user can turn into a wall to stop

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.setMode(gridmove.Mode.Step)
```

#### ``setFreeze``

Immediately pause or unpause the mover.

```blocks
// @hide
let myMover = gridmove.create(img`
    1
`, SpriteKind.Player)
myMover.setFreeze(true)
```

## Use as Extension ![MakeCode Arcade Release](https://github.com/spinglass/pxt-arcade-gridmove/actions/workflows/makecode-release.yml/badge.svg)

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/spinglass/pxt-arcade-gridmove** and import

## Edit this project ![Build status badge](https://github.com/spinglass/pxt-arcade-gridmove/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/spinglass/pxt-arcade-gridmove** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
