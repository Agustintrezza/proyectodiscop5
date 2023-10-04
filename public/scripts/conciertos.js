const userInfo = JSON.parse(localStorage.getItem('userInfo'));

if(userInfo) {
    document.getElementById('alerta-sesion').style.display = "none";
}

const user = JSON.parse(localStorage.getItem('userInfo'))
document.getElementById('container-cerrar-sesion-conciertos').style.visibility = "hidden";
// document.getElementById('logo-p5').style.display= 'none';
document.getElementById('logo-p5-conciertos').style.display= 'none';



console.log(user)
if(user) {
        console.log('hay usuario')
        // document.getElementById('logo-p5').style.display= 'block';
        document.getElementById('logo-p5-conciertos').style.display= 'block';

        // document.getElementById('alerta-sesion').style.display = "none"

        // document.getElementById('container-cerrar-sesion').style.visibility = "visible"
        document.getElementById('container-cerrar-sesion-conciertos').style.visibility = "visible"

        // document.getElementById('container-sin-sesion').style.display = "none"
        document.getElementById('container-sin-sesion-conciertos').style.display = "none"

        document.getElementById('nombre-usuario').textContent = user.email;
    } 


//EVENTO AL HACER SUBMIT AL FORMULARIO PARA MODIFICAR EL CUPO INICIAL DEL CONCIERTO
const formulario = document.getElementById('formulario-tickets');
formulario.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('entra')
    getInputValues2()
})

// //RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO DE MODIFICAR CUPO DE CONCIERTOS
function getInputValues2() {
    const valoresFormulario = new FormData(formulario)
    const objectToSend = Object.fromEntries(valoresFormulario);
    console.log(objectToSend);
    return addConcierto2(objectToSend)
}

// EDITÂ UN LA CANTIDAD DE CUPO DEL CONCIERTO
async function addConcierto2(objectToSend) {
    console.log(objectToSend.id)
    const hola = (objectToSend.id)
    console.log('Hola',hola)

     try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo.token || null
        console.log(token);


        if(userInfo) {
           await axios.put(`/conciertos/actualizar-cupo/${hola}`, objectToSend,
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     }
        // }
        )
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
async function obtenerConciertos(req, res) {
    
    try {
        const data = await axios.get("/conciertos/vertodoslosconciertos", 
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     }
        // }
         );
         console.log(data)
        return data.data.conciertos      
      } catch (error) {
        console.log('entra en el error');
        // alerta en caso de error
      }
}
obtenerConciertos();



//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUMES.
const display = document.getElementById("display-data-conciertos");
const mostrarData = async () => {
    const payload = await obtenerConciertos();

    let displayData = payload.map((object, index) => {
        const {conjunto, precio, estadio, fecha, ticketsdisponibles, politicademenores, imagen, _id} = object;

        let fechaReducida = new Date(fecha); 

        const fechaformat = fechaReducida.toLocaleString('es-ES', {dateStyle: 'full'})

        // console.log(object)

        return `
            <div class="flex p-4 m-auto cursor-pointer hover:bg-neutral-800">

                <div class="flex flex-col p-1">
                <img class="w-full h-40 rounded-t-lg" src="${imagen}"/>
            
                    <p class="text-white text-4xl mt-2">${conjunto}</p>
                    <p class="text-white text-3xl">${estadio}</p>

                    <div class="flex my-1">
                        <img class="w-4 h-4 md:w-5 md:h-5 me-3 invert" src="./imagenes/icono-calendario.png" alt="icono-calendario">
                        <p class="text-white">${fechaformat}</p>
                    </div>

                    <div class="flex my-1">
                        <img class="w-4 h-4 md:w-5 md:h-5 me-3 invert" src="./imagenes/icono-ticket.png" alt="icono-calendario">
                        <p class="text-white mb-2">tickets disponibles: ${ticketsdisponibles}</p>
                    </div>
                    
                    <p class="text-white mt-1 mb-4">id: ${_id}</p>
                  
                </div>

                
                
            </div>
        `
    }).join("");

    display.innerHTML = displayData;
}   
mostrarData();


//EVENTO AL HACER SUBMIT AL FORMULARIO PARA MODIFICAR EL CUPO INICIAL DEL CONCIERTO
const formulario2 = document.getElementById('formulario-descuentocantidades');
formulario2.addEventListener('submit', function (e) {
    e.preventDefault()
    // console.log('entra')
    getInputValues()
})

// //RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO DE MODIFICAR CUPO DE CONCIERTOS
function getInputValues() {
    const valoresFormulario = new FormData(formulario2)
    const objectToSend = Object.fromEntries(valoresFormulario);
    console.log(objectToSend);
    return addConcierto(objectToSend)
}

// EDITÂ UN LA CANTIDAD DE CUPO DEL CONCIERTO
async function addConcierto(objectToSend) {
    console.log(objectToSend.id)
    const id = (objectToSend.id)
    console.log('Hola',id)

     try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo.token || null
        console.log(token);


        if(userInfo) {
           await axios.put(`/conciertos/descontarcantidad/${id}`, objectToSend,
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     }
        // }
        )
        swal({
          title: "Success!",
          text: "Compra realizada exitosamente al álbum",
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



const id = document.getElementById('boton-eliminar');
console.log(id);
