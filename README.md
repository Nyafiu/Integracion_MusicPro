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

Si tienes alguna pregunta o encuentras algún problema durante la instalación, no dudes en consultar la documentación del proyecto o buscar ayuda en la comunidad de Flask.
