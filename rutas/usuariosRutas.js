var ruta = require("express").Router();
var subirArchivo=require("../middleware/subirArchivos");
var { login, mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarporId, borrarUsuario } = require("../bd/usuariosBD");

//--------------------------------------------------------

ruta.get("/", async (req, res) => {
  res.render("usuarios/login", { user });
});

ruta.post("/login",async (req,res)=>{
   var error=await login(req.body);
   res.redirect("usuarios/mostrar");
 });

 //----------------------------------------------------

ruta.get("/mostrarUsuarios", async (req, res) => {
  var usuarios = await mostrarUsuarios();
  console.log(usuarios);
  res.render("usuarios/mostrar", { usuarios });
});

ruta.get("/nuevoUsuario",async(req,res)=>{
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
  if(req.file!=undefined){
    req.body.foto=req.file.originalname;
  } else{
    req.body.foto=req.file.originalname;
  }
  var error=await modificarUsuario(req.body);
  res.redirect("usuarios/mostrar");
});

ruta.get("/borrar/:id", async (req,res)=>{
  await borrarUsuario(req.params.id);
  res.redirect("usuarios/mostrar");
});

module.exports = ruta;
