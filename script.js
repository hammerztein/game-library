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

// Open & Close modal
function openModal() {
	modalContainer.showModal();
}

function closeModal() {
	modalContainer.close();
	removeValidationClass();
	resetFormInputs();
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

// Clean inputs
function resetFormInputs() {
	const formInputs = document.querySelectorAll(
		'.modal-input:not(.checkbox) input',
	);
	const formCheckbox = document.querySelector('.modal-input.checkbox input');

	formInputs.forEach((input) => (input.value = ''));
	formCheckbox.checked = false;
}

// Event listeners
addGameBtn.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

addGameFormBtn.addEventListener('click', () => {
	addValidationClass();
});
