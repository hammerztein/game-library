// Game library class
class Game {
	// Class field
	static id = 0;

	// Static method
	static assignId() {
		return ++this.id;
	}

	constructor(name, hours, platform, completed) {
		this.name = name;
		this.hours = hours;
		this.platform = platform;
		this.completed = completed;
		this.id = Game.assignId();
	}

	isCompleted() {
		this.completed = !this.completed;
	}
}

// Database IIFE
const Database = (() => {
	// Library array
	const gameLibrary = [];

	const getDatabase = () => gameLibrary;

	const addToDataBase = (object) => gameLibrary.push(object);

	const removeFromDatabase = (index) => {
		gameLibrary.splice(index, 1);
	};

	const removeAllFromDatabase = () => {
		gameLibrary.splice(0, gameLibrary.length);
	};

	return {
		getDatabase,
		addToDataBase,
		removeFromDatabase,
		removeAllFromDatabase,
	};
})();

// GUI IIFE
const displayController = (() => {
	// DOM
	const gameLibraryContainer = document.querySelector('.game-library');
	const modalContainer = document.querySelector('.modal-container');
	const closeModalBtn = modalContainer.querySelector('.close');
	const addGameBtn = document.querySelector('#add-game');
	const removeGamesBtn = document.querySelector('#remove-games');
	const addGameForm = document.querySelector('.modal-form');
	const addGameFormBtn = document.querySelector('.modal-form button');
	const filterBarBtn = document.querySelector('#show-filter');
	const filterBar = document.querySelector('.filter-bar');
	const completionFilter = filterBar.querySelector('#filter-completion');

	// Modal
	const openModal = () => {
		modalContainer.showModal();
	};

	const closeModal = () => {
		modalContainer.close();
		removeValidationClass();
		resetFormInputs();
	};

	// Add & Remove validation classes
	const addValidationClass = () => {
		const requiredInputs = document.querySelectorAll(
			'.modal-input:not(.checkbox) > *:nth-child(2)',
		);
		requiredInputs.forEach((input) => input.classList.add('validate'));
	};

	const removeValidationClass = () => {
		const requiredInputs = document.querySelectorAll(
			'.modal-input:not(.checkbox) > *:nth-child(2)',
		);
		requiredInputs.forEach((input) => input.classList.remove('validate'));
	};

	const toggleFilterBar = () => {
		filterBar.classList.toggle('hidden');
	};

	// Clean inputs
	const resetFormInputs = () => {
		addGameForm.reset();
	};

	const getUserInputs = () => {
		const gameName = addGameForm.querySelector('#game-name').value;
		const gameHours = addGameForm.querySelector('#game-hours').value || 0;
		const gamePlatform = addGameForm.querySelector('#game-platform').value;
		const gameCompleted = addGameForm.querySelector('#game-completion').checked;

		return { gameName, gameHours, gamePlatform, gameCompleted };
	};

	const renderNewCard = (object) => {
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
			displayStats();
		});

		card.append(cardTitle, cardBody);

		gameLibraryContainer.appendChild(card);
	};

	const addGameToLibrary = (event) => {
		// Prevent default form submission
		event.preventDefault();
		// Get user inputs
		const { gameName, gameHours, gamePlatform, gameCompleted } =
			getUserInputs();
		// Create new object
		const newGame = new Game(gameName, gameHours, gamePlatform, gameCompleted);
		// Add new game to the Database
		Database.addToDataBase(newGame);
		// Render object to the screen
		renderNewCard(newGame);
		// Display stats on filter bar
		displayStats();
		// Close modal on form submit
		closeModal();
	};

	const removeGameFromLibrary = (id) => {
		const database = Database.getDatabase();
		const gameIndex = database.findIndex((game) => game.id === id);
		Database.removeFromDatabase(gameIndex);
		displayStats();
	};

	const removeAllGamesFromLibrary = () => {
		Database.removeAllFromDatabase();
		gameLibraryContainer.innerText = '';
		displayStats();
	};

	const displayStats = () => {
		const totalGamesAddedEl = filterBar.querySelector('#total-added');
		const totalGamesCurrentEl = filterBar.querySelector('#total-current');
		const completedGamesEl = filterBar.querySelector('#games-completed');
		const notCompletedGamesEl = filterBar.querySelector('#games-not-completed');

		const database = Database.getDatabase();
		const totalGames = Game.id;
		const totalGamesCurrent = database.length;
		const completedGames = database.filter(
			(game) => game.completed === true,
		).length;
		const notCompletedGames = database.filter(
			(game) => game.completed === false,
		).length;

		totalGamesAddedEl.textContent = totalGames;
		totalGamesCurrentEl.textContent = totalGamesCurrent;
		completedGamesEl.textContent = completedGames;
		notCompletedGamesEl.textContent = notCompletedGames;
	};

	const filterGamesByStatus = (status) => {
		const cards = document.querySelectorAll('.card');

		cards.forEach((card) => {
			const gameStatus = card.querySelector("input[type='checkbox']").checked;
			// Hide card
			card.style.display = 'none';
			// Display card on a condition
			if (status === 'all') {
				card.style.display = 'grid';
			}

			if (status === 'completed' && gameStatus) {
				card.style.display = 'grid';
			}

			if (status === 'not-completed' && !gameStatus) {
				card.style.display = 'grid';
			}
		});
	};

	const attachEventHandlers = () => {
		// Event listeners
		addGameBtn.addEventListener('click', openModal);

		closeModalBtn.addEventListener('click', closeModal);

		addGameFormBtn.addEventListener('click', () => {
			addValidationClass();
		});

		addGameForm.addEventListener('submit', addGameToLibrary);

		removeGamesBtn.addEventListener('click', removeAllGamesFromLibrary);

		filterBarBtn.addEventListener('click', toggleFilterBar);

		completionFilter.addEventListener('change', (e) => {
			const filter = e.target.value;
			filterGamesByStatus(filter);
		});
	};
	attachEventHandlers();
})();
