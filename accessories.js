// Read the two dropdowns and the accessory cards.
const plant = document.getElementById("plant");
const potSize = document.getElementById("pot-size");
const cards = document.getElementsByClassName("accessory-card");
const result = document.getElementById("pairing-result");

function matchAccessories() {
    let count = 0;

    // Show the whole catalog until both choices have been made.
    if (plant.value === "" || potSize.value === "") {
        for (let i = 0; i < cards.length; i++) {
            cards[i].hidden = false;
        }
        result.textContent = "Select a plant and its current pot diameter to see compatible accessories.";
        return;
    }

    // Check plant type and size for each accessory.
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const matchesPlant = card.getAttribute("data-plants").includes(plant.value);
        const matchesSize = card.getAttribute("data-sizes").includes(potSize.value);

        if (matchesPlant && matchesSize) {
            card.hidden = false;
            count++;
        } else {
            card.hidden = true;
        }
    }

    if (count === 0) {
        result.textContent = "No matching accessories in our current catalog.";
    } else {
        const plantName = plant.options[plant.selectedIndex].text;
        result.textContent = count + " accessories for " + plantName + " with a " + potSize.value + " cm pot. Check the product dimensions before choosing.";
    }
}

function clearPairing() {
    plant.value = "";
    potSize.value = "";
    matchAccessories();
}

plant.addEventListener("change", matchAccessories);
potSize.addEventListener("change", matchAccessories);
document.getElementById("clear-pairing").addEventListener("click", clearPairing);

// The care page links contain the selected plant in their URL.
if (window.location.search === "?plant=spider-plant") {
    plant.value = "spider-plant";
} else if (window.location.search === "?plant=snake-plant") {
    plant.value = "snake-plant";
} else if (window.location.search === "?plant=pothos") {
    plant.value = "pothos";
}
matchAccessories();
