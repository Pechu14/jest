let products = [];
let id = 0; 

// resetear los productos y el id
function resetProducts() {
  products = [];
  id = 0;
}

// trae la lista de productos
function getProducts() {
  return products;
}

// Añadir producto
function addProduct(name, price) {
  if (!name || typeof name !== 'string') {
    throw new Error('El nombre del producto es requerido y debe ser una cadena.');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('El precio debe ser un número mayor que 0.');
  }

  const productExists = products.some(product => product.name === name);
  if (productExists) {
    throw new Error('El producto ya existe.');
  }

  const newProduct = { id: id++, name, price };
  products.push(newProduct);
  return newProduct;
}

// Elimina producto por su id
function removeProduct(productId) {
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex === -1) {
    throw new Error('No existe producto con ese id.');
  }
  products.splice(productIndex, 1);
}



// trae producto por su id
function getProductByiD(productId) {
  const product = products.find(product => product.id === productId);
  if (!product) {
    throw new Error('No existe producto con ese id.');
  }
  return product;
}

// Actualiza un producto por su id
function updateProduct(productId, name, price) {
  const product = products.find(product => product.id === productId);
  if (!product) {
    throw new Error('No existe producto con ese id.');
  }

  if (name && typeof name !== 'string') {
    throw new Error('El nombre debe ser una cadena.');
  }
  if (price && (typeof price !== 'number' || price <= 0)) {
    throw new Error('El precio debe ser un número mayor que 0.');
  }

  if (name) product.name = name;
  if (price) product.price = price;

  return product;
}

// Exportar las funciones para los tests
module.exports = {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProductByiD,
  updateProduct,
};

