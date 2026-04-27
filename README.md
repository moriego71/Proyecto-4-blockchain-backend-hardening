# blockchain-backend-hardening (Node.js + Clean Architecture + Repository Pattern)
Proyecto 4

Descripción

Este proyecto implementa una API REST de blockchain desarrollada en Node.js, evolucionada desde una versión inicial (Proyecto 3) hacia una arquitectura más robusta, desacoplada y extensible.

El objetivo principal es demostrar:

	- Separación de responsabilidades (Clean Architecture)
	- Abstracción de persistencia (Repository Pattern)
	- Capacidad de cambiar la base de datos sin modificar la lógica de negocio
	- Implementación de Proof of Work (minería)
	- Manejo asíncrono sin bloquear el event loop

La API permite:

	- Crear bloques con datos (POST /data)
	- Consultar la cadena (GET /chain)
	- Validar la integridad (GET /validate)

Cada bloque contiene:

	- index
	- timestamp
	- data
	- previousHash
	- nonce
	- hash (calculado con SHA-256)

La cadena mantiene:

	- integridad criptográfica
	- encadenamiento por hashes
	- dificultad de minado



ARQUITECTURA:

Estructura basada en capas:

src/
│
├── controllers/        Manejo HTTP
├── services/           Lógica de negocio (use cases)
├── domain/             Modelos (Blockchain, Block)
├── repositories/       Persistencia (File / Mongo)
├── routes/             Endpoints
├── middlewares/        Validaciones / errores
├── config/             Configuración centralizada
├── utils/              Logger, helpers
│
├── app.js              Configuración Express
└── server.js           Entry point


REPOSITORY PATTERN:

El sistema NO depende de una DB concreta.
Se puede cambiar entre:
	File (persistencia local)
	MongoDB
Sin modificar services, domain NI controllers.

Selección por configuración:
DB_TYPE=file  o  DB_TYPE=mongo (MONGO_URI=mongodb://localhost:27017/blockchain).


FACTORY DE REPO:

module.exports = (config) => {
    if (config.db === 'mongo') {
        return new MongoRepository(config.mongoUri);
    }
    return new FileRepository();
};


PROOF OF WORK (minería):

Cada bloque se mina hasta cumplir:
	- hash.startsWith("0".repeat(difficulty))

Implementación:
async mineBlock(difficulty) {
    const target = Array(difficulty + 1).join("0");

    while (this.hash.substring(0, difficulty) !== target) {
        this.nonce++;
        this.hash = this.calculateHash();

        if (this.nonce % 10000 === 0) {
            await new Promise(resolve => setImmediate(resolve));
        }
    }
}

Características clave:
No bloquea completamente el event loop
Permite requests largos controlados
Simula comportamiento real de blockchain.

Diferencias con Proyecto 3 (blockchain-api):

Aspecto	            Proyecto 3	              Proyecto 4
Persistencia	     Acoplada	        Desacoplada (Repository)
DB	        Solo memoria/file	File + Mongo intercambiable
Arquitectura	     Parcial	        Clean Architecture
Configuración	   Hardcodeada	        .env
Minería	              Básica	        Asíncrona (non-blocking)
Escalabilidad	       Baja	        Alta
Testabilidad	     Limitada	        Alta




PRUEBAS REALIZADAS (CLI / CURL):

1. Levantar servidor
	node src/server.js
Resultado esperado:
	CONFIG: { port: 3000, db: 'mongo', mongoUri: '...' }
	Server running on port 3000

2. Verificar API activa
	curl http://localhost:3000/
Resultado esperado:
	API running

3. Obtener blockchain inicial
	curl http://localhost:3000/api/blockchain/chain
Resultado esperado:
	Contiene bloque génesis
	difficulty configurada

4. Crear bloque (minado)
	curl -X POST "http://localhost:3000/api/blockchain/data" \
	-H "Content-Type: application/json" \
	-d "{\"data\":\"hola blockchain\"}"  (EN WINDOWS: TODO EN UNA SOLA LÍNEA)
Resultado esperado:
	request tarda unos segundos (minado)
	devuelve bloque con:
	index: 1
	nonce: > 0
	hash: empieza con ceros

5. Verificar persistencia
	curl http://localhost:3000/api/blockchain/chain
Resultado esperado:
	el bloque creado sigue presente
	si usás Mongo → persiste entre reinicios

6. Validar cadena
	curl http://localhost:3000/api/blockchain/validate
Resultado esperado:
true



MEJORAS IMPLEMENTADAS:

	- Inyección de dependencias manual
	 -Eliminación de acoplamiento a DB
	- Manejo correcto de async/await
	- Persistencia intercambiable
	- Minería no bloqueante
	- Configuración por entorno



IDEAS PARA AVANZAR EN IMPLEMENTACIÓN:

	- Cola de minado (evitar concurrencia)
	- Worker Threads (minería real paralela)
	- API de transacciones
	- Firma digital (criptografía asimétrica)
	- P2P networking (nodos)
	- Ajuste dinámico de dificultad
	- Testing automatizado (Jest)



RESUMEN:

Este proyecto implementa una blockchain funcional con una API REST en Node.js, aplicando principios de Clean Architecture.
La lógica de negocio está completamente desacoplada de la persistencia mediante Repository Pattern, lo que permite intercambiar entre almacenamiento en archivo y MongoDB sin modificar el core.
Además, implementé minería con Proof of Work de forma asíncrona para evitar bloquear el event loop, simulando un entorno más realista.”

Este proyecto ya no es un demo simple. Tiene: 

	- un sistema extensible
	- desacoplado
	- configurable
	- cercano a una arquitectura productiva



Autor: Diego Moreno
(Proyecto desarrollado como práctica profesional para portfolio técnico).



