from flask import Blueprint, jsonify, request
from models.ProductoModel import ProductoModel
from models.entities.Productos import Producto
import uuid


main = Blueprint("producto_blueprint", __name__)

@main.route("/")
def get_productos():
    try:
        Productos = ProductoModel.get_productos()
        return jsonify(Productos)
    except Exception as ex:
        return jsonify({"mensaje": str(ex)}), 500


@main.route("/<nombre>")
def get_producto(nombre):
    try:
        producto = ProductoModel.get_producto(nombre)
        if producto != None:
            return jsonify(producto)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500

@main.route("/add", methods=["POST"])
def add_producto():
    try:
        Nombre = request.json["nombre"]
        Precio = int(request.json["precio"])
        Descripcion = request.json["descripcion"]
        IdProducto = uuid.uuid4()
        producto = Producto(str(IdProducto), Nombre, Precio, Descripcion)

        affected_rows = ProductoModel.add_producto(producto)

        if affected_rows == 1:
            return jsonify({"id":producto.IdProducto})
        else:
            return jsonify({"Mensaje:": "fallo en la insersion"}), 500
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500








@main.route("/delete/<nombre>", methods=["DELETE"])
def delete_producto(nombre):
    try:
        affected_rows = ProductoModel.delete_producto(nombre)

        if affected_rows == 1:
            return jsonify({nombre})
        else:
            return jsonify({"Mensaje:": "No existe"}), 500
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500


@main.route("/update/<id>", methods=["PUT"])
def update_producto(id):
    try:
        nombre = request.json["Nombre"]
        precio = int(request.json["Precio"])
        descripcion = request.json["Descripcion"]
        imagen = request.json["Imagen"]
        producto = Producto(id, nombre, precio, descripcion, imagen)

        affected_rows = ProductoModel.update_producto(producto)

        if affected_rows == 1:
            return jsonify({producto.IdProducto})
        else:
            return jsonify({"Mensaje:": "Producto no actualizado"}), 500
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500
