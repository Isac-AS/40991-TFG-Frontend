# 1. Introducción
Este respositorio se corresponde con la aplicación Angular empleada para la vista e interacción con el sistema de gestión de registros 
médicos procesados con inteligencia artifical.

# 2. Setup
## 2.1. Instalar haciendo uso del fichero docker-compose.yml
Es un requisito necesario en indispensable tener instalado docker. La instalación a través de este método no requiere el clonado del repositorio.
Es suficiente con copiar el fichero "docker-compose.yml", situarlo en un directorio conveniente y ejecutar el comando:
~~~
docker compose up
~~~

## 2.2 Instalación manual
### 2.2.1. Intalar npm (Node Package Manager)
En primer lugar, es necesario verificar la instalación del gestor de paquetes de node. En caso de no tener node, es necasio instalarlo.
Una vez instalado, se puede verificar la instalación con:

~~~
node --version
~~~

### 2.2.2. Clonar el repositio
La clonación del respositorio se puede hacer con el comando:
~~~
git clone https://github.com/Isac-AS/40991-TFG-Frontend.git
~~~

### 2.2.3 Instalación de paquetes
Es necesario dirigirse al directorio `tfg-frontend/` con:
~~~
cd tfg-frontend/
~~~
E instalar los paquetes necesarios para la ejecución (`@angular/cli`, `@angular/material`...). Esto se hace con el comando:
~~~
npm install
~~~

### 2.2.4 Consideraciones de una instalación manual
En caso de ejecutar la aplicación backend de manera local, fuera de un contenedor, será necesario modificar la URI empleada para la conexión
con el backend que se encuentra en el fichero `tfg-frontend/src/app/env.ts`. Como mínimo, se deberá cambiar el puerto por el empleado al arrancar 
la aplicación Flask (por norma general, el 5000).

# 3. Ejecución
La ejecución se puede realizar o bien ejecutando los comandos:
~~~
cd tfg-frontend/
ng serve
~~~
O a través del script provisto que hace lo mismo:
~~~
./bootstrap.bash
~~~