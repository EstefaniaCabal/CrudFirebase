var ruta = require("express").Router();
var subirArchivo=require("../middleware/subirArchivos");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarporIdP, borrarProducto } = require("../bd/productosBD");

ruta.get("/mostrarProducto", async (req, res) => {
  var productos = await mostrarProductos();
  console.log(productos);
  res.render("productos/mostrarp", { productos });
});

ruta.get("/nuevoproducto",async(req,res)=>{
    res.render("productos/nuevop");
});

ruta.post("/nuevoProducto", subirArchivo(), async (req,res)=>{
 console.log(req.file);
// req.body.foto=req.file.originalname;
 console.log(req.body);
 var error=await nuevoProducto(req.body);
 // res.end();
 res.redirect("/mostrarProducto");
});

ruta.get("/editarp/:id",async (req,res)=>{
  var product= await buscarporIdP(req.params.id);
  console.log(product);
  res.render("productos/modificarp",{product});    
});

ruta.post("/editarp", subirArchivo(), async(req,res)=>{
  console.log(req.file);
 // req.body.foto=req.file.originalname;
  var error=await modificarProducto(req.body);
  res.redirect("/mostrarProducto");
});

ruta.get("/borrarp/:id", async (req,res)=>{
  await borrarProducto(req.params.id);
  res.redirect("/mostrarProducto");
});

module.exports = ruta;
