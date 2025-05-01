// 📦 Versión 2: Promesas

function descargarArchivoPromesa(nombreArchivo){
    console.log(`⏳Iniciando la descarga de ${nombreArchivo}...`);
    return new Promise((resolve,reject) => {
        //implementar la descarga del archivo simulando un retraso
  setTimeout( () => {
    const contenido = `Contenido del archivo ${nombreArchivo}`;
    resolve(contenido);
  }, 3000);
    })
}

// uso de la función descargarArchivoPromesa
descargarArchivoPromesa("Archivo.txt")
  .then(  (resultado ) =>
     { 
      console.log("✅ Archivo descargado con éxito:", resultado);
    })
  .catch((error ) => 
    { console.error("❌ Error al descargar el archivo:", error);
      
    })