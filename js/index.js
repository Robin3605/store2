

const form = document.getElementById('form');
const container = document.getElementById('container');


const products = {
    zapatos: [
     {
       id: 1,
       title: "Tenis New Blance para caballero",
       price: 80000,
       img: "https://i.pinimg.com/564x/69/df/51/69df511f2f87c33ef7c4ca54598cf98f.jpg",
     },
     {
         id: 2,
         title: "Tenis Nike Air Force para caballero",
         price: 100000,
         img: "https://i.pinimg.com/564x/7c/8c/72/7c8c729739e5ab9a47e4431b97d27752.jpg",
       },
       {
         id: 3,
         title: "Tenis Puma para dama",
         price: 88000,
         img: "https://i.pinimg.com/564x/34/b6/cb/34b6cb732431aea03a3908b67cac5bc8.jpg",
       },
       {
         id: 4,
         title: "Tenis Shein deportivos para dama",
         price: 30000,
         img: "https://i.pinimg.com/564x/e3/6c/29/e36c29fec22c61fe47a9f2df1ae4f669.jpg",
       },
     
   ],
 
    camisas: [
     {
       id: 1,
       title: "Camisa polo para dama ",
       price: 45000,
       img: "https://i.pinimg.com/564x/96/70/75/967075214412f4d3fe353459fd34c52b.jpg",
     },
     {
         id: 2,
         title: "Top cuello V manga farol",
         price: 70000,
         img: "https://i.pinimg.com/564x/71/73/98/7173982b98062a6530bf1e4e73e5a609.jpg",
       },
       {
         id: 3,
         title: "Camisa de seda manga larga para caballero",
         price: 120000,
         img: "https://i.pinimg.com/564x/d9/67/87/d96787323010ca290ad0071f902d479b.jpg",
       },
       {
         id: 4,
         title: "Camisa polo para caballero",
         price: 100000,
         img: "https://i.pinimg.com/564x/01/f2/66/01f266855a4714dc07fb012dfcbdaf6c.jpg",
       },
     
   ],
 
    pantalones: [
     {
       id: 1,
       title: "Blue jean clasico para caballero",
       price: 87000,
       img: "https://i.pinimg.com/564x/11/1f/4c/111f4ca1f0be7693786cfd819b8124f0.jpg",
     },
     {
         id: 2,
         title: "Pantalon tipo cargo para caballero",
         price: 69000,
         img: "https://i.pinimg.com/564x/ee/a9/94/eea994824148cd1c2cc8de122671c772.jpg",
       },
       {
         id: 3,
         title: "Pantalon tipo crgo para dama",
         price: 67000,
         img: "https://i.pinimg.com/564x/db/4e/ab/db4eaba7fe4516b2bf6d34f642590f20.jpg",
       },
       {
         id: 4,
         title: "Blue jean clasico para dama",
         price: 60000,
         img: "https://i.pinimg.com/474x/8c/6b/f8/8c6bf88ee47f93da3a3bc89c691b36f1.jpg",
       },
     
   ],
 
    chaquetas: [
     {
       id: 1,
       title: "Chaqueta negra para dama",
       price: 70000,
       img: "https://i.pinimg.com/564x/21/66/65/216665a223bb251ce8b0c6f53135dcf8.jpg",
     },
     {
         id: 2,
         title: "Chaqueta cuerina cafe dama",
         price: 89000,
         img: "https://i.pinimg.com/564x/60/3a/0f/603a0f35bb9858b8745826d8bc23f1e4.jpg",
       },
       {
         id: 3,
         title: "Chaqueta cuerina beige caballero",
         price: 85000,
         img: "https://i.pinimg.com/736x/22/5c/bf/225cbfaa73f4d991cd218d414a06155c.jpg",
       },
       {
         id: 4,
         title: "Chaqueta roja para caballero",
         price: 90000,
         img: "https://i.pinimg.com/564x/47/ea/2b/47ea2bcfd2a442a1c4156e872bf8efc6.jpg",
       },
     
   ],
 };



const preventForm = (search) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const search = document.getElementById('search').value; // Obtener el valor del input aquí
        const selectedProducts = chosingProducts(search);
        showingProducts(selectedProducts);
    });
};

const chosingProducts = (search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === 'zapatos') {
        return products.zapatos;
    } else if (searchLower === 'camisas') {
        return products.camisas;
    } else if (searchLower === 'pantalones') {
        return products.pantalones;
    } else if (searchLower === 'chaquetas') {
        return products.chaquetas;
    } else {
        return []; // Retornar un array vacío si no hay productos
    }
};

const showingProducts = (products) => {
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