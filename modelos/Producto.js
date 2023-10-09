class Producto {
    constructor(id, data) {
      this.bandera = 0;
      this.id = id;
      this.nombre = data.nombre;
      this.costo = data.costo;
      this.brand = data.brand;
      this.foto=data.foto;
    }
    set id(id) {
      if(id!=null)
      id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }
    set nombre(nombre) {
      nombre.length > 0 ? (this._nombre = nombre) : (this.bandera = 1);
    }
    set costo(costo) {
      costo.length > 0 ? (this._costo = costo) : (this.bandera = 1);
    }
    set brand(brand) {
      brand.length > 0 ? (this._brand = brand) : (this.bandera = 1);
    }
    set foto(foto) {
      foto.length > 0 ? (this._foto = foto) : (this.bandera = 1);
    }
    get id() {
      return this._id;
    }
    get nombre() {
      return this._nombre;
    }
    get costo() {
      return this._costo;
    }
    get brand() {
      return this._brand;
    }
    get foto() {
      return this._foto;
    }
    get obtenerDatos() {
      if(this._id!=null)
      return {
        id: this.id,
        nombre: this.nombre,
        costo: this.costo,
        brand: this.brand,
        foto: this.foto,
      }
      else{
        return {
          nombre: this.nombre,
          costo: this.costo,
          brand: this.brand,
          foto: this.foto,
        }
      }
    }
  }
  
  module.exports = Producto;
  