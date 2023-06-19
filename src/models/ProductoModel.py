from database.db import get_connection
from .entities.Productos import Producto, BoletaBodega, Boleta
import base64

class ProductoModel:

    @classmethod
    def get_productos(self):
        try:
            connection = get_connection()
            productos = []
            with connection.cursor() as cursor:
                cursor.execute(
                    """SELECT "idProductos", "nombre", "precio", "descripcion", "imagen", "stock", "categoria" FROM public.productos;"""
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    producto = Producto(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
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
                    """SELECT "idProductos", "nombre", "precio", "descripcion", "imagen", "stock", "categoria"
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
	                        "idProductos", "nombre", "precio", "descripcion", "imagen", "stock", "categoria")
	                        VALUES (%s, %s, %s, %s, %s, %s, %s);""",
                    (
                        Producto.idProductos,
                        Producto.Nombre,
                        Producto.Precio,
                        Producto.Descripcion,
                        Producto.Imagen,
                        Producto.Stock,
                        Producto.Categoria,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def add_saludo(self, Saludo):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """INSERT INTO public.saludo("fechaSaludo", "saludo")
	                    VALUES (%s, %s);""",
                    (
                        Saludo.fechaSaludo,
                        Saludo.Saludos,
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
	                        SET nombre=%s, precio=%s, descripcion=%s, imagen=%s, stock=%s, categoria=%s
	                        WHERE "idProductos"=%s;""",
                    (
                        Producto.Nombre,
                        Producto.Precio,
                        Producto.Descripcion,
                        Producto.Imagen,
                        Producto.idProductos,
                        Producto.Stock,
                        Producto.Categoria,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_boleta(self, Boleta):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """INSERT INTO public.boleta(
	                        "idBoleta", "domicilio", "productos", "fechaBoleta", "fechaEntrega", "total")
	                        VALUES (%s, %s, %s, %s, %s, %s);""",
                    (
                        Boleta.idBoleta,
                        Boleta.domicilio,
                        Boleta.productos,
                        Boleta.fechaBoleta,
                        Boleta.fechaEntrega,
                        Boleta.total,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_boleta(self):
        try:
            connection = get_connection()
            boletas = []
            with connection.cursor() as cursor:
                cursor.execute(
                    """SELECT "idBoleta", domicilio, productos, "fechaBoleta", "fechaEntrega", total
                    FROM public.boleta;"""
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    boleta = Boleta(row[0], row[1], row[2], row[3], row[4], row[5])
                    boletas.append(boleta)

            connection.close()
            return boletas
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def add_boletaBodega(self, BoletaBodega):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    """INSERT INTO public."boletaBodega"(
	                "idBoleta", "fechaCompra", productos, total)
	                VALUES (%s, %s, %s, %s);;""",
                    (
                        BoletaBodega.idBoleta,
                        BoletaBodega.productos,
                        BoletaBodega.fechaBoleta,
                        BoletaBodega.total,
                    ),
                )
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)