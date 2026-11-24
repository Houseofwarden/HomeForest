// Read the filter controls from the HTML page.
const search = document.getElementById("plant-search");
const light = document.getElementById("light");
const difficulty = document.getElementById("difficulty");
const petSafety = document.getElementById("pet-safety");
const budget = document.getElementById("budget");
const cards = document.getElementsByClassName("plant-card");
const result = document.getElementById("result-count");

function filterPlants() {
    const searchText = search.value.toLowerCase().trim();
    let count = 0;

    // Check each plant card against all five filters.
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const name = card.getAttribute("data-name").toLowerCase();
        const plantLight = card.getAttribute("data-light");
        const plantLevel = card.getAttribute("data-level");
        const plantPet = card.getAttribute("data-pet");
        const price = Number(card.getAttribute("data-price"));

        const matchesName = name.includes(searchText);
        const matchesLight = light.value === "all" || plantLight.includes(light.value);
        const matchesLevel = difficulty.value === "all" || plantLevel === difficulty.value;
        const matchesPet = petSafety.value === "all" || plantPet === petSafety.value;

        // The entered budget is the maximum acceptable price.
        const matchesBudget = budget.value === "all" || price <= Number(budget.value);

        if (matchesName && matchesLight && matchesLevel && matchesPet && matchesBudget) {
            card.style.display = "";
            count++;
        } else {
            card.style.display = "none";
        }
    }

    if (count === 0) {
        result.textContent = "No matching plants. Try changing your filters.";
    } else {
        result.textContent = count + " plant(s) found.";
    }
}

function resetFilters() {
    search.value = "";
    light.value = "all";
    difficulty.value = "all";
    petSafety.value = "all";
    budget.value = "all";
    filterPlants();
}

// Run the function whenever the visitor changes a filter.
search.addEventListener("input", filterPlants);
light.addEventListener("change", filterPlants);
difficulty.addEventListener("change", filterPlants);
petSafety.addEventListener("change", filterPlants);
budget.addEventListener("change", filterPlants);
document.getElementById("clear-filters").addEventListener("click", resetFilters);
filterPlants();
