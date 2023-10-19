// TRAE LA INFO DE LOS ALBUMES
async function obtenerAlbumes(req, res) {
  try {
    const data = await axios.get("/albums/vertodoslosalbumes");
    console.log(data.data.albums);
    return data.data.albums;
  } catch (error) {
    console.log("entra en el error");
    // alerta en caso de error
  }
}
obtenerAlbumes();

//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUMES
const display = document.querySelector("#display-data");
const mostrarData = async () => {
  const payload = await obtenerAlbumes();

  let displayData = payload
    .map((object) => {
      const { titulo, descripcion, portada, lanzamiento, _id } = object;

      let lanzamiento2 = new Date(lanzamiento).getFullYear();
      // console.log(lanzamiento2);

      return `
            <div class="flex p-2 m-auto">

                <div class="flex flex-col p-1">
                    <p class="text-white text-3xl">${titulo}</p>
                    <p class="text-white">${descripcion}</p>
                    <p class="text-white mb-4">(${lanzamiento2})</p>
                    <img class="w-full w-70 h-70" src="${portada}"/>
                    <p class="text-white mt-1 mb-4">id: ${_id}</p>

                </div>
                
            </div>
        `;
    })
    .join("");

  display.innerHTML = displayData;
};
mostrarData();

const id = document.getElementById("boton-eliminar");
// console.log(id);

//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  getInputValues();
});

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
  const valoresFormulario = new FormData(formulario);
  const objectToSend = Object.fromEntries(valoresFormulario);
  return addAlbum(objectToSend);
}
// CREÁ EL ÁLBUM
async function addAlbum(objectToSend) {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.token || null;
    // console.log(token);
    console.log(objectToSend.descripcion);

    if (userInfo) {
      if(objectToSend.descripcion.length < 5 || objectToSend.descripcion.length > 200) {
        swal({
          title: "LA DESCRIPCIÓN DEBE CONTENER ENTRE 5 Y 200 CARACTERES",
          text: "Para crear albumes es necesario iniciar sesión.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return
      } else {
        await axios.post("/albums/crearalbum", objectToSend, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        swal({
          title: "SE AGREGÓ LA CANCIÓN AL ALBUM",
          text: "Se agrego correctamente la canción.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
      }
     
  } catch (error) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      swal({
        title: "DEBES INICIAR SESIÓN",
        text: "Para crear albumes es necesario iniciar sesión.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      swal({
        title: "REVISÁ BIEN LOS DATOS INGRESADOS",
        text: "Todos los campos son requeridos, revisá que no haya errores.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
    console.log("entra en el error");
  }
}

//EVENTO AL HACER SUBMIT AL FORMULARIO
const formularioEliminar = document.getElementById("formulario-eliminar");
formularioEliminar.addEventListener("submit", function (e) {
  e.preventDefault();
  getInputValues2();
});

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues2() {
  const valoresFormulario = new FormData(formularioEliminar);
  const objectToSend2 = Object.fromEntries(valoresFormulario);
  const id = objectToSend2.id;
  return eliminarAlbum(id);
}

// ELIMINA UN ÁLBUM POR ID
async function eliminarAlbum(id) {

  if(id.length != 24) {
    swal({
      title: "EL ID DEBE CONTENER 24 CARACTERES Y SER FORMATO ID",
      text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return
  } else {
    if (window.confirm("¿Éstas segurx que querés eliminar este álbum?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo.token || null;
  
        const data = await axios.delete(`/albums/eliminaralbum/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        swal({
          title: "EL ÁLBUM FUE ELIMINADO CORRECTAMENTE",
          icon: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);

      } catch (error) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
          swal({
            title: "DEBES INICIAR SESIÓN",
            text: "Tienes que iniciar sesión para eliminar álbumes.",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        } else {
          swal({
            title: "NO EXISTE NINGUN ÁLBUM CON ESE ID",
            text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        console.log("entra en el error");
      }
    }
  } 
}



