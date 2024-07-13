import mysql.connector

class Catalogo:
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Establecer una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
    # Seleccionar base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si no existe, crear la base de datos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
    # Una vez establecida la base de datos, crear la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(125) NOT NULL,
            descripcion VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            categoria VARCHAR(80) NOT NULL)''')
        self.conn.commit()
    # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    # Operaciones CRUD
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos

    def consultar_producto(self, codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    def agregar_producto(self, nombre, descripcion, precio, imagen, categoria):
        sql = "INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria) VALUES (%s, %s, %s, %s, %s)"
        valores = (nombre, descripcion, precio, imagen, categoria)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    def modificar_producto(self, codigo, nuevo_nombre, nueva_descripcion, nuevo_precio, nueva_imagen, nueva_categoria):
        sql = "UPDATE productos SET nombre = %s, descripcion = %s, precio = %s, imagen_url = %s, categoria = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nueva_descripcion, nuevo_precio, nueva_imagen, nueva_categoria, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0