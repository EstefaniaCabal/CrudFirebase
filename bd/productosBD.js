var conexion = require("./conexion").conexionpr;
const Producto = require("../modelos/Producto");

async function mostrarProductos() {
  var products = [];
  try {
    var productos = await conexion.get();
    productos.forEach((producto) => {
      var product = new Producto(producto.id, producto.data());
      console.log(product);
      if (product.bandera == 0) {
        products.push(product.obtenerDatos);
      }
    });
  } catch (err) {
    console.log("Error al recuperar productos de la BD" + err);
  }
  return products;
}

async function buscarporIdP(id) {
  var product;
  try {
    var producto = await conexion.doc(id).get();
    productoObjeto = new Producto(producto.id, producto.data());
    if (productoObjeto.bandera == 0) {
      product = productoObjeto.obtenerDatos;
    }
  } catch (err) {
    console.log("Error al recuperar el producto " + err);
  }
  return product;
}

async function nuevoProducto(datos) {
  var product = new Producto(null, datos);
  var error = 1;
  if (product.bandera == 0);
  try {
    await conexion.doc().set(product.obtenerDatos);
    console.log("Producto insertado a la base de datos");
    error = 0;
  } catch (err) {
    console.log("Error al recuperar el producto " + err);
  }
  return error;
}

async function modificarProducto(datos) {
  var error = 1;
  var respuestBuscar=await buscarporIdP(datos.id);
  if (respuestBuscar!=undefined){
    var product = new Producto(datos.id, datos);
    if (product.bandera == 0) {
      try {
        await conexion.doc(product.id).set(product.obtenerDatos);
        console.log("Registro actualizado ");
        error = 0;
      } catch (err) {
        console.log("Error al modificar usuario " + err);
      }
    }
 }
  return error;
}

async function borrarProducto(id) {
  var error=1;
  var product= await buscarporIdP(id);
  if (product!=undefined){
    try {
      await conexion.doc(id).delete();
      console.log("Registro borrado ");
      error=0;
    } catch (err) {
      console.log("Error al borrar producto" + err);
    }
  }
  return error;
}


module.exports = {
  mostrarProductos,
  buscarporIdP,
  nuevoProducto,
  modificarProducto,
  borrarProducto,
};
