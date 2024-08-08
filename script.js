// DOM
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = modalContainer.querySelector('.close');
const addGameBtn = document.querySelector('#add-game');
const removeGamesBtn = document.querySelector('#remove-games');
const addGameForm = document.querySelector('.modal-form');
const addGameFormBtn = document.querySelector('.modal-form button');

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

// Functions
function openModal() {
	modalContainer.showModal();
}

function closeModal() {
	modalContainer.close();
	removeValidationClass();
}

// Add & Remove validation classes
function addValidationClass() {
	const requiredInputs = document.querySelector('.modal-input input[required]');
	requiredInputs.classList.add('validate');
}

function removeValidationClass() {
	const requiredInputs = document.querySelector('.modal-input input[required]');
	requiredInputs.classList.remove('validate');
}

// Event listeners
addGameBtn.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

addGameFormBtn.addEventListener('click', () => {
	addValidationClass();
});
