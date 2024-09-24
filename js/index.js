const carts = document.getElementById('cart');
const container = document.getElementById('container');
const cartContainer = document.getElementById('cartContainer');

// Variables para almacenar los productos y el carrito
let products = [];
let cart = [];

// Fetch products from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    products = data || [];
    showingProducts(products);
  })
  .catch(error => console.error('Error consuming JSON file:', error));

// Función para mostrar los productos
const showingProducts = (products) => {
  container.innerHTML = ''; 
  products.forEach((product) => {
    const productHTML = `
      <div class="w-85 h-100 gap-9 mx-3 my-9 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col">
        <div class="flex-shrink-0">
          <img src="${product.img}" alt="" class="object-cover w-48 h-48 " />
        </div>
        <div class="flex-auto p-2">
          <h1 class="flex-auto text-lg font-semibold text-slate-200">${product.title}</h1>
          <div class="text-lg font-semibold text-slate-200">${product.price}</div>
          <button class="addToCart h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-200 hover:bg-white hover:text-black" data-id="${product.id}">
            Add to cart
          </button>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });
  listeningButton(products);
};

// Función para escuchar los botones de agregar al carrito
const listeningButton = (products) => {
  const buttons = document.querySelectorAll('.addToCart');
  buttons.forEach((button) => {
    if (button.removeEventListener) {
      button.removeEventListener('click', handleClick);
    }
    button.addEventListener('click', (event) => handleClick(event, products));
  });
};

// Función para agregar un producto al carrito
const handleClick = (event, products) => {
  const id = event.currentTarget.dataset.id;
  const product = products.find(product => product.id.toString() === id);
  
  if (!product) {
    console.error(`Product with ID ${id} not found.`);
    return; 
  }

  const cartItem = cart.find(item => item.id.toString() === id);
  
  cartItem 
    ? cartItem.quantity++ // Incrementar cantidad si ya existe
    : cart.push({ id: parseInt(id), quantity: 1, ...product }); // Spread operator para agregar el producto

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart');
  showCart();
};

// Función para mostrar el carrito
const showCart = () => {
  cartContainer.innerHTML = '';
   
  const closeButtonHTML = `
  <button class="closed h-10 px-6 font-semibold rounded-md border border-slate-200 text-white" style="margin-bottom: 10px;">
    Cerrar
  </button>
  `; 
  cartContainer.innerHTML += closeButtonHTML;
  
  // Limpia el contenedor del carrito
  cart.length === 0 
  ? cartContainer.innerHTML += '<p class="text-white">No hay productos en el carrito.</p>' 
  : cart.forEach((product) => {
    const productHTML = `
      <div class="flex gap-5 py-5  relative  ">
        <div class="flex-none w-48 relative">
          <img src="${product.img}" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="flex-auto p-6">
          <h1 class="flex-auto text-lg font-semibold text-white">${product.title}</h1>
          <p class="text-lg font-semibold text-slate-200">${product.price}</p>
          <span class="text-lg font-semibold text-slate-200">Quantity: ${product.quantity}</span>
          
          <div class="flex gap-5">
            <button class="deleteFromCart h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-200" data-id="${product.id}">
              Eliminar
            </button>
            <button class="incrementProducts h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-200" data-id="${product.id}">
              +
            </button>
            <button class="substract h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-200" data-id="${product.id}">
              -
            </button>
          </div>
        </div>
      </div>
    `;
    cartContainer.innerHTML += productHTML;
  });
  renderTotal();
  initCloseButton();
  listeningCartButtons();
  
};
document.addEventListener('DOMContentLoaded', () => {
  // Llama a la función después de que el DOM esté listo
  watchingProducts();
});

const closeButton = () => {
  const close = document.querySelector('.closed');
  if (close) {
    close.removeEventListener('click', closeCart);
    close.addEventListener('click', closeCart);
  }
};

const initCloseButton = () => {
  const close = document.querySelector('.closed');
  if (close) { 
    close.removeEventListener('click', closeCart); // Elimina listeners previos
    close.addEventListener('click', closeCart);
  }
};

const closeCart = () => {
  cartContainer.classList.remove('show'); 
};

const watchingProducts = () => {
  carts.addEventListener('click', () => {
    cartContainer.classList.add('show')
    showCart();
  });
};


// Función para escuchar los botones del carrito
const listeningCartButtons = () => {
  const deleteButtons = document.querySelectorAll('.deleteFromCart');
  const incrementButtons = document.querySelectorAll('.incrementProducts');
  const substractButtons = document.querySelectorAll('.substract');

  deleteButtons.forEach((button) => {
    button.removeEventListener('click', deleteFromCart); // Elimina listeners previos
    button.addEventListener('click', deleteFromCart);
  });

  incrementButtons.forEach((button) => {
    button.removeEventListener('click', incrementProduct); // Elimina listeners previos
    button.addEventListener('click', incrementProduct);
  });

  substractButtons.forEach((button) => {
    button.removeEventListener('click', substractProduct); // Elimina listeners previos
    button.addEventListener('click', substractProduct);
  });
};

// Función para eliminar un producto del carrito
const deleteFromCart = (event) => {
  const id = parseInt(event.target.dataset.id);
  cart = cart.filter((product) => product.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
};

// Función para incrementar la cantidad de un producto en el carrito
const incrementProduct = (event) => {
  const id = parseInt(event.target.dataset.id);
  const product = cart.find((product) => product.id === id);
  if (product) {
    product.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart(); // Actualiza la vista inmediatamente
  }
};


const updateProductQuantity = (product, quantity) => {
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
    if (existingProduct.quantity <= 0) {
      removeProductFromCart(product);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      showCart();
    }
  }
};

const substractProduct = (event) => {
  const id = parseInt(event.target.dataset.id);
  const product = cart.find((product) => product.id === id);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      cart = cart.filter((product) => product.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart(); // Actualiza la vista inmediatamente
  }
};

const calculateTotal = () => {
  return cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
};
// Función para renderizar el total del carrito
const renderTotal = () => {
  const totalHTML = `
    <p class="text-lg font-semibold text-white">Total: $${calculateTotal()}</p>
  `;
  cartContainer.innerHTML += totalHTML; 

};
