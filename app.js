require('colors');

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardaDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
   let opt = '';
   const tareas = new Tareas();

   const tareasDB = leerDB();

   if (tareasDB) {
      //Cargar tareas
      //    Establece las tareas
      tareas.cargarTareasFromArray(tareasDB);
   }

   //    Repetir el menu si no selecciona 0 la opción de salir
   do {
      //    Imprimir el menu
      opt = await inquirerMenu();

      switch (opt) {
         case '1':
            //  Crear opción
            const desc = await leerInput('Descripción: ');
            tareas.crearTarea(desc); //establezca la tarea en el listado

            break;
         case '2':
            // Listado de las opciones
            tareas.listadoCompleto();
            // console.log(tareas.listadoArr);
            break;
         case '3': //Listar completadas
            tareas.listarPendientesCompletadas(true);
            break;
         case '4': // Listar las pendientes
            tareas.listarPendientesCompletadas(false);
            break;
         case '5': // marcar como completada
            const ids = await mostrarListadoChecklist(tareas.listadoArr);

            // cambiar el estado de las tareas
            tareas.toggleCompletadas(ids);

            break;
         case '6': //Borrar tarea
            const id = await listadoTareasBorrar(tareas.listadoArr);

            // Si la opcion es 0(cancelar)
            if (id !== '0') {
               // Preguntar si esta seguro de borrarla
               const ok = await confirmar('¿Estas seguro?');

               // Si su respuesta es si(true) lo borra
               if (ok) {
                  tareas.borrarTarea(id);
               }
            }

            break;
         default:
            break;
      }

      //   Guardar en la base de datos .text
      guardaDB(tareas.listadoArr);

      //   Pausamos al elegir una opción
      await pausa();
   } while (opt !== '0');
};

main();
