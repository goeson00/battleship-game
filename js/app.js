(function init() {
    
    const guessForm = document.querySelector(".guess-form"),
    shotStatusContainer = document.querySelector(".shot-status-container"),
    statusCloseBtn = document.querySelector(".btn-status-close"),
    guessFormField = document.querySelector(".guess-form-field");
    
    model = new Model(7, 3, 3),
    controller = new Controller(model);

    guessFormField.addEventListener("input", handleGuessTyping);
    guessForm.addEventListener("submit", handleFire);
    shotStatusContainer.addEventListener("click", closeStatusContainer);
    document.addEventListener("keypress", handleKeys);
    
    model.createShips();

    function handleGuessTyping() {
        this.value = helpers.trimGuessInput(this.value);
    }

    function handleFire(event) {
        event.preventDefault();
        controller.processGuess(guessFormField.value.toUpperCase());
        guessFormField.value = "";
        guessFormField.blur();
    }

    function handleKeys(event) {;
        if (event.target === document.body) closeStatusContainer.call(shotStatusContainer);
        guessFormField.focus();
    }

    function closeStatusContainer() {
        this.classList.remove("shot-status-container-visible");
    }

})();