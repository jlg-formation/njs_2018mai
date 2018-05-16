const progressionBar = {};

const total = 40;


const draw = (percent) => {
    const equalsNbr = Math.floor(percent * (total / 100));
    const string = new Array(equalsNbr).fill('=').join('');
    process.stdout.clearLine(); // clear current text
    process.stdout.cursorTo(0); // move cursor to beginning of line
    process.stdout.write(string); // write text
};

progressionBar.draw = draw;

module.exports = progressionBar;
