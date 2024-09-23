/* Estas clases estan codificadas a la fuerza para simular un adulto y un municipal y pasarlo como parametro a los distintos componentes */
import carnet from '../../public/carnet.svg'
class adulto {
    constructor() {
      this.nombre = "Felipe Andres"
      this.apellido = "Gonzalez Perez"
      this.rut = "12345678-9"
      this.fnac = "01/01/1960"
      this.edad = "64"
      this.direccion = "San Martin 1234"
      this.sector = "Santa Rosa"
      this.ciudad = "Temuco"
      this.discapacidad = "Si"
      this.condicion = "Movilidad Reducida"
      this.carnet = carnet

    }
  }
export default adulto

