// DOM
const gameLibraryContainer = document.querySelector('.game-library');
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = modalContainer.querySelector('.close');
const addGameBtn = document.querySelector('#add-game');
const removeGamesBtn = document.querySelector('#remove-games');
const addGameForm = document.querySelector('.modal-form');
const addGameFormBtn = document.querySelector('.modal-form button');

// Library array
const gameLibrary = [];

// Game constructor
function Game(name, hours, platform, completed) {
	this.name = name;
	this.hours = hours;
	this.platform = platform;
	this.completed = completed;
	this.id = Game.assignId();
}

// Static property of Game constructor
Game.id = 0;

// Static method of Game constructor
Game.assignId = function () {
	return ++Game.id;
};

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
	const requiredInputs = document.querySelectorAll(
		'.modal-input:not(.checkbox) > *:nth-child(2)',
	);
	requiredInputs.forEach((input) => input.classList.add('validate'));
}

function removeValidationClass() {
	const requiredInputs = document.querySelectorAll(
		'.modal-input:not(.checkbox) > *:nth-child(2)',
	);
	requiredInputs.forEach((input) => input.classList.remove('validate'));
}

// Clean inputs
function resetFormInputs() {
	addGameForm.reset();
}

function getUserInputs() {
	const gameName = addGameForm.querySelector('#game-name').value;
	const gameHours = addGameForm.querySelector('#game-hours').value || 0;
	const gamePlatform = addGameForm.querySelector('#game-platform').value;
	const gameCompleted = addGameForm.querySelector('#game-completion').checked;

	return { gameName, gameHours, gamePlatform, gameCompleted };
}

function renderNewCard(object) {
	const card = document.createElement('article');
	card.className = 'card';

	const cardTitle = document.createElement('div');
	const platform = document.createElement('h3');
	const platformIcon = document.createElement('span');
	const removeBtn = document.createElement('span');
	const cardBody = document.createElement('div');
	const gameTitle = document.createElement('h4');
	const gameHoursContainer = document.createElement('p');
	const gameHours = document.createElement('span');
	const completionContainer = document.createElement('div');
	const completionLabel = document.createElement('label');
	const completionCheckbox = document.createElement('input');

	cardTitle.className = 'card-title';
	platform.textContent = `${object.platform} Game`;
	platformIcon.className = object.platform.toLowerCase();
	removeBtn.className = 'close';
	cardBody.className = 'card-body';
	gameTitle.id = 'game-title';
	gameTitle.textContent = object.name;
	gameHoursContainer.textContent = 'Hours Played ';
	gameHours.id = 'game-hours';
	gameHours.textContent = `${object.hours}H`;
	completionContainer.className = 'checkbox-container';
	completionLabel.htmlFor = `game-status-${object.id}`;
	completionLabel.textContent = 'Completed:';
	completionCheckbox.name = `game-status-${object.id}`;
	completionCheckbox.type = 'checkbox';
	completionCheckbox.id = `game-status-${object.id}`;
	completionCheckbox.checked = object.completed;

	platform.prepend(platformIcon);
	cardTitle.append(platform, removeBtn);
	gameHoursContainer.appendChild(gameHours);
	completionContainer.append(completionLabel, completionCheckbox);
	cardBody.append(gameTitle, gameHoursContainer, completionContainer);

	// Remove element
	removeBtn.addEventListener('click', () => {
		card.remove();
		removeGameFromLibrary(object.id);
	});

	// Change completions status
	completionCheckbox.addEventListener('click', () => {
		object.isCompleted();
	});

	card.append(cardTitle, cardBody);

	gameLibraryContainer.appendChild(card);
}

function addGameToLibrary(event) {
	// Prevent default form submission
	event.preventDefault();
	// Get user inputs
	const { gameName, gameHours, gamePlatform, gameCompleted } = getUserInputs();
	// Create new object
	const newGame = new Game(gameName, gameHours, gamePlatform, gameCompleted);
	// Add object ot the library array
	gameLibrary.push(newGame);
	// Render object to the screen
	renderNewCard(newGame);
	// Close modal on form submit
	closeModal();
}

function removeGameFromLibrary(id) {
	const gameIndex = gameLibrary.findIndex((game) => game.id === id);
	gameLibrary.splice(gameIndex, 1);
}

function removeAllGamesFromLibrary() {
	gameLibrary.splice(0, gameLibrary.length);
	gameLibraryContainer.innerText = '';
}

// Event listeners
addGameBtn.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

addGameFormBtn.addEventListener('click', () => {
	addValidationClass();
});

addGameForm.addEventListener('submit', addGameToLibrary);

removeGamesBtn.addEventListener('click', removeAllGamesFromLibrary);

// Helper event listener to display game library array
document.addEventListener('keyup', (event) => {
	if (event.key === 'p') {
		console.log(gameLibrary);
	}
});
