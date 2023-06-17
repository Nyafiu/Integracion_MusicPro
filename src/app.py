from flask import Flask, g, render_template, request, jsonify
from config import config
from routes import Producto
from flask_cors import CORS
from operator import itemgetter
import psycopg2


app = Flask(__name__)

CORS(app, resources={"*"})


def get_productos(page=1, per_page=10):
    conn = psycopg2.connect(
        dbname="MusicPro",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()
    offset = (page - 1) * per_page
    cur.execute("SELECT * FROM productos LIMIT %s OFFSET %s", (per_page, offset))
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

@app.route('/consumir')
def consumir_app_express():
    import requests
    try:
        #en response hay que cambiar la url segun corresponde
        response = requests.get('https://fce7-2800-150-124-1e82-d9df-7b23-279-e87b.ngrok-free.app/saludo')
        resultado = response.text
        # Realiza cualquier operación adicional con la variable 'resultado' aquí
        return resultado
    except requests.exceptions.RequestException:
        return 'Error al consumir la API de Express.'
    
@app.route('/mostrar_resultado')
def mostrar_resultado():
    resultado = consumir_app_express()  # Llamada a la función existente para obtener 'resultado'
    return render_template('resultado.html', resultado=resultado)


@app.route('/saludo', methods=['GET'])
def obtener_saludo():
    return 'Hola'

@app.route("/apiPrueba")
def apiPrueba():
    return render_template("apiSaludo.html")



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("loginCliente.html")

@app.route("/loginAdmin")
def loginAdmin():
    return render_template("loginAdmin.html")

@app.route("/admin")
def admin():
    return render_template("vistaAdmin.html")

@app.route("/tables")
def tables():
    return render_template("tables.html")

@app.route("/perfilAdmin")
def user():
    return render_template("perfilAdmin.html")

@app.route("/registro")
def registro():
    return render_template("registroCliente.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route('/shop', methods=['GET', 'POST'])
def shop():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    productos = get_productos(page, per_page)

    if request.method == 'POST':
        sort_option = request.form.get('sort_option','')  # asumimos que este es el nombre de tu select input en tu formulario

        if sort_option == "Destacado":
            # ordenar por destacados
            # esto dependerá de cómo estén estructurados tus datos
            pass
        elif sort_option == "De la A a la Z":
            # ordenar alfabéticamente
            productos.sort(
                key=itemgetter(1))  # asumiendo que el nombre del producto es el segundo elemento en cada tupla
        elif sort_option == "Por categoría":
            # ordenar por categoría
            productos.sort(
                key=itemgetter(5))  # asumiendo que la categoría del producto es el sexto elemento en cada tupla

    return render_template('shop.html', productos=productos, page=page, per_page=per_page)

@app.route("/agregar")
def agregar():
    return render_template("agregarProducto.html")

@app.route("/listar")
def listar():
    return render_template("listarProducto.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/bodega")
def bodega():
    return render_template("bodega.html")

@app.route("/tienda")
def tienda():
    return render_template("tienda.html")

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