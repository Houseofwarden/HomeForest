# HomeForest

Open `index.html` in VS Code or your browser. All pages use `style.css`. Photographs are separate PNG files in `images/`, so every image uses a normal HTML img tag.

## Work distribution
- Dipak: index.html and shop.html (homepage, cards and filters).
- Tanishk: finder.html and care.html (form, quiz and care accordions).
- Prashanta: accessories.html and cart.html (dropdowns, table and pairing/cart logic).
- Everyone: shared style.css, testing and integration.

Navigation, expandable care guides and shop search/filters work. Recommendations now work. Planter pairing now works. The shopping cart now works with browser storage. Sample prices and generated product images are used for this classroom store demonstration.

## JavaScript lesson 1: Shop filters

`shop.js` reads the search and dropdown values, loops through the plant cards, and hides cards that do not match. The Clear filters button resets the controls. The plant light and pet-safety values follow the sources linked on the care page.

## JavaScript lesson 2: Plant Finder

`finder.js` reads the selected radio buttons and checks each recommendation against light, non-toxicity to cats and dogs, and care needs. A regular-care user can choose any maintenance level; low-maintenance users see only plants classified as low-maintenance. Reset clears results. If no matches exist, the quiz displays a message without relaxing the pet-safety requirement.

## JavaScript lesson 3: Planter pairing

`accessories.js` reads the chosen plant and pot diameter, checks each accessory using its HTML data attributes, and shows compatible catalog items. The sample 16 cm ceramic pot suits 12 cm upgrades or 16 cm replacements; the tray has a 20 cm usable inner diameter; the hanging holder is recommended for spider plants and pothos in 12-16 cm pots. These are demonstration catalog dimensions, so actual products should be measured.

## JavaScript lesson 4: Shopping cart

`cart.js` uses a product array, an object containing quantities, multiplication and addition for totals, and localStorage to save cart data across pages and reloads. The cart retains its existing storage key. Open the website using VS Code Live Server for consistent browser storage. Users can add products, increase or decrease quantities, and remove items. This is a demo store with sample prices.

## Browser testing

HomeForest was tested locally in Microsoft Edge using a local HTTP server. Shop search and reset, plant quiz, care accordions, planter pairing, cart add/remove, quantities, totals and persistence passed. All six pages fit 320 px, 360 px, 768 px and 1280 px viewports without horizontal page overflow. Deploy HomeForest to GitHub Pages after the final team review.

## Simpler CSS layout

Cards use Flexbox and `flex-wrap: wrap` to move onto a new row when space is limited. The selected version uses no media queries or sticky positioning.

## JavaScript concepts to learn before viva

The JavaScript is kept within the features needed by this project: variables, conditions, loops, arrays and objects, functions, DOM selection, events, JSON and Local Storage. Error handling keeps the website usable if browser storage is unavailable. The cart rows are ordinary HTML table rows; JavaScript changes their quantities, subtotals and visibility.
