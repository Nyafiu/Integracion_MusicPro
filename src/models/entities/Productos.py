class Producto:
    def __init__(
        self, idProductos, Nombre=None, Precio=None, Descripcion=None, Imagen=None, Stock=None, Categoria=None
    ) -> None:
        self.idProductos = idProductos
        self.Nombre = Nombre
        self.Precio = Precio
        self.Descripcion = Descripcion
        self.Imagen = Imagen
        self.Stock = Stock
        self.Categoria = Categoria

    def to_json(self):
        return {
            "idProductos": self.idProductos,
            "Nombre": self.Nombre,
            "Precio": self.Precio,
            "Descripcion": self.Descripcion,
            "Imagen": self.Imagen,
            "Stock": self.Stock,
            "Categoria": self.Categoria,
        }

class Saludo:
    def __init__(self, fechaSaludo, Saludos
    ) -> None:
        self.fechaSaludo = fechaSaludo
        self.Saludos = Saludos

    def to_json(self):
        return {
            "fechaSaludo": self.fechaSaludo,
            "Saludos": self.Saludos
        }


    
