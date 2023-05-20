from flask import Flask, render_template, request, jsonify, g
from config import config
from routes import Producto
from flask_cors import CORS
import psycopg2


app = Flask(__name__)

CORS(app, resources={"*"})

def get_productos():
    conn = psycopg2.connect(
        dbname="MusicPro",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()
    cur.execute("SELECT * FROM productos")
    productos = cur.fetchall()
    cur.close()
    conn.close()
    return productos

def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(
            dbname="MusicPro",
            user="postgres",
            password="1234",
            host="localhost",
            port="5432"
        )
    return g.db

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("loginCliente.html")

@app.route("/loginAdmin")
def loginAdmin():
    return render_template("loginAdmin.html")

@app.route("/registro")
def registro():
    return render_template("registroCliente.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/shop')
def shop():
    productos = get_productos()
    return render_template('shop.html', productos=productos)

@app.route("/agregar")
def agregar():
    return render_template("agregarProducto.html")

@app.route("/listar")
def listar():
    return render_template("listarProducto.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route('/categorias/<categoria>')
def categorias(categoria):
    cur = get_db().cursor()
    cur.execute('SELECT * FROM productos WHERE categoria = %s', (categoria,))
    productos = cur.fetchall()
    return render_template('shop.html', productos=productos)



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
