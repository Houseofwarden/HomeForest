// Read the form and the three recommendation cards.
const quiz = document.getElementById("plant-quiz");
const cards = document.getElementsByClassName("recommendation-card");
const message = document.getElementById("recommendation-message");

function recommendPlants(event) {
    event.preventDefault(); // Keep the form on this page.

    // Read the selected radio button in each question.
    const light = document.querySelector('input[name="light"]:checked').value;
    const pet = document.querySelector('input[name="pet-safe"]:checked').value;
    const care = document.querySelector('input[name="care"]:checked').value;
    const placement = document.querySelector('input[name="placement"]:checked').value;
    let count = 0;

    // Check whether each plant matches every answer.
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const matchesLight = card.getAttribute("data-light").includes(light);
        const matchesPet = pet === "any" || card.getAttribute("data-pet") === "yes";
        const matchesCare = care === "regular" || card.getAttribute("data-care") === "low";

        const matchesPlacement = placement === "any" || card.getAttribute("data-placement") === placement;

        if (matchesLight && matchesPet && matchesCare && matchesPlacement) {
            card.hidden = false;
            count++;
        } else {
            card.hidden = true;
        }
    }

    if (count === 0) {
        message.textContent = "No plant in our current catalog matches all your answers. Try different conditions if appropriate.";
    } else {
        message.textContent = count + " matching plant(s). Select a care guide to learn more.";
    }
}

function resetResults() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].hidden = true;
    }
    message.textContent = "Answer the four questions to find matching plants.";
}

quiz.addEventListener("submit", recommendPlants);
quiz.addEventListener("reset", resetResults);
