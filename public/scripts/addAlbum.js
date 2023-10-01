// function onLoad() {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if(userInfo === null) {
//         console.log('No hay token')
//         // window.location.href = 'http://www.google.com'
//         window.open("../signin.html", "_self"); 
//     } else {
//         console.log('Hay token')
//     }
// }
// import {cerrarSesion} from '../scripts/utils/utils'

// const cerrarSesion = () => {
// }

// import {isAuth} from './scripts/utils/utils.js'

// console.log(isAuth)

// TRAE LA INFO DE LOS ALBUMES
async function obtenerAlbumes(req, res) {
    
    try {
        const data = await axios.get("/albums/vertodoslosalbumes", 
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     }
        // }
         );
         console.log(data.data.albums)
        return data.data.albums        
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}
obtenerAlbumes();

//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUMES.
const display = document.querySelector("#display-data");
const mostrarData = async () => {
    const payload = await obtenerAlbumes();

    let displayData = payload.map((object) => {
        const {titulo, descripcion, portada, lanzamiento, _id} = object;

        let lanzamiento2 = new Date(lanzamiento).getFullYear();
        console.log(lanzamiento2)


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
        `
    }).join("");

    display.innerHTML = displayData;
}   
mostrarData();

const id = document.getElementById('boton-eliminar');
console.log(id);


//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    return addAlbum(objectToSend)
}

// CREÁ EL ÁLBUM
async function addAlbum(objectToSend) {
    
     try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo.token || null
        console.log(token);
        console.log(objectToSend)

        if(userInfo) {
           await axios.post("/albums/crearalbum", objectToSend,
        {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        swal({
          title: "Success!",
          text: "Album added to the collection!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setTimeout(() => {
          location.reload()
        }, 3000);
        // redireccionar a home 
        }
        
      } catch (error) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(!userInfo) {
            swal({
                title: "¡Debes iniciar sesión!",
                text: "Para crear albumes es necesario iniciar sesión!",
                icon: "warning",
                confirmButtonText: "Ok",
              });
        } else {
            swal({
                title: "¡Revisá bien los datos ingresados!",
                text: "Todos los campos son requeridos, revisá que no haya errores.",
                icon: "warning",
                confirmButtonText: "Ok",
              });
        }
        console.log('entra en el error');
        // alerta en caso de error
      }
}


//EVENTO AL HACER SUBMIT AL FORMULARIO
const formularioEliminar = document.getElementById('formulario-eliminar');
formularioEliminar.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues2()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues2() {
    const valoresFormulario = new FormData(formularioEliminar)
    const objectToSend2 = Object.fromEntries(valoresFormulario);
    const id = objectToSend2.id
    return eliminarAlbum(id)
}


// ELIMINA UN ÁLBUM POR ID
     async function eliminarAlbum(id) {
        console.log('Elimina', id, )

        if (window.confirm('Estás seguro que querés eliminar el álbum?')) {

            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo.token || null

                const data = await axios.delete(`/albums/eliminaralbum/${id}`, 
                {
                  headers: {
                      authorization: `Bearer ${token}`,
                  }
                });
                 swal({
                    title: "El álbum fue eliminado correctamente!",
                    // text: "El álbum fue eliminado correctamente!",
                    icon: "success",
                    // confirmButtonText: "Ok",
                  });
                  setTimeout(() => {
                    location.reload()
                  }, 3000);
                  
                 console.log(data)
                // return data.data.albums        
              } catch (error) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if(!userInfo) {
                    swal({
                        title: "¡Debes iniciar sesión!",
                        text: "Tienes que iniciar sesión para eliminar álbumes.",
                        icon: "warning",
                        confirmButtonText: "Ok",
                      });
                } else {
                    swal({
                        title: "¡No existe ningún álbum con ese ID!",
                        text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
                        icon: "warning",
                        confirmButtonText: "Ok",
                      });
                }
                console.log('entra en el error');

              }
        }
        
    }

// function cerrarSesion() {
//     console.log('Se cierra la sesion')
// }


// module.exports = {cerrarSesion}