const searchInput = document.getElementById('search');
const container = document.getElementById('container');
const cartContainer = document.getElementById('cart-container');

let zapatos, camisas, pantalones, chaquetas;

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    zapatos = data.zapatos;
    camisas = data.camisas;
    pantalones = data.pantalones;
    chaquetas = data.chaquetas;
    console.log('Data:', data);
  })
  .catch(error => console.error('Error consuming JSON file:', error));

const preventForm = (search) => {
  searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const selectedProducts = chooseProducts(searchValue);
    console.log('Selected products:', selectedProducts);
    showProducts(selectedProducts);
  });
};

const chooseProducts = (search) => {
  const searchLower = search.toLowerCase();
  const productCategories = {
    'zapatos': zapatos,
    'camisas': camisas,
    'pantalones': pantalones,
    'chaquetas': chaquetas,
  };
  const products = productCategories[searchLower] || [];
  console.log('Products:', products);
  return products;
};

const showProducts = (products) => {
    container.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos productos
    if (products.length === 0) {
        container.innerHTML = '<p class="text-4xl text-center justify-center items-center ">No tenemos ese producto en este momento.</p>';
        return;
    }
    products.forEach(product => {
        const productHTML = `
        <div class="flex  font-sans gap-5 py-15 px-20">
            <div class="flex-none w-48 relative">
              <img src="${product.img}" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <form class="flex-auto p-6">
              <div class="flex flex-wrap">
                <h1 class="flex-auto text-lg font-semibold text-slate-200">
                  ${product.title}
                </h1>
                <div class="text-lg font-semibold text-slate-200">
                  ${product.price}
                </div>
                <div class="w-full flex-none text-sm font-medium text-slate-200 mt-2">
                  In stock
                </div>
              </div>
              <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
              </div>
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                    Buy now
                  </button>
                  <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-200" type="button">
                    Add to bag
                  </button>
                </div>
              </div>
            </form>
          </div>
        `
        container.innerHTML += productHTML; 
    });
};

function main(){
    preventForm();
    
};

main();
