from flask import Blueprint, jsonify, request, send_file
from models.ProductoModel import ProductoModel
from models.entities.Productos import Producto
import os
import base64
import uuid
import imghdr


main = Blueprint("producto_blueprint", __name__)

@main.route("/")
def get_productos():
    try:
        productos = ProductoModel.get_productos()
        productos_json = [producto.to_json() for producto in productos]
        return jsonify(productos_json)
    except Exception as ex:
        return jsonify({"mensaje": str(ex)}), 500

@main.route("/<nombre>")
def get_producto(nombre):
    try:
        producto = ProductoModel.get_producto(nombre)
        if producto is not None:
            return jsonify(producto)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500



import imghdr

@main.route("/uploads/<Nombre>", methods=["GET"])
def get_imagen_producto(Nombre):
    try:
        ruta_archivo = "static" + "/" + "uploads" + "/" + Nombre

        if os.path.exists(ruta_archivo):
            with open(ruta_archivo, "rb") as archivo:
                imagen_bytes = archivo.read()

            extension = imghdr.what("", h=imagen_bytes)
            # Lista de extensiones permitidas
            extensiones_permitidas = ['jpeg', 'jpg', 'png', 'gif']

            if not extension or extension not in extensiones_permitidas:
                raise ValueError("La imagen proporcionada no tiene una extensión válida o no está permitida.")

            ruta_archivo = os.path.join("static", "uploads", f"{Nombre}.{extension}")

            return send_file(ruta_archivo, mimetype=f"image/{extension}")
        else:
            ruta_marcador = os.path.join("static", "placeholder.jpg")
            return send_file(ruta_marcador, mimetype="image/jpeg")
    except Exception as ex:
        print(str(ex))
        return jsonify({"mensaje": "Error al cargar la imagen"}), 500






@main.route("/add", methods=["POST"])
def add_producto():
    try:
        Nombre = request.json["nombre"]
        Precio = int(request.json["precio"])
        Descripcion = request.json["descripcion"]
        Imagen = request.json["imagen"]  # Cambio en la clave del JSON
        idProductos = str(uuid.uuid4())  # Convertir a cadena el ID generado
        
        # Decodificar la imagen en base64
        imagen_decodificada = base64.b64decode(Imagen)
        
        # Obtener la extensión de la imagen (por ejemplo, .jpg, .png)
        extension = imghdr.what("", h=imagen_decodificada)
        if not extension:
            raise ValueError("La imagen proporcionada no tiene una extensión válida.")
        
        # Guardar la imagen en un archivo en el directorio "uploads"
        nombre_archivo = Nombre + "." + extension
        ruta_archivo = os.path.join("src", "static", "uploads", nombre_archivo)
        with open(ruta_archivo, "wb") as archivo:
            archivo.write(imagen_decodificada)

        producto = Producto(idProductos, Nombre, Precio, Descripcion, nombre_archivo)

        affected_rows = ProductoModel.add_producto(producto)

        if affected_rows == 1:
            return jsonify({"id": producto.idProductos})
        else:
            return jsonify({"Mensaje": "Fallo en la inserción"}), 500
    except Exception as ex:
        return jsonify({"Mensaje": str(ex)}), 500





@main.route("/delete/<idProductos>", methods=["DELETE"])
def delete_producto(idProductos):
    try:
        affected_rows = ProductoModel.delete_producto(idProductos)

        if affected_rows == 1:
            return jsonify({idProductos})
        else:
            return jsonify({"Mensaje:": "No existe"}), 500
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500



@main.route("/update/<idProductos>", methods=["PUT"])
def update_producto(idProductos):
    try:
        nombre = request.json["nombre"]
        precio = int(request.json["precio"])
        descripcion = request.json["descripcion"]
        imagen = request.json["imagen"]
        producto = Producto(idProductos, nombre, precio, descripcion, imagen)

        affected_rows = ProductoModel.update_producto(producto)

        if affected_rows == 1:
            return jsonify({"mensaje": "Producto actualizado exitosamente"})
        else:
            return jsonify({"mensaje": "Producto no actualizado"}), 500
    except Exception as ex:
        return jsonify({"mensaje": str(ex)}), 500

