import { API } from "../config/api.js";
import { fetchData, createData } from "../services/apiService.js";

const form = document.getElementById("category-form");
const categoriesList = document.getElementById("categories-list");

let filtersData = [];

export async function initCategories() {
    filtersData = await fetchData(API.FILTERS);

    renderCategories();

    form.addEventListener("submit", handleSubmit);
}

function renderCategories() {

    const categoriesBlock = filtersData.find(
        item => item.type === "categories"
    );

    if (!categoriesBlock) return;

    categoriesList.innerHTML = "";

    categoriesBlock.items.forEach(category => {

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.innerHTML = `
      <strong>${category.label}</strong>
      <br>
      value: ${category.value}
      <br>
      published: ${category.publish}
    `;

        categoriesList.appendChild(li);
    });
}

async function handleSubmit(e) {
    e.preventDefault();

    const label = document.getElementById("category-name").value.trim();

    const value = document.getElementById("category-value").value.trim();

    const publish = document.getElementById("category-publish").checked;

    if (!label || !value) {
        alert("Заповніть всі поля");
        return;
    }

    const categoriesBlock = filtersData.find(
        item => item.type === "categories"
    );

    const newCategory = {
        label,
        value,
        publish
    };

    categoriesBlock.items.push(newCategory);

    await fetch(`${API.FILTERS}/${categoriesBlock.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoriesBlock)
    });

    form.reset();

    renderCategories();
}