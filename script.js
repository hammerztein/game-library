// DOM

// Library array
const gameLibrary = [];

// Game constructor
function Game(name, hours, completed) {
	this.name = name;
	this.hours = hours;
	this.completed = completed;
}

// Game prototype methods
Game.prototype.isCompleted = function () {
	this.completed = !this.completed;
};

const vidya = new Game('marvel midnight suns', '', true);
