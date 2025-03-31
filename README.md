Front-end - Checkout App
Este proyecto es la interfaz de usuario para el procesamiento de pagos, desarrollada con React. La aplicación se comunica con un backend (por ejemplo, en http://localhost:8000) y utiliza variables de entorno para configurar la URL del servidor. Se asume que ya se cuenta con un archivo .env que contiene la credencial del servidor.

Tabla de Contenidos
Requisitos Previos

Instalación

Configuración

Ejecución

Estructura del Proyecto

Construcción para Producción

Notas Adicionales

Requisitos Previos
Node.js y npm: Se recomienda tener Node.js (v14 o superior) y npm instalados.

Backend en funcionamiento: La aplicación depende de un backend corriendo (por ejemplo, en http://localhost:8000). Asegúrate de que el backend esté configurado y en ejecución.

Instalación
Clonar el repositorio:

Abre una terminal y clona el repositorio:

git clone https://github.com/tu_usuario/pruebaTecnicaKluFront.git
Navegar a la carpeta del front-end:

Se asume que la aplicación React se encuentra en la carpeta checkout-app-klu:

cd pruebaTecnicaKluFront/checkout-app-klu
Instalar las dependencias:

Ejecuta el siguiente comando en la raíz del front-end:

npm install

Configuración
La aplicación utiliza variables de entorno para definir la URL del backend y otras configuraciones. Se asume que ya cuentas con un archivo .env en la raíz del proyecto (junto a package.json) que contiene, por ejemplo:

REACT*APP_BACKEND_URL=http://localhost:8000
Esta variable se utiliza para conectarse al servidor.
Nota: Las variables de entorno en Create React App deben comenzar con REACT_APP* para que sean accesibles en el código. Si realizas cambios en el archivo .env, reinicia el servidor de desarrollo para que se apliquen.

Ejecución
Para iniciar la aplicación en modo desarrollo, ejecuta:

npm start
La aplicación se abrirá en el navegador (normalmente en http://localhost:3000). Los cambios se recargarán automáticamente al guardar el código.
