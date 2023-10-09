var conexion = require("./conexion").conexion;
var Usuario = require("../modelos/Usuario");

async function mostrarUsuarios() {
  var users = [];
  try {
    var usuarios = await conexion.get();
    //console.log(usuarios);
    usuarios.forEach((usuario) => {
      //console.log(usuario);
      var user = new Usuario(usuario.id, usuario.data());
      console.log(user);
      if (user.bandera == 0) {
        users.push(user.obtenerDatos);
      }
    });
  } catch (err) {
    console.log("Error al recuperar usuarios de la BD " + err);
  }
  return users;
}

async function buscarporId(id) {
  var user;
  try {
    var usuario = await conexion.doc(id).get();
    usuarioObjeto = new Usuario(usuario.id, usuario.data());
    if (usuarioObjeto.bandera == 0) {
      user = usuarioObjeto.obtenerDatos;
    }
  } catch (err) {
    console.log("Error al recuperar el usuario " + err);
  }
  return user;
}

async function nuevoUsuario(datos) {
  var user = new Usuario(null, datos);
  var error = 1;
  if (user.bandera == 0);
  try {
    await conexion.doc().set(user.obtenerDatos);
    console.log("Usuario insertado a la base de datos");
    error = 0;
  } catch (err) {
    console.log("Error al recuperar el usuario " + err);
  }
  return error;
}

async function modificarUsuario(datos) {
  var error = 1;
  var respuestBuscar=await buscarporId(datos.id);
  if (respuestBuscar!=undefined){
    var user = new Usuario(datos.id, datos);
    if (user.bandera == 0) {
      try {
        await conexion.doc(user.id).set(user.obtenerDatos);
        console.log("Registro actualizado ");
        error = 0;
      } catch (err) {
        console.log("Error al modificar usuario " + err);
      }
    }
 }
  return error;
}

async function borrarUsuario(id) {
  var error=1;
  var user= await buscarporId(id);
  if (user!=undefined){
    try {
      await conexion.doc(id).delete();
      console.log("Registro borrado ");
      error=0;
    } catch (err) {
      console.log("Error al borrar usuario" + err);
    }
  }
  return error;
}

module.exports = {
  mostrarUsuarios,
  buscarporId,
  nuevoUsuario,
  modificarUsuario,
  borrarUsuario,
};
