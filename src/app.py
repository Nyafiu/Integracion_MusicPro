from flask import Flask, render_template, request
from config import config
from routes import Producto
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={"*"})


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/shop")
def shop():
    return render_template("shop.html")

@app.route("/agregar")
def agregar():
    return render_template("agregarProducto.html")

@app.route("/listar")
def listar():
    return render_template("listarProducto.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/search")
def search():
    query = request.args.get("q", "")
    # Realizar la búsqueda en función de la consulta (variable "query")
    # Luego, renderiza la plantilla de resultados de búsqueda
    return render_template("search_results.html", query=query)


@app.errorhandler(404)
def error404(error):
    return render_template('page404.html'), 404


if __name__ == "__main__":
    # Forma mas practica de tener el modo debug activo (acordarse de desactivarlo al finalizar la app)
    app.config.from_object(config["development"])
    app.register_error_handler(404, error404)

    # Blueprint
    app.register_blueprint(Producto.main, url_prefix="/api/productos")
    app.run()
