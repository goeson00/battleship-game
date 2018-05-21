const view = {

    displayHit(position) {
        document.getElementById(position).classList.add("hit");
    },
    
    displayMiss(position) {
        document.getElementById(position).classList.add("miss");
    },
    
    displayMessage(message) {
        const messageContainer = document.querySelector(".shot-status-container"),
        messageField = document.querySelector(".shot-status-info");

        messageField.textContent = message;
        messageContainer.classList.add("shot-status-container-visible");
    },

    reset() {
        const cells = document.querySelectorAll("td[id]");
        [...cells].forEach(cell => cell.className = "");
    }
    
};