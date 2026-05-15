import { API } from "../config/api.js";
import { fetchData } from "../services/apiService.js";
import { store } from "../state/store.js";

export async function initProducts() {
  store.products = await fetchData(API.PRODUCTS);
  renderProducts(store.products);
}
export function renderProducts(products) {
  const block = document.getElementById("products");
  if (!block) {
    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "card-product col-md-3";

    col.appendChild(createProductCard(product));

    fragment.appendChild(col);
  });

  block.appendChild(fragment);
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card mb-4 h-100";

  card.innerHTML = `
    <img src="./img/catalog/${product.image}" class="card-img-top" alt="${product.title}">
    
    <div class="card-body d-flex flex-column">
      <h5 class="card-product__title text-clamp-2">
        ${product.title}
      </h5>

      <div class="mt-auto">
        <button class="btn btn-success w-100">
          Купить
        </button>
      </div>
    </div>
  `;

  return card;
}

export function filterProducts() {
  const filtered = store.products.filter(p => {
    const c = store.selectedCategory === "all" || p.category === store.selectedCategory;
    const s = store.selectedStone === "all" || p.stones.includes(store.selectedStone);
    return c && s;
  });

  renderProducts(filtered);
}
