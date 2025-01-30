export const valuesCategory = ["Entrada", "Saída"];

 export let insertedValues = [
  {
    id: 1,
    value: 90.0,
    categoryID: 0,
  },
  {
    id: 2,
    value: 40.0,
    categoryID: 1,
  },
  {
    id: 3,
    value: 15.5,
    categoryID: 0,
  },

  {
    id: 4,
    value: 400.5,
    categoryID: 0,
  },
];

export const sumResult = (values) => values.reduce((total, item) => total + item.value, 0);

export const filterByCategory = (categoryID) => insertedValues.filter(item => item.categoryID === categoryID);

export const createValueElement = ({ id, value, categoryID }) => {
  const div = document.createElement("div");
  div.classList.add("value-item");

  div.innerHTML = `
    <p>R$ ${value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}</p>
      <div class="actions-button">
      <span class="type-value">${valuesCategory[categoryID]}</span>
      <button class="delete-btn" data-id="${id}"><img src="src/assets/trash-icon.png" alt="icone lixeira"></button>
    </div>
  `;

  return div;
};

export const renderValues = (insertedValues) => {
  const container = document.querySelector(".values-list");
  container.innerHTML = "";  
  insertedValues.forEach(value => container.appendChild(createValueElement(value)));
  const total = sumResult(insertedValues);
  document.getElementById("totalSum").textContent = `Total: ${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}`;
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.closest(".delete-btn").dataset.id);
      deleteValue(id);
    });
  });
};

export const filterValuesByCategory = (categoryID) => {
  const filteredValues = insertedValues.filter(value => value.categoryID === categoryID);
  renderValues(filteredValues);
};

export const addNewValue = () => {
  const valueInput = document.getElementById("valueInput").value;
  const categorySelect = document.getElementById("categorySelect").value;

  if (!valueInput) {
    alert("Digite um valor válido!");
    return;
  }

  const newValue = {
    id: insertedValues.length + 1,
    value: parseFloat(valueInput),
    categoryID: parseInt(categorySelect),
  };

  insertedValues.push(newValue);
  renderValues(insertedValues);

  document.getElementById("valueInput").value = "";
}

document.getElementById("saveValue").addEventListener("click", addNewValue);

export const deleteValue = (id) => {
  insertedValues = insertedValues.filter(value => value.id !== id);
  renderValues(insertedValues);
}