const { resetProducts, addProduct, removeProduct, getProducts, getProductByiD, updateProduct } = require('./product');


//resetProducts
beforeEach(() => {
  resetProducts();
});


//addProduct
describe('addProduct', () => {
  it('debería agregar un producto correctamente', () => {
    const product = addProduct('jabón', 2.5);
    expect(product).toEqual({ id: 0, name: 'jabón', price: 2.5 });
    expect(getProducts()).toHaveLength(1);
  });

  it('debería incrementar el id en 1 cada vez que se añada un producto', () => {
    addProduct('lejía', 3);
    addProduct('detergente', 5);
    expect(getProducts()[1].id).toBe(1);
  });

  it('debería lanzar un error si el nombre no está definido', () => {
    expect(() => addProduct('', 3)).toThrow('El nombre del producto es requerido y debe ser una cadena.');
  });

  it('debería lanzar un error si el precio no está definido o no es válido', () => {
    expect(() => addProduct('jabón', -1)).toThrow('El precio debe ser un número mayor que 0.');
  });

  it('debería lanzar un error si el producto ya existe', () => {
    addProduct('lejía', 3);
    expect(() => addProduct('lejía', 3)).toThrow('El producto ya existe.');
  });
});

//removeProduct
describe('removeProduct', () => {
  it('debería eliminar un producto correctamente', () => {
    addProduct('lejía', 3);
    removeProduct(0);
    expect(getProducts()).toHaveLength(0);
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => removeProduct(99)).toThrow('No existe producto con ese id.');
  });
});

//getProductByiD
describe('getProductByiD', () => {
  it('debería devolver un producto por su id', () => {
    addProduct('jabón', 2.5);
    const product = getProductByiD(0);
    expect(product).toEqual({ id: 0, name: 'jabón', price: 2.5 });
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => getProductByiD(99)).toThrow('No existe producto con ese id.');
  });
});


//updateProduct
describe('updateProduct', () => {
  it('debería actualizar un producto por su id', () => {
    addProduct('lejía', 3);
    const updatedProduct = updateProduct(0, 'detergente', 5);
    expect(updatedProduct).toEqual({ id: 0, name: 'detergente', price: 5 });
  });

  it('debería lanzar un error si el producto no existe', () => {
    expect(() => updateProduct(99, 'lejía', 3)).toThrow('No existe producto con ese id.');
  });

  it('debería actualizar solo el precio', () => {
    addProduct('lejía', 3);
    const updatedProduct = updateProduct(0, null, 5);
    expect(updatedProduct.price).toBe(5);
    expect(updatedProduct.name).toBe('lejía');
  });

  it('debería actualizar solo el nombre', () => {
    addProduct('lejía', 3);
    const updatedProduct = updateProduct(0, 'detergente', null);
    expect(updatedProduct.name).toBe('detergente');
    expect(updatedProduct.price).toBe(3);
  });
});
