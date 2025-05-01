// 🔁 Versión 1: Callbacks

function descargarArchivoCallback(nombreArchivo , callback){
 console.log(`⏳Iniciando la descarga de ${nombreArchivo}...`);
  //implementar la descarga del archivo simulando un retraso
  setTimeout( () => {
    const contenido = `Contenido del archivo ${nombreArchivo}`;
    callback(null, contenido); // primer argumento es el error, segundo el resultado
  }, 3000);
}

// uso de la función descargarArchivoCallback
descargarArchivoCallback("Archivo.txt", (error, resultado) => {
    if(error){ 
        console.error("❌ Error al descargar el archivo:", error);
    }else {
        console.log("✅ Archivo descargado con éxito:", resultado);
    }
});