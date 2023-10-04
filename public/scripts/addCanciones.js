//EVENTO AL HACER SUBMIT AL FORMULARIO
const formulario = document.getElementById('formulario-cancion');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('entra')
    getInputValues()
})

// //RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    console.log(objectToSend);
    return addCancion(objectToSend)
}

// CREÁ UNA CANCIÓN
async function addCancion(objectToSend) {
    
     try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo.token || null
        console.log(token);
        console.log(objectToSend)

        if(userInfo) {
           await axios.post("/canciones/crearcancion", objectToSend,
        {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        swal({
          title: "Success!",
          text: "Cancion agregada exitosamente al álbum",
          icon: "success",
          // confirmButtonText: "Ok",
        });
        setTimeout(() => {
          location.reload()
        }, 2000);
        // redireccionar a home 
        }
        
      } catch (error) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(!userInfo) {
            swal({
                title: "¡Debes iniciar sesión!",
                text: "Para agregar canciones es necesario iniciar sesión!",
                icon: "warning",
                // confirmButtonText: "Ok",
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


// TRAE LA INFO DE LOS ALBUMES
async function obtenerCanciones(req, res) {
    
  try {
      const data = await axios.get("/canciones/vertodaslascanciones", 
      // {
      //     headers: {
      //         authorization: `Bearer ${token}`,
      //     }
      // }
       );
       console.log(data.data.length)
       const cantCanciones = data.data.length;

       if(cantCanciones == 1) {
        document.getElementById('cant-canciones').textContent = `(${cantCanciones} canción)`
       } else if (cantCanciones == 0) {
        document.getElementById('cant-canciones').textContent = `Argregá la primer canción al álbum`
       } else {
        document.getElementById('cant-canciones').textContent = `(${cantCanciones} canciones)`
       }

      return data.data       
    } catch (error) {
      console.log('entra en el error');
      // alerta en caso de error
    }
}
obtenerCanciones();

//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUMES.
const display = document.querySelector("#display-data");
const mostrarData = async () => {
  const payload = await obtenerCanciones();

  let displayData = payload.map((object, index) => {
      const {titulo, duracion, _id} = object;
      const indice = index;

      return `
  
              <div class="flex justify-between items-center bg-neutral-900 rounded p-3 mt-2 mb-2 flex hover:bg-gradient-to-r from-neutral-900 to-blue-700 transition ease-in-out delay-25  hover:border-r-2 border-r-sky-900">
            
                  <div class="flex justify-between items-center gap-6">
                      <div>
                        <p class="text-white">${indice + 1 }</p>
                      </div>
                      <div>
                        <p class="text-white text-xl">${titulo}</p>
                        <div class="text-neutral-300">${_id}</div>
                      </div>
                  </div>

                  <div class="">
                      <p class="text-white hidden md:block">${duracion}</p>
                  </div>

                  <div class="flex items-center">
                    <img style="width:60px!important" class="invert cursor-pointer transition ease-in-out delay-25 hover:scale-110" src="./imagenes/play-logo.png" alt="boton-reproducir">
                    <img class="w-8 h-6 md:w-8 md:h-6 md:me-4 cursor-pointer transition ease-in-out delay-25 hover:scale-110" src="./imagenes/youtube-logo.png" alt="boton-escuchar-en-youtube">
                  </div>
                  

              </div>

            
      `
  }).join("");

  display.innerHTML = displayData;
}   
mostrarData();


//EVENTO AL HACER SUBMIT AL FORMULARIO
const formularioEliminar = document.getElementById('formulario-eliminar-cancion');
formularioEliminar.addEventListener('submit', function (e) {
    e.preventDefault()
    getInputValues2()
})

//RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO
function getInputValues2() {
    const valoresFormulario = new FormData(formularioEliminar)
    const objectToSend2 = Object.fromEntries(valoresFormulario);
    const id = objectToSend2.id
    return eliminarCancion(id)
}

const id = document.getElementById('boton-eliminar');
console.log(id);

// ELIMINA UNA CANCION POR ID
     async function eliminarCancion(id) {
        console.log('Elimina', id, )

        if (window.confirm('Estás seguro que querés eliminar esta canción?')) {

            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo.token || null

                const data = await axios.delete(`/canciones/eliminarcancion/${id}`, 
                {
                  headers: {
                      authorization: `Bearer ${token}`,
                  }
                });
                 swal({
                    title: "La canción fue eliminada correctamente!",
                    // text: "El álbum fue eliminado correctamente!",
                    icon: "success",
                    // confirmButtonText: "Ok",
                  });
                  setTimeout(() => {
                    location.reload()
                  }, 2000);
                  
                 console.log(data)
                // return data.data.albums        
              } catch (error) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if(!userInfo) {
                    swal({
                        title: "¡Debes iniciar sesión!",
                        text: "Tienes que iniciar sesión para eliminar canciones.",
                        icon: "warning",
                        confirmButtonText: "Ok",
                      });
                } else {
                    swal({
                        title: "¡No existe ningúna canción con ese ID!",
                        text: "Revisá tu id, no existe ningúna canción en este disco con ese ID.",
                        icon: "warning",
                        confirmButtonText: "Ok",
                      });
                }
                console.log('entra en el error');

              }
        }
        
    }