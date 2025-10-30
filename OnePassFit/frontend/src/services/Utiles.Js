const RUTA_IMAGEN = "http://localhost/sistema-gimnasio/api/";
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const Utiles = {
  generarURL(imagen) {
    return `${RUTA_IMAGEN}${imagen}`;
  },

  obtenerClaves(array) {
    return array.map(el => el[Object.keys(el)[0]]);
  },

  obtenerValores(array) {
    return array.map(el => el.numeroVisitas);
  },

  obtenerValoresPagos(array) {
    return array.map(el => parseInt(el.total));
  },

  cambiarDiaSemana(array) {
    return array.map(el => ({
      ...el,
      dia: DIAS[el.numeroDia - 1]
    }));
  },

  cambiarNumeroANombreMes(array) {
    return array.map(el => ({
      ...el,
      mes: MESES[el.mes - 1]
    }));
  }
};

export default Utiles;
