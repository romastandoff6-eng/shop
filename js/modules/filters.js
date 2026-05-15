import { API } from "../config/api.js";
import { fetchData } from "../services/apiService.js";
import { store } from "../state/store.js";
import { filterProducts } from "./products.js";

export async function initFilters() {
  const data = await fetchData(API.FILTERS);

  const categoriesBlock = document.getElementById("categories");
  const stonesBlock = document.getElementById("stones");

  data.forEach(item => {

    // =========================
    // 📦 КАТЕГОРІЇ
    // =========================
    if (item.type === "categories") {
      if (categoriesBlock) {
        categoriesBlock.innerHTML = "";
      }

      item.items
        .filter(cat => cat.publish === true)
        .forEach((cat, index) => {
          const btn = document.createElement("button");

          // ✅ ПОВЕРНУЛИ СТИЛІ
          btn.className = "btn btn-outline-dark";

          btn.textContent = cat.label;
          btn.dataset.value = cat.value;

          if (index === 0) btn.classList.add("active");

          btn.onclick = () => {
            document.querySelectorAll("#categories button")
              .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            store.selectedCategory = btn.dataset.value;

            filterProducts();
          };

          if (categoriesBlock) {
            categoriesBlock.appendChild(btn);
          }
        });
    }

    // =========================
    // 💎 КАМЕНІ
    // =========================
    if (item.type === "stones") {
      if (stonesBlock) {
        stonesBlock.innerHTML = "";
      }

      item.items.forEach(stone => {
        const btn = document.createElement("button");

        // ✅ ПОВЕРНУЛИ СТИЛІ
        btn.className = "btn btn-outline-secondary btn-sm";

        btn.textContent = stone.label;
        btn.dataset.value = stone.value;

        btn.onclick = () => {

          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            store.selectedStone = "all";
          } else {
            document.querySelectorAll("#stones button")
              .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            store.selectedStone = btn.dataset.value;
          }

          filterProducts();
        };

        if (stonesBlock) {
          stonesBlock.appendChild(btn)
        }
      });
    }

  });
}