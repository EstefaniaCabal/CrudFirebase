var ruta = require("express").Router();
var subirArchivo= require("../middleware/subirArchivos");
var { mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarporId, borrarUsuario } = require("../bd/usuariosBD");

ruta.get("/api/mostrarUsuarios", async (req, res) => {
  var usuarios = await mostrarUsuarios();
  if(usuarios.length>0)
  res.status(200).json(usuarios);
else
  res.status(400).json("No hay usuarios");
});

ruta.post("/api/nuevousuario",subirArchivo(),async(req,res)=>{
 // console.log(req.body);
  req.body.foto=req.file.originalname;
  var error=await nuevoUsuario(req.body);
  if(error==0){
    res.status(200).json("Usuario registrado");
  }else{
    res.status(400).json("Datos incorrectos");
  }
});

ruta.get("/api/buscarUsuarioPorId/:id",async (req,res)=>{
  var user= await buscarporId(req.params.id);
  //console.log(user);
 // res.render("usuarios/modificar",{user});   
 if (user==""){
  res.status(400).json("No se encontro ese usuario")
 } else{
  res.status(200).json(user);
 }
});

ruta.post("/api/editarUsuario",subirArchivo(), async(req,res)=>{
  req.body.foto=req.file.originalname;
  var error=await modificarUsuario(req.body);
if(error==0){
  res.status(200).json("Usuario editado");
}else {
  res.status(400).json("Error al actualizar el usuario");
}
});

ruta.get("/api/borrarUsuario/:id", async (req,res)=>{
  var error =  await borrarUsuario(req.params.id);
  if (error==0){
    res.status(200).json("Usuario borrado");
  } else{
    res.status(400).json("Error al borrar usuario");
  }
});

module.exports = ruta;
