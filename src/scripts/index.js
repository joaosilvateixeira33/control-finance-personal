import { insertedValues, renderValues, filterValuesByCategory } from "./valuesDatabase.js";

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".item-filter");
  
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (index === 0) {
          renderValues(insertedValues);
        } else {
          filterValuesByCategory(index - 1);
        }
      });
    });
});


const updateUI = (filteredValues = insertedValues) => {
    renderValues(filteredValues);
};

updateUI();