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
        idProductos = uuid.uuid4()
        producto = Producto(str(idProductos), Nombre, Precio, Descripcion)

        affected_rows = ProductoModel.add_producto(producto)

        if affected_rows == 1:
            return jsonify({"id":producto.idProductos})
        else:
            return jsonify({"Mensaje:": "fallo en la insersion"}), 500
    except Exception as ex:
        return jsonify({"Mensaje:": str(ex)}), 500

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

