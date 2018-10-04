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
            <div class="streakBoard"></div>
          </div>
          <div class="hitboxIndicator col1"></div>
          <div class="hitboxIndicator col2"></div>
          <div class="hitboxIndicator col3"></div>
          <div class="hitboxIndicator col4"></div>
          <div class="scoreBoard"></div>
        </div>
        <div class="gameOverScreen">
          <h2>Game Over!</h2>
          <p id="game-over-score"></p>
          <br><br>
          <input type="reset" id="resetButton" class="playButton" value="Play Again!"></input>
        </div>
      </div>
    </form>
  </div>
  <a href="https://github.com/lukebatchelor/css-rhythm-game" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
  </body>
  </html>
`;
console.log('Done!');
console.log('Writing to', outputPath, `(${htmlTemplate.length/1000}Kb)`);

fs.writeFileSync(outputPath, htmlTemplate);
console.log('Done!');
