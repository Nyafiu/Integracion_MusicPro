from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/search')
def search():
    query = request.args.get('q', '')
    # Realizar la búsqueda en función de la consulta (variable "query")
    # Luego, renderiza la plantilla de resultados de búsqueda
    return render_template('search_results.html', query=query)



if __name__ == '__main__':
    app.run(debug=True)