const { v4: uuidv4 } = require('uuid');

const Tarea = require('./tarea');

/*
 *  _listado:
 *    { 'uuid-92749274-937974038-84794723: {id: 12, desc: ngnr, completadoEn: 15151-11-55} }
 *    { 'uuid-92749274-937974038-84794723: {id: 12, desc: ngnr, completadoEn: 15151-11-55} }
 *    { 'uuid-92749274-937974038-84794723: {id: 12, desc: ngnr, completadoEn: 15151-11-55} }
 */

class Tareas {
   _listado = {};

   get listadoArr() {
      const listado = [];
      Object.keys(this._listado).forEach((key) => {
         // Extraemos la tarea
         const tarea = this._listado[key];

         // Insertar tareas a este listado
         listado.push(tarea);
      });

      return listado;
   }

   constructor(desc) {
      this._listado = {};
   }

   borrarTarea(id = '') {
      if (this._listado[id]) {
         delete this._listado[id];
      }
   }

   cargarTareasFromArray(tareas = []) {
      tareas.forEach((tarea) => {
         this._listado[tarea.id] = tarea;
      });
   }

   crearTarea(desc = '') {
      const tarea = new Tarea(desc);

      this._listado[tarea.id] = tarea;
   }

   listadoCompleto() {
      console.log();

      //   Obtenemos las tareas para luego mostrarlas
      this.listadoArr.forEach((tarea, i) => {
         const idx = `${i + 1}`.green; //Obtengo el indice
         const { desc, completadoEn } = tarea;

         const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

         console.log(`${idx}. ${desc} :: ${estado}`);
      });
   }

   listarPendientesCompletadas(completadas = true) {
      console.log();
      let indice = 0;
      this.listadoArr.forEach((tarea) => {
         const { desc, completadoEn } = tarea;

         const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

         if (completadas) {
            //  Mostrar completadas
            if (completadoEn) {
               indice++;
               console.log(`${indice.toString().green}. ${desc} :: ${completadoEn.green}`);
            }
         } else {
            //  Mostrar las pendientes
            if (!completadoEn) {
               indice++;
               console.log(`${indice.toString().green}. ${desc} :: ${estado}`);
            }
         }
      });
   }

   //    Cambiar el estado de las tareas
   toggleCompletadas(ids = []) {
      ids.forEach((id) => {
         const tarea = this._listado[id];

         if (!tarea.completadoEn) {
            tarea.completadoEn = new Date().toISOString();
         }
      });

      this.listadoArr.forEach((tarea) => {
         if (!ids.includes(tarea.id)) {
            this._listado[tarea.id].completadoEn = null;
         }
      });
   }
}

module.exports = Tareas;
