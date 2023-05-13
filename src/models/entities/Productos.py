class Producto:
    def __init__(
        self, IdProducto, Nombre=None, Precio=None, Descripcion=None, Imagen=None
    ) -> None:
        self.IdProducto = IdProducto
        self.Nombre = Nombre
        self.Precio = Precio
        self.Descripcion = Descripcion
        self.Imagen = Imagen

    def to_json(self):
        return {
            "IdProducto": self.IdProducto,
            "Nombre": self.Nombre,
            "Precio": self.Precio,
            "Descripcion": self.Descripcion,
            "Imagen": self.Imagen,
        }
