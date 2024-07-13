
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time
from catalogo import Catalogo

app = Flask(__name__, static_folder='/home/CafeCentral/CaC_TPF_Full-Stack_Python/static')

#CORS(app) <-- Habilitar para todas las conexiones
CORS(app, resources={r"/*": {"origins": "https://cafe-central-crud-app.netlify.app"}})

# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host='CafeCentral.mysql.pythonanywhere-services.com', user='CafeCentral', password='dbproductos', database='CafeCentral$cafecentral')

# Carpeta para guardar las imagenes
ruta_destino = '/home/CafeCentral/CaC_TPF_Full-Stack_Python/static/imagenes'


# Crear rutas para las operaciones CRUD
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = catalogo.listar_productos()
    return jsonify(productos)

@app.route("/productos/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    producto = catalogo.consultar_producto(codigo)
    if producto:
        return jsonify(producto), 201
    else:
        return "Producto no encontrado", 404

@app.route("/productos", methods=["POST"])
def agregar_producto():
    #Recoger datos del formulario
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    imagen = request.files['imagen']
    categoria = request.form['categoria']
    # Generar nombre de la imagen
    nombre_imagen=""
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    nuevo_codigo = catalogo.agregar_producto(nombre, descripcion, precio, nombre_imagen, categoria)
    if nuevo_codigo:
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "Producto agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al agregar el producto."}), 500

@app.route("/productos/<int:codigo>", methods=["PUT"])
def modificar_producto(codigo):
    #Recoger dato/s actualizado/s del formulario
    nuevo_nombre = request.form.get("nombre")
    nueva_descripcion = request.form.get("descripcion")
    nuevo_precio = request.form.get("precio")
    nueva_categoria = request.form.get("categoria")

    # Verificar si se proporcionó una nueva imagen
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        # Procesar imagen
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        # Guardar imagen en el servidor
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        # Buscar producto guardado
        producto = catalogo.consultar_producto(codigo)
        if producto:
            # Si existe el producto, armar la ruta a la imagen
            imagen_vieja = producto["imagen_url"]
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)
            # Y eliminar la imagen_vieja asociada si existe
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
    else:
        # Si no se proporciona una nueva imagen, usar la imagen existente del producto
        producto = catalogo.consultar_producto(codigo)
        if producto:
            nombre_imagen = producto["imagen_url"]

    # Se llama al método modificar_producto pasando el codigo del producto y los nuevos datos.
    if catalogo.modificar_producto(codigo, nuevo_nombre, nueva_descripcion, nuevo_precio, nombre_imagen, nueva_categoria):
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

@app.route("/productos/<int:codigo>", methods=["DELETE"])
def eliminar_producto(codigo):
    producto = catalogo.consultar_producto(codigo)
    if producto:
        # Si el producto existe, verificar si hay una imagen asociada en el servidor
        imagen_vieja = producto["imagen_url"]
        # Construir la ruta completa a la imagen
        ruta_imagen = os.path.join(ruta_destino, imagen_vieja)
        # Y si existe, la elimina del sistema de archivos
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        # Eliminar producto del catálogo
        if catalogo.eliminar_producto(codigo):
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el producto"}), 500
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)


