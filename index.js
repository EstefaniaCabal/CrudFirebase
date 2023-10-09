var express=require("express");
var cors=require("cors");
var path=require("path");
var rutas=require("./rutas/usuariosRutas");
var rutaspr=require("./rutas/productosRutas");
var rutasua=require("./rutas/usuariosRutasApis");
var rutaspa=require("./rutas/productosRutasApis");

var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use("/",rutas);
app.use("/",rutaspr);
app.use("/",rutasua);
app.use("/",rutaspa);


var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Serividor en http://localhost:"+port)
});
