var ruta = require("express").Router();
var subirArchivo=require("../middleware/subirArchivos");
var { mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarporId, borrarUsuario } = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
  var usuarios = await mostrarUsuarios();
  console.log(usuarios);
  res.render("usuarios/mostrar", { usuarios });
});

ruta.get("/nuevousuario",async(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevoUsuario",subirArchivo(),async (req,res)=>{
 console.log(req.file);
 req.body.foto=req.file.originalname;
 console.log(req.body);
  var error=await nuevoUsuario(req.body);
// res.end();
  res.redirect("/");
});

ruta.get("/editar/:id",async (req,res)=>{
  var user= await buscarporId(req.params.id);
  console.log(user);
  res.render("usuarios/modificar",{user});    
});

ruta.post("/editar",subirArchivo(), async(req,res)=>{
  console.log(req.file);
  var error=await modificarUsuario(req.body);
  res.redirect("/");
});

ruta.get("/borrar/:id", async (req,res)=>{
  await borrarUsuario(req.params.id);
  res.redirect("/");
});

module.exports = ruta;
