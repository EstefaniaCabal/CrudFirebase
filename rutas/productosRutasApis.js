var ruta = require("express").Router();
var subirArchivo= require("../middleware/subirArchivos");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarporIdP, borrarProducto } = require("../bd/productosBD");

ruta.get("/api/mostrarProductos", async (req, res) => {
  var productos = await mostrarProductos();
    if(productos.length>0)
    res.status(200).json(productos);
        else
    res.status(400).json("No hay productos");
    });

ruta.post("/api/nuevoproducto",subirArchivo(),async (req,res)=>{
    console.log(req.body);
    req.body.foto=req.file.originalname;
    var error=await nuevoProducto(req.body);
    if(error==0){
      res.status(200).json("Producto registrado");
    }else{
      res.status(400).json("Datos incorrectos");
    }
  });

ruta.get("/api/buscarProductoPorId/:id",async (req,res)=>{
    var product= await buscarporIdP(req.params.id);
    //console.log(user);
   // res.render("usuarios/modificar",{user});   
   if (product==""){
    res.status(400).json("No se encontro ese producto");
   } else{
    res.status(200).json(product);
   }
  });

ruta.post("/api/editarProducto", subirArchivo(), async(req,res)=>{
  req.body.foto=req.file.originalname;
    var error=await modificarProducto(req.body);
    if(error==0){
      res.status(200).json("Producto editado");
    }else {
      res.status(400).json("Error al actualizar el producto");
    }
    });

ruta.get("/api/borrarProducto/:id", async (req,res)=>{
    var error =  await borrarProducto(req.params.id);
    if (error==0){
      res.status(200).json("Producto borrado");
    } else{
      res.status(400).json("Error al borrar producto");
    }
  });

module.exports = ruta;
