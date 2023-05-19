# ✨ Manual de Instalación del Proyecto en Flask "Music PRO"

Este documento proporciona los pasos necesarios para instalar y configurar un proyecto en Flask, incluyendo la instalación de dependencias y la configuración de un ambiente virtual.

## Requisitos

Asegúrate de tener instalado lo siguiente antes de comenzar con la instalación del proyecto:

- Python (versión 3.7 o superior)
- pip (administrador de paquetes de Python)

## Paso 1: Clonar el proyecto

Para comenzar, clona el proyecto desde el repositorio usando el siguiente comando:

```
git clone <URL_DEL_REPOSITORIO>
```

Sustituye `<URL_DEL_REPOSITORIO>` con la URL del repositorio donde se encuentra el proyecto.

## Paso 2: Crear y activar un ambiente virtual

Un ambiente virtual es una herramienta que permite aislar las dependencias y configuraciones del proyecto en un entorno separado. Sigue estos pasos para crear y activar un ambiente virtual:

1. Abre una terminal y navega hasta la carpeta del proyecto.
2. Ejecuta el siguiente comando para crear un nuevo ambiente virtual:

   ```
   python3 -m venv nombre_del_ambiente_virtual
   ```

   Reemplaza `nombre_del_ambiente_virtual` con el nombre que desees darle al ambiente virtual.

3. Activa el ambiente virtual ejecutando el siguiente comando:

   - En Windows:

     ```
     nombre_del_ambiente_virtual\Scripts\activate
     ```

   - En macOS y Linux:

     ```
     source nombre_del_ambiente_virtual/bin/activate
     ```

## Paso 3: Instalar dependencias

Una vez que el ambiente virtual esté activado, puedes instalar las dependencias del proyecto. Asegúrate de estar ubicado en la raíz del proyecto y ejecuta el siguiente comando:

```
pip install -r requirements.txt
```

Este comando instalará todas las dependencias necesarias para ejecutar el proyecto, incluyendo Flask, python-decouple, psycopg2 y flask_cors.

**Nota importante:** Asegúrate de que `requirements.txt` contiene las versiones correctas de las dependencias y que no incluye `decouple`. Si `decouple` está presente en el archivo `requirements.txt`, remuévelo y guarda los cambios antes de ejecutar el comando anterior.

## Paso 4: Configurar variables de entorno

El proyecto puede requerir configuraciones específicas a través de variables de entorno. Para ello, crea un archivo `.env` en la raíz del proyecto y proporciona los valores necesarios para cada variable. Puedes consultar la documentación del proyecto para obtener información sobre las variables de entorno requeridas.

## Paso 5: Ejecutar el proyecto

Una vez que todas las dependencias estén instaladas y las variables de entorno estén configuradas, puedes ejecutar el proyecto. Asegúrate de que estás ubicado en la raíz del proyecto y ejecuta el siguiente comando:

```
python app.py
```

Esto iniciará el servidor Flask y tu proyecto estará disponible en la dirección `http://localhost:5000`.

¡Felicidades! Has instalado y configurado correctamente el proyecto en Flask.

## Integración de la Base de Datos PostgreSQL

El proyecto requiere una base de datos PostgreSQL para su funcionamiento correcto. A continuación, se describen los pasos para configurar la base de datos y crear las tablas necesarias.

Requisitos:

- PostgreSQL (versión 15 o superior)

### Paso 1: Configuración de la Base de Datos

Para comenzar, debes tener una base de datos PostgreSQL instalada en tu equipo. Si aún no la tienes, puedes descargarla desde el sitio oficial de PostgreSQL. 

Una vez instalado PostgreSQL, crea una base de datos llamada 'MusicPro' y establece la contraseña a '1234'. 

### Paso 2: Creación de la Tabla "productos"

Una vez creada la base de datos, debes crear una tabla llamada "productos". Para ello, sigue estos pasos:

1. Abre el navegador de PostgreSQL (PgAdmin, DBeaver, etc.) y navega hasta la sección "Tables" siguiendo esta ruta: Servers / PostgreSQL 15 / Databases / MusicPro / Schemas / public / Tables
2. Haz clic derecho en la sección "Tables" y selecciona "Create" -> "Table".
3. En la nueva ventana, introduce 'productos' como el nombre de la tabla.
4. A continuación, debes agregar las siguientes columnas:

   - idProductos: de tipo 'character varying', con una longitud de 100. Marca la opción "NOT NULL" y establece esta columna como "Primary Key".
   - nombre: de tipo 'character varying', con una longitud de 100. Marca la opción "NOT NULL".
   - precio: de tipo 'integer'. Marca la opción "NOT NULL".
   - descripcion: de tipo 'character varying', con una longitud de 1000. Marca la opción "NOT NULL".
   - imagen: de tipo 'character varying', con una longitud de 100. Marca la opción "NOT NULL".
   - stock: de tipo 'integer'. Marca la opción "NOT NULL".
   - categoria: de tipo 'character varying', con una longitud de 100. Marca la opción "NOT NULL".

5. Una vez que todas las columnas estén agregadas, haz clic en "Save" para crear la tabla.
6. Para ir a la Query con los datos de la base de datos haz click derecho en la tabla "productos" -> Scripts -> SELECT Script
7. Para ejecutar o refrescar la Query puedes usar F5 o hacer click en el boton "Play" de "Execute/Refresh"
8. Recuerda, para agregar productos, es en la URL /agregar/ del proyecto en Flask

¡Felicidades! Has configurado correctamente la base de datos PostgreSQL para el proyecto.

Nota: Recuerda agregar la cadena de conexión a tu base de datos PostgreSQL en el archivo .env. Debes incluir el nombre de la base de datos, el usuario, la contraseña y el host. Consulta la documentación del proyecto para obtener más detalles.

