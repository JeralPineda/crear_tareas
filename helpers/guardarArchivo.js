const fs = require('fs');
const archivo = './db/data.json';

const guardaDB = (data) => {
   //    Guardamos en archivo de texto
   fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
   // Verificamos si existe ese archivo
   if (!fs.existsSync(archivo)) null;

   const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
   const data = JSON.parse(info);
   console.log(data);

   return data;
};

module.exports = {
   guardaDB,
   leerDB,
};
