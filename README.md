 


> Open this page at [https://spinglass.github.io/pxt-arcade-gridmove/](https://spinglass.github.io/pxt-arcade-gridmove/)

## Usage 

### ``create``

Use the ``create`` block to allow Grid Move to control a Sprite

```block
let mySprite = sprites.create(img`
    1 1 1 1
    1 . . 1
    1 . . 1
    1 1 1 1
`, SpriteKind.Player)
let myMover = gridmove.create(mySprite)
```

### ``speed``

Use the ``speed`` block to set the speed for a mover

```block
// @hide
let mySprite = sprites.create(img`
    .
`, SpriteKind.Player)

// @hide
let myMover = gridmove.create(mySprite)

myMover.speed(0)
```

## Use as Extension [![MakeCode Arcade Release](https://github.com/spinglass/pxt-arcade-gridmove/actions/workflows/makecode-release.yml/badge.svg)](https://github.com/spinglass/pxt-arcade-gridmove/actions/workflows/makecode-release.yml)

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
