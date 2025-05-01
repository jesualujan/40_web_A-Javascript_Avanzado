// ✨ Versión 3: Async/Await + Try-Catch
// En esta versión, utilizamos async/await para manejar la asincronía
// y utilizamos try/catch para manejar los errores de una manera más legible.

function descargaArchivo(nombreArchivo){
    console.log(`⏳Iniciando la descarga de ${nombreArchivo}...`);
    return new Promise((resolve,reject) => {
        //implementar la descarga del archivo simulando un retraso
  setTimeout( () => {
    const contenido = `Contenido del archivo ${nombreArchivo}`;
    resolve(contenido);
  }, 3000);
    })
}

// función asincrona que utiliza await para esperar la descarga del archivo
async function main(){
    try {
        const resultado = await descargaArchivo("Archivo.txt");
        console.log("✅ Archivo descargado con éxito:", resultado);
    }
    catch(error){
        console.error("❌ Error al descargar el archivo:", error);
    }
}

main();