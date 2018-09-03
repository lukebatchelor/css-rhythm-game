const fs = require('fs');
const path = require('path');


const outputPath = path.join(__dirname, 'dist', 'index.html');

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function createLevel(numElements = 40) {
  let curOffset = 0;
  let curDomStr = '\n';
  for (let i=0; i < numElements; i++) {
    const colNum = randBetween(1,4);
    curOffset += randBetween(1,5) * 50;
    curDomStr += `<input type="checkbox" class="hitbox col${colNum}" style="top: -${curOffset}px"></input>\n`;
  }
  return curDomStr;
}

const level = createLevel(400);

const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS Rhythm Game</title>
    <link href="../styles.css" rel="stylesheet"></head>
  </head>
  <body>
  <div class="app">
    <h1>CSS Rhythm Game</h1>
    <p>This game is built entirely out of HTML and CSS, no JavaScript™ at all!</p>
    <br><br>
    <form onSubmit="voi">
      <input type="radio" name="game-state" id="start" checked>
      <input type="radio" name="game-state" id="playing-easy">
      <input type="radio" name="game-state" id="playing-med">
      <input type="radio" name="game-state" id="playing-hard">
      <div id="game">
        <div class="startScreen">
          <h2>Rhythm Game!</h2>
          <p>Hit as many notes as you can, but only whilst they are in the strike zone!</p>
          <label for="playing-easy" class="playButton">Easy</label>
          <label for="playing-med" class="playButton">Medium</label>
          <label for="playing-hard" class="playButton">Hard!</label>
        </div>
        <div class="playingScreen">
          <div class="clickGuard"></div>
          <div class="level">
            ${level}
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
    <p>Check out <a href="https://github.com/lukebatchelor/css-rhythm-game">lukebatchelor/css-rhythm-game</a> if you're interested in how it works!</p>
  </div>
  <a href="https://github.com/lukebatchelor/css-rhythm-game"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
  </body>
  </html>
`;
console.log('Done!');
console.log('Writing to', outputPath);

fs.writeFileSync(outputPath, htmlTemplate);
console.log('Done!');
