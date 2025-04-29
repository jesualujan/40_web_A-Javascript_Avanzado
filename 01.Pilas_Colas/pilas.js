// VAMOS A SIMULAR UNA PILA DE EJECUCIÓN DE JAVASCRIPT
// definimos una clase Pila para gestionar una estructura tipo
//* LIFO (Last In First Out)

class Pila {
    constructor(){
        this.items = []; // inicializamos un array vacío para almacenar los elementos de la pila
    }

    // métodos de la clase Pila
    // push: añade un elemento a la pila
    push(elemento){
        console.log(`Push: agregando "${elemento}" a la pila`);
        this.items.push(elemento);
    }
    // elimina el último elemento de la pila  (el tope de la pila)
    pop(){
        if(this.isEmpty()){// verificamos si la pila está vacía antes de hacer un pop
            console.log("Pop: no se puede eliminar, la pila está vacía");
            return null;
        }
        const elemento = this.items.pop(); // eliminamos el último elemento de la pila
        console.log(`Pop: eliminando "${elemento}" de la pila`);
        return elemento; 
    }

    // devuelve el último elemento de la pila sin eliminarlo 
    peek(){
    if(this.isEmpty()){
        console.log("Peek: no se puede ver el último elemento, la pila está vacía");
        return null;
    }
    const tope = this.items[this.items.length - 1]; // accedemos al último elemento de la pila]
    console.log(`Peek: el último elemento de la pila es "${tope}"`);
    return tope;
}

    // devuelve el número de elementos en la pila
    size() {
        console.log(`Size: la pila tiene ${this.items.length} elementos`);
        return this.items.length; 
    }

    // Imprime todos los elementos de la pila
    print(){
        if(this.isEmpty()){
            console.log("Print: la pila está vacía");
        }else{
            console.log("Contenido de la pila:", this.items.join(","))
        }
    }

    // verifica si la pila está vacía
    isEmpty(){
     return this.items.length === 0;
    }
}

// === INSTANCIAR UNA PILA ===
// === Simulación de operaciones sobre la pila ===
console.log("🚀 Creando una nueva instancia de pila...");
// creamos la instancia de la clase Pila
const miPila = new Pila();
miPila.pop(); // debe ser null, ya que la pila está vacía
//* Agregamos elementos a la pila
miPila.push("Libro 1");
miPila.push("Libro 2");
miPila.push("Libro 3");
miPila.push("Libro 4");
miPila.push("Libro 5");
// Consultamos el elemento que está en el tope de la pila
miPila.peek(); // debe ser "Libro 5"
// Consultamos el tamaño de la pila 
miPila.size(); // debe ser 5
// imprimos el contenido de la pila
miPila.print(); // debe ser "Libro 1, Libro 2, Libro 3, Libro 4, Libro 5"
// eliminamos el elemento que está hasta el tope de la pila
miPila.pop(); // debe eliminar "Libro 5"
// volvemos a consultar el tope y el tamaño actual de la pial
miPila.peek();
miPila.size();
miPila.print();
// vaciamos por completo la pila
miPila.pop(); 
miPila.size();
miPila.pop(); 
miPila.size();
miPila.pop(); 
miPila.size();
miPila.pop();
miPila.size(); // debe ser 0
console.log("✅ Fin de la simulación");

// === Fin de la simulación ===