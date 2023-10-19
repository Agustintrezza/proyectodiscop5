# **Proyecto DISCO Agustin Trezza**

### Mi nombre es Agustin Trezza, y este es mi proyecto final del curso introductorio fullstack de Plataforma 5. Año 2023.


## PASOS PARA EJECUTAR EL PROYECTO

* 1 -  Descargar la carpeta del repositorio de Github aquí ().
* 2 - Abrir la carpeta con Visual Studio Code.
* 3 - Posicionarse usando la terminal, dentro de la carpeta del proyecto y  ejecutar el comando _**"npm install"**_ para instalar módulos de Node.
* 4 - Luego ejecutar _**"npm start"**_, para correr el proyecto.

## BREVE DECRIPCIÓN DEL PROYECTO

El proyecto es una aplicación fullstack, hecha con las tecnologías y herramientas vistas a lo largo del curso (JavaScript, HTML5, CSS3, Node, MongoDb, Express, JWToken, Tailwind, Github, Render). 
El mismo está enfocado en una aplicación musical, en donde el usuario podrá, ver la portada de un artista, ver los álbums agregados con toda su información. También, ver fechas de conciertos próximos con su información y disponibilidades de cupos.
 

**El usuario podrá y deberá, crear una cuenta e iniciar sesión en ella para poder: ver, subir y eliminar sus álbums musicales, agregar y eliminar canciones a un álbum, ver fechas para conciertos, modificar el cupo de los mismos y adquirir tickets.**


## FUNCIONALIDADES Y ESTRUCTURA

EL PROYECTOS PODRÍAMOS SEPARARLO EN:  **FRONTEND, BACKEND, GENERALES Y DEPLOY**.


### **FRONTEND:**(5 landings: /, /addalbum, /tours, /signin, /signup).

_**/ (Home del álmun)**_ : Se armo y dió estilos al contenido del álbum "Bocanada", con HTML, Talwind, Javascript y CSS. Está parte del sitio muestra las canciones del álbum, permite sólo si el usuario inicia sesión, agregar y eliminar canciones al álbum a través de formularios con validaciones.

Los archivos de esta sección del sitio son: **public/index.html y public/scripts/addCanciones.js**

_**/addAlbum**_ : Se armó un formulario con campos validados para agregar un nuevo álbum en la aplicación. Se recibe la información del backend y se muestra en el navegador.
Es posible eliminar un álbum usando el ID del mismo como referencia, el usuario debe iniciar sesión para usar estas funcionalidades.

Los archivos de esta sección del sitio son: **public/addAlbum.html y public/scripts/addAlbums.js**

_**/tours**_ : Se muestran próximos conicertos de artistas, se recibe y se muestra la información de los conciertos. El usuario debe iniciar sesión para modificar los lugares disponibles en los conciertos y adquirir tickets que modifican la cantidad de lugares disponibles. Esto se hace a través de formularios con validaciones.
Los archivos de esta sección del sitio son: **public/tours.html y public/scripts/conciertos.js**

_**/signup**__ : Se armó un formulario en donde el usuario puede completar con sus datos para crear una cuenta. Usando JasonWebToken creamos un token para el usuario y lo guardamos junto con la información del formulario, en la colección USER de MONGODB.

Los archivos de esta sección del sitio son: **public/signin.html y public/scripts/signin.js**

_**/signin**_ : Se armó un formulario para que el usuario pueda iniciar sesión. Una vez ingresa a su cuenta puede utilizar todas las funcionlidades de la aplicación.

Los archivos de esta sección del sitio son: **public/signup.html y public/scripts/signup.js**

**RECURSOS DEL FRONTEND:**
Imágenes, iconos y logos del proyecto en dentro de las carpetas **public/imagenes y public/imagenesBocanada**.



### **BACKEND (SERVIDOR Y BASE)**

_**archivo server.js**_
Se instala Express, se requieren y declaran las dependencias necesarias. Se definen las rutas, se conecta la base de datos y se define el PUERTO e inicio del servidor.

_**Carpeta "models"**_
Se modelan y definen las estructuras para almacenar la información en la aplicación. Usando Mongoose definimos un Schema y luego exportamos el módulo para disponibilizarlo y utilizarlo.

_**Carpeta "Routes"_**
Se crean utilizando Express, las rutas de la aplicación, donde a través de estas, aplicamos la lógica necesaria para almacenar la información en la base de datos.



### **GENERALES**

_**archivo utils.js -> public/utils/utils.js**_
Se usa JWT para verificar la sesión del usuario en la aplicación. A través de este archivo la disponibilizamos y luego la utilizamos en la toda aplicación.

_**archivo .env**_
Se crearon variables de entorno para JWTOKEN, MONDODB y el PUERTO.

_**acrchivo .gitignore**_
Se excluyen todos los documentos y archivos que no queremos subir a nuestro repositorio de GitHub.

_**package.json**_
Se pueden ver todas las dependencias que utilizamos, se define script de inicio.



### **DEPLOY**

El deploy de la aplicación está hecho en RENDER.

* Para utilizar MONGODB usamos MondoDb Atlas. El repositorio del proyecto lo creamos y subimos en GITHUB. La aplicación la hicimos usando Visual Studio Code.



## AGRADECIMIENTOS

### Principalmente a nuestro profesor, Mauricio Cox, por toda la info, la claridad en la explicación, la predisposición y el apoyo y la buena onda durante toda la cursada. GRACIAS!. También a lxs compañerxs del curso, que fue muy bueno conocernos, comprartir la cursada, ayudarnos, apoyarnos y pasarnos mucha data.
### A plataforma 5 por la experiencia, y toda la información en la cursada.


SALUDOS AGUSTIN.
