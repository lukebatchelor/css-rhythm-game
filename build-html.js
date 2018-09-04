const fs = require('fs');
const path = require('path');


const outputPath = path.join(__dirname, 'dist', 'index.html');

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function createLevel(levelNum) {
  let curOffset = 0;
  let curDomStr = '\n';
  while (curOffset < 9000) {
    const colNum = randBetween(1,4);
    curOffset += randBetween(1,5) * 50;
    curDomStr += `<input type="checkbox" class="hitbox col${colNum} level${levelNum}" style="top: -${curOffset}px"></input>\n`;
  }
  return curDomStr;
}

console.log('Generating random level...');

const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS Rhythm Game</title>
    <link href="./styles.css" rel="stylesheet"></head>
    <link href="./max-streak-rules.css" rel="stylesheet"></head>
  </head>
  <body>
  <div class="app">
    <h1>CSS Rhythm Game</h1>
    <p>This game is built entirely out of HTML and CSS, no JavaScript™ at all!</p>
    <br><br>
    <form onSubmit="voi">
      <input type="radio" name="debug" id="debug">
      <input type="radio" name="game-state" id="start" checked>
      <input type="radio" name="game-state" id="playing-easy">
      <input type="radio" name="game-state" id="playing-med">
      <input type="radio" name="game-state" id="playing-hard">
      <input type="radio" name="game-state-level" id="level-1">
      <input type="radio" name="game-state-level" id="level-2">
      <input type="radio" name="game-state-level" id="level-3">
      <input type="radio" name="game-state-level" id="level-4">
      <div id="game">
        <div class="startScreen">
          <h2>Rhythm Game!</h2>
          <p>Hit as many notes as you can, but only whilst they are in the strike zone!</p>
          <div class="levelSelectButtons">
            <label for="level-1" class="playButton b1">Play!</label>
            <label for="level-2" class="playButton b2">&nbsp;</label>
            <label for="level-3" class="playButton b3">&nbsp;</label>
            <label for="level-4" class="playButton b4">&nbsp;</label>
          </div>
          <div class="difficultySelectButtons">
            <label for="playing-easy" class="playButton">Easy</label>
            <label for="playing-med" class="playButton">Medium</label>
            <label for="playing-hard" class="playButton">Hard!</label>
          </div>
        </div>
        <div class="playingScreen">
          <div class="clickGuard"></div>
          <div class="level">
            ${createLevel(1)}
            ${createLevel(2)}
            ${createLevel(3)}
            ${createLevel(4)}
            <div class="maxStreakBoard"></div>
          </div>
          <div class="hitboxIndicator col1"></div>
          <div class="hitboxIndicator col2"></div>
          <div class="hitboxIndicator col3"></div>
          <div class="hitboxIndicator col4"></div>
          <div class="scoreBoard"></div>
          <div class="streakBoard"></div>
        </div>
        <div class="gameOverScreen">
          <h2>Game Over!</h2>
          <p id="game-over-score"></p>
          <p id="game-over-streak"></p>
          <input type="reset" id="resetButton" class="playButton" value="Play Again!"></input>
        </div>
      </div>
    </form>
  </div>
  <a href="https://github.com/lukebatchelor/css-rhythm-game"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
  </body>
  </html>
`;
console.log('Done!');
console.log('Writing to', outputPath, `(${htmlTemplate.length/1000}Kb)`);

fs.writeFileSync(outputPath, htmlTemplate);
console.log('Done!');
