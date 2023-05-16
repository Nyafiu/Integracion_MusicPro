from database.db import get_connection
from .entities.Productos import Producto
import base64

class ProductoModel:

    @classmethod
    def get_productos(self):
        try:
            connection = get_connection()
            productos = []
            with connection.cursor() as cursor:
                cursor.execute(
                    """SELECT "idProductos", "nombre", "precio", "descripcion", "imagen" FROM public.productos;"""
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    producto = Producto(row[0], row[1], row[2], row[3], row[4])
                    productos.append(producto)

            connection.close()
            return productos
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_producto(self, nombre):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """SELECT "idProductos", "nombre", "precio", "descripcion", "imagen"
                                FROM public.productos WHERE "nombre" = %s""",
                    (nombre,),
                )
                row = cursor.fetchone()

                producto = None
                if row is not None:
                    imagen_base64 = row[4]
                    imagen_bytes = base64.b64decode(imagen_base64)
                    producto = Producto(row[0], row[1], row[2], row[3], imagen_bytes)
                    producto = producto.to_json()
            connection.close()
            return producto
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_producto(self, Producto):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """INSERT INTO public.productos(
	                        "idProductos", "nombre", "precio", "descripcion", "imagen")
	                        VALUES (%s, %s, %s, %s, %s);""",
                    (
                        Producto.idProductos,
                        Producto.Nombre,
                        Producto.Precio,
                        Producto.Descripcion,
                        Producto.Imagen,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_producto(self, idProductos):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """DELETE FROM public.productos
	                            WHERE "idProductos" = %s;""",
                    (idProductos,),
                )

                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
        


    @classmethod
    def update_producto(self, Producto):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """UPDATE public.productos
	                        SET nombre=%s, precio=%s, descripcion=%s, imagen=%s
	                        WHERE "idProductos"=%s;""",
                    (
                        Producto.Nombre,
                        Producto.Precio,
                        Producto.Descripcion,
                        Producto.Imagen,
                        Producto.idProductos,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
