const express = require('express');
const app = express();
const port = process.env.PORT || 8080;  // Puedes cambiar el puerto si lo deseas
const hostname = process.env.HOST || 'localhost';  // Puedes cambiar el host si lo deseas

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Arrancar el servidor
app.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}`);
});