# CSS Rhythm Game

A super simple "rhythm" game (with no sound) built entirely out of HTML and CSS (no Javascript at all!).

![Example Gameplay](./gameplay.gif)

> **Important note:** This game works best on mobiles or by having dev tools open with mobile emulation turned on. This is because click events on moving targets are treated very differently to touch events and make the game pretty much unplayable.

## Why?

I've been building a series of these silly experiments to explore what is possible using only CSS on a page.

It's a fun experiment, trying to build features into something when you have a ton of restrictions. It forced me to learn a little about CSS, but mostly, this is just for fun, to show that it's possible.

## How does it work?

This experiment is actually very simple, even compared to some of my older ones.

### Game menus

The menus work similarly to [CSS](https://github.com/lukebatchelor/css-tic-tac-toe) and [Binary Decoder](https://github.com/lukebatchelor/css-binary-decoder) experiments. There are a set of radio buttons representing the current "state".

```html
<input type="radio" name="game-state" id="start" checked>
<input type="radio" name="game-state" id="playing-easy">
<input type="radio" name="game-state" id="playing-med">
<input type="radio" name="game-state" id="playing-hard">
```

Only one can be selected at a time, and we use these to decide which screen to show

```less
.startScreen, .playingScreen, .gameOverScreen {
  display: none;
}
#start:checked ~ #game .startScreen {
  display: flex;
}
#playing-easy:checked ~ #game .playingScreen {
  display: block;
  // The delay time here changes depending on if easy, medium or hard mode
  animation: hide 0.1s linear 45s forwards;
}
#playing-easy:checked ~ #game .gameOverScreen {
  display: flex;
  opacity: 0;
  // Delay showing the gameover screen until the same amount of time as the play time above
  animation: show 0.1s linear 45s forwards;
}
```

### The game loop

The playing screens are also simple. We have a `clickGuard` class that sits over the
top of everything and prevents clicks from reaching the `hitBoxes`.

Then a `level` which we apply the playing animation, simply translating itself downwards over a
pre-determined amount of time.

Inside `level` is a series of `hitoxes` (styled checkboxes) that are generated at random top offsets.

```html
<div class="playingScreen">
  <div class="clickGuard"></div>
  <div class="level">
    <input type="checkbox" class="hitbox col3" style="top: -200px"></input>
    <input type="checkbox" class="hitbox col3" style="top: -300px"></input>
    <input type="checkbox" class="hitbox col4" style="top: -450px"></input>
    <!-- ... -->
  </div>
  <div class="hitboxIndicator col1"></div>
  <div class="hitboxIndicator col2"></div>
  <div class="hitboxIndicator col3"></div>
  <div class="hitboxIndicator col4"></div>
  <div class="scoreBoard"></div>
  <div class="streakBoard"></div>
</div>
```

At the bottom you'll see the  `hitboxIndicator`s, `scoreBoard` and `streakBoard`. They
are the static parts of the game for showing where you can click, and for displaying score/streaks.

### Keeping track of the score and streaks

Scores and streaks are implemented using [CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters). The logic for these is below.

```less
#game {
  // ...hidden for brevity
  counter-reset: score streak;
}

.hitbox:checked {
  counter-increment: score;  // Increase our score counter
  pointer-events: none;      // Don't let us uncheck a checked box
  animation: hitAnim 0.3s;
}

// Each time we miss a box, then hit the next one, restart our streak counter
// because we must have missed one
.hitbox:first-of-type:checked,
.hitbox:not(:checked) + .hitbox:checked {
  counter-reset: streak;
  counter-increment: score streak;
}
// Since it resets every time we miss one and start a new streak, we simply
// increment every time we have two checked boxes in a row
.hitbox:checked + .hitbox:checked {
  // Note: We must increment BOTH counters here as this rule will trump the
  // normal score incrementing
  counter-increment: score streak;
}

// Displaying our score
.scoreBoard::after {
  display: block;
  content: "Score: " counter(score);
}
// Displaying our streak
.streakBoard::after {
  display: block;
  content: "Streak: " counter(streak) "x";
}
```

### Randomness of the notes

The set of notes you'll see when playing is generated random every time the site is built and deployed, but from then on is static.

We still manage to make the game feel random by doing a little trick on the first screen. What looks like 1 `Play!` button, is actually
4 play buttons stacked on top of each other with an animation that makes them invisible at different times to each other.

```html
<div class="levelSelectButtons">
  <label for="level-1" class="playButton b1">Play!</label>
  <label for="level-2" class="playButton b2">&nbsp;</label>
  <label for="level-3" class="playButton b3">&nbsp;</label>
  <label for="level-4" class="playButton b4">&nbsp;</label>
</div>
```

The first one is always visible, the others are set to loop animations, but out of sync with each other

```less
.levelSelectButtons .playButton {
  margin-left: -80px;
  width: 80px;
  position: absolute;
  left: 190px;
}

// We debliberately don't animate the "bottom" button so that it is always visible underneath
// to prevent any flashing of text
// .levelSelectButtons .playButton[for="level-1"] {
//     animation: toggleVisible 2s steps(1, end) 0.5s infinite;
// }
.levelSelectButtons .playButton[for="level-2"] {
  animation: toggleVisible 2s steps(1, end) 0.5s infinite;
  opacity: 0;
  pointer-events: none;
}
.levelSelectButtons .playButton[for="level-3"] {
  animation: toggleVisible 2s steps(1, end) 1s infinite;
  opacity: 0;
  pointer-events: none;
}
.levelSelectButtons .playButton[for="level-4"] {
  animation: toggleVisible 2s steps(1, end) 1.5s infinite;
  opacity: 0;
  pointer-events: none;
}
```

Each of those buttons are labels for more radio buttons that control which level to display. A `hitBox` will always have a
class of `level1`, `level2`, `level3` or `level4`, so each one of the radios makes 1/4 of the notes visible.

```less
#level-1:checked ~ #game .level1 { display: initial; }
#level-2:checked ~ #game .level2 { display: initial; }
#level-3:checked ~ #game .level3 { display: initial; }
#level-4:checked ~ #game .level4 { display: initial; }
```

If you want to see this trick in action, try adding [#debug](https://css-ddr.netlify.com/#debug) to the end of the url!

### Debug screen

This is a pretty simple one, but is useful for showing how the game works! We simply have an element with an `id` of `debug` and we can
select that with the `:target` pseudo-selector

```less
#debug:target ~ [name="game-state-level"]{
  display: block;

  &::after {
    content: attr(name) " " attr(id);
    display: inline-block;
    width: 150px;
  }
}
```

### Game over screen

Similar to all the above, the `gameOverScreen` has elements we can select to
write our counters to, and a reset button to restart the game. This works by clearing
the whole form the game is inside of and returning us to the first menu.

```html
<div class="gameOverScreen">
  <h2>Game Over!</h2>
  <p id="game-over-score"></p>
  <p id="game-over-streak"></p>
  <input type="reset" id="resetButton" class="playButton" value="Play Again!"></input>
</div>
```

We use a couple of animations to switch between the `gameScreen` and the `gameOverScreen` but they're super messy at the moment.

### Storing Max Streaks

Finally, the `maxStreak` feature is done very hackily. There's no way we can use counters to solve this problem
without the ability to "reset" them back to a specific value.

The trick to this ended up being generating `60` CSS rules that cover every possible `maxStreak` you can get!

```less
.maxStreakBoard::after {content: "Max streak: 0x";}
.hitbox:checked ~ .maxStreakBoard::after {content: "Max streak: 1x";}
.hitbox:checked + .hitbox:checked ~ .maxStreakBoard::after {content: "Max streak: 2x";}
// ...
```

The really cool part about this is it doesn't interfere with the current counters and because each rule gets more and more specific, they automatically trump each other correctly!


## Future ideas

**Perspective shift**

I played with the idea of doing a Guitar Hero style perspective shift so that the notes appear to be coming out of a vanishing point as they come towards you. I ran into some issues with it, but this should 100% be achievable.

**High Score**

*Some* way of storing the high score between games. So far I have no ideas. We can't use counters and we can't use the same trick as maxStreak without some sort of extra logic for knowing which game's score to show. Even then it would mean refactoring how random games and resetting works...

**Theme Picker**

I don't think this is the most *useful* feature, but it's one more interesting thing that could be tacked on quite easily.

We can display an "Options" button on the first screen that is a link to `#options`. We can use the `:target` pseudo selector to then
show a screen that lets the user pick between different background patterns for the game and a button to go back to the main screen.

## Thanks

* [github-corners](https://github.com/tholman/github-corners) by tholman used under [MIT](https://github.com/tholman/github-corners/blob/master/license.md) license
* [material-design-icons](https://github.com/google/material-design-icons) by Google used under [Apache](https://github.com/google/material-design-icons/blob/master/LICENSE) license