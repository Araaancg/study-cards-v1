# Proyecto Final - Arancha Carpintero Guardiola

Este repositorio corresponde al proyecto final del curso de CICE de programación avanzada en Python. 

Mi proyecto final consiste en una página web que tiene como objetivo agilizar los métodos de estudio mediante el uso de **flashcards**. Estas tarjetas permiten estudiar términos, vocabulario, fechas y eventos que sean necesarios para un examen, trabajo o simple curiosidad. 

### Descripción

Como usuario, puedes crear las **flashcards** con la información que deseas estudiar en ambas caras. Por ejemplo, si tienes que estudiar los **phrasal verbs**, en el lado A pondrías el **phrasal verb** y en el lado B pondrías su significado o traducción. Una vez creadas las flashcards, puedes ir al apartado de **aprendizaje** para comenzar a estudiar.

La página web también te permite agrupar las tarjetas en **paquetes** a los que puedes poner un nombre y asociar una categoría. Por ejemplo, podrías crear un paquete llamado **"Phrasal Verbs"** con la categoría **"Vocabulario de inglés"**, de manera que puedas tener todos los contenidos organizados en un solo lugar.

### Tecnologías utilizadas

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript (Vanilla, sin frameworks)
  
- **Backend**:
  - **Flask**: Framework web utilizado para el desarrollo del backend.
  
- **Base de datos**:
  - **MySQL**: Base de datos utilizada para almacenar la información de los usuarios, flashcards, paquetes y categorías.
  
- **Librerías**:
  - `Flask`
  - `requests`
  - `flask_sqlalchemy` (usada como ORM para interactuar con la base de datos)

### Requisitos

#### Librerías externas a instalar

1. Crea un entorno virtual:
   ```bash
   python3 -m venv venv
   ```

2. Instala las librerías necesarias:
   ```bash
   pip install flask requests flask_sqlalchemy
   ```

#### Ejecutar el proyecto

1. Descarga todo el proyecto y colócalo en tu máquina local.

2. Navega hasta la carpeta del proyecto desde la terminal.

3. Ejecuta el archivo `main.py` para iniciar la aplicación:
   ```bash
   python main.py
   ```

4. Accede al proyecto desde tu navegador visitando la siguiente URL:
   ```
   http://localhost:5000/welcome
   ```

Desde ahí, podrás acceder a todas las funcionalidades del proyecto.

### Usuarios pre-creados

- **test1**: 
  - Correo: `test1@email.com`
  - Contraseña: `1234`
  
- **test2**: 
  - Correo: `test2@email.com`
  - Contraseña: `1234`

### Notas adicionales

- El proyecto está diseñado para ser una herramienta sencilla y eficiente para estudiar mediante flashcards, y está completamente desarrollado con tecnologías web estándar.
- La base de datos MySQL almacena la información de las tarjetas, usuarios y categorías, lo que permite que el sistema sea flexible y escalable.