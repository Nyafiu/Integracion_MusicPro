Integración_MusicPro
Este repositorio contiene el código para una API web que maneja información de productos almacenados en una base de datos PostgreSQL. La API utiliza Flask como framework para crear las rutas.

Estructura de carpetas
Database
El archivo db.py contiene una función que intenta establecer una conexión a una base de datos PostgreSQL utilizando los parámetros de configuración especificados en un archivo .env o en variables de entorno. Si la conexión falla, el código captura y vuelve a lanzar una excepción para que sea manejada por el código que llama a la función.

Models
El archivo producto_model.py define una clase llamada ProductoModel que contiene métodos para interactuar con la tabla de productos en la base de datos. Los métodos se encargan de realizar consultas a la base de datos, como obtener todos los productos o agregar un nuevo producto. La clase utiliza una función personalizada llamada get_connection para establecer una conexión con la base de datos y utiliza el cursor de la conexión para realizar las consultas. Si ocurre algún error, se captura y se vuelve a lanzar una excepción para que sea manejada por el código que llama a los métodos.

Entities
El archivo producto.py define una clase llamada Producto con un constructor que inicializa sus atributos y un método to_json que devuelve un diccionario que representa los atributos de la instancia en formato JSON. El constructor toma cinco argumentos: idProducto, nombre, precio, descripcion e imagen. El atributo idProducto es obligatorio, mientras que los demás son opcionales y pueden ser None. La clase también tiene atributos correspondientes a cada uno de los argumentos del constructor. El método to_json simplemente devuelve un diccionario que contiene todos los atributos de la instancia.

Routes
El archivo routes.py contiene un conjunto de rutas de una API web construida con Flask que maneja la información de productos almacenados en la tabla de productos en la base de datos.

La primera ruta GET /productos devuelve una lista de todos los productos en la base de datos. La segunda ruta GET /producto/<nombre> devuelve un solo producto según el nombre proporcionado. La tercera ruta POST /producto agrega un nuevo producto a la base de datos. La cuarta ruta DELETE /producto/<nombre> elimina un producto existente de la base de datos según el nombre proporcionado. La última ruta PUT /producto/<idProducto> actualiza un producto existente en la base de datos según el idProducto proporcionado.

En cada una de las rutas, se llama a un método de la clase ProductoModel para realizar las operaciones en la base de datos. Además, se usa la clase Producto para crear instancias de objetos de producto con las propiedades especificadas.

Archivo .env
El archivo .env es un archivo de configuración que almacena variables de entorno utilizadas por la aplicación. En este caso, el archivo .env contiene las siguientes variables:

SECRET_KEY: se refiere a una contraseña que se utiliza para cifrar y descifrar información confidencial en la aplicación.
PGSQL_HOST: es la dirección del servidor de base de datos utilizado por la aplicación.
PGSQL_USER: es el nombre de usuario utilizado para acceder a la base de datos.
PGSQL_PASSWORD: es la contraseña del usuario utilizado para acceder a la base de datos.
