const fs = require('fs');
const path = require('path');


const outputPath = path.join(__dirname, 'dist', 'max-streak-rules.css');
const MAX_STREAK = 60;
let maxStreakRules = '.maxStreakBoard::after {content: "Max streak: 0x";}\n';

console.log(`Generating ${MAX_STREAK} CSS rules for max streak`);

// Hardcoded for now, but 60 is the max score you can get currently
for (let i =0; i < MAX_STREAK; i++) {
  maxStreakRules += `.hitbox:checked ${'+ .hitbox:checked '.repeat(i)}~ .maxStreakBoard::after {content: "Max streak: ${i + 1}x";}\n`
}

fs.writeFileSync(outputPath, maxStreakRules);

console.log('Done');
console.log(`${maxStreakRules.length/1000} Kb`);