//EVENTO AL HACER SUBMIT AL FORMULARIO PARA MODIFICAR EL CUPO INICIAL DEL CONCIERTO
const formulario = document.getElementById("formulario-tickets");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("entra");
  getInputValues2();
});

// //RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO DE MODIFICAR CUPO DE CONCIERTOS
function getInputValues2() {
  const valoresFormulario = new FormData(formulario);
  const objectToSend = Object.fromEntries(valoresFormulario);
  console.log(objectToSend);
  return addConcierto2(objectToSend);
}

// EDITÂ UN LA CANTIDAD DE CUPO DEL CONCIERTO
async function addConcierto2(objectToSend) {
  console.log(objectToSend.id);
  const hola = objectToSend.id;
  console.log("Hola", hola);

  if(hola.length != 24) {
    swal({
      title: "¡El ID debe contener 24 caracteres y ser de fromato ID!",
      text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return 
    } else {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo.token || null;
        console.log(token);
    
        if (userInfo) {
          await axios.put(`/conciertos/actualizar-cupo/${hola}`, objectToSend, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          swal({
            title: "MODIFICACIÓN EXITOSA",
            text: "¡Modificaste la cantidad de tickets correctamente!",
            icon: "success",
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } catch (error) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
          swal({
            title: "¡DEBES INICIAR SESIÓN!",
            text: "Para adquirir tickets o modificar el cupo de los conciertos es necesario iniciar sesión!",
            icon: "warning",
          });
        } else {
          swal({
            title: "¡No existe ningún álbum con ese ID!",
            text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        console.log("entra en el error");
      }
    }
}

// TRAE LA INFO DE LOS ALBUMES
async function obtenerConciertos(req, res) {
  try {
    const data = await axios.get("/conciertos/vertodoslosconciertos");
    return data.data.conciertos;
  } catch (error) {
    console.log("entra en el error");
  }
}
obtenerConciertos();

//ARMA EL TEMPLATE Y RENDERIZA TODOS LOS ALBUMES.
const display = document.getElementById("display-data-conciertos");
const mostrarData = async () => {
  const payload = await obtenerConciertos();

  let displayData = payload
    .map((object, index) => {
      const {
        conjunto,
        precio,
        estadio,
        fecha,
        ticketsdisponibles,
        politicademenores,
        imagen,
        _id,
      } = object;

      let fechaReducida = new Date(fecha);

      const fechaformat = fechaReducida.toLocaleString("es-ES", {
        dateStyle: "full",
      });

      if (ticketsdisponibles === 0) {
        console.log("hay uno");
        var ticketsdisponiblesFiltrados = "NO QUEDAN TICKETS DISPONIBLES";
      } else {
        console.log("no hay ninguno");
        var ticketsdisponiblesFiltrados = ticketsdisponibles;
      }

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

                    <div class="flex items-center my-1">
                        <img class="w-4 h-4 md:w-5 md:h-5 me-3 invert" src="./imagenes/icono-ticket.png" alt="icono-calendario">
                        <div class="flex items-center">
                        <p id="agot" class="text-white">tickets disponibles:  <p class="text-red-500 ms-2 text-xl"> ${ticketsdisponiblesFiltrados}</p></p>

                        </div>
                    </div>
                    
                    <p class="text-white mt-1 mb-4">id: ${_id}</p>
                  
                </div>  
                
            </div>
        `;
    })
    .join("");

  display.innerHTML = displayData;
};
mostrarData();

//EVENTO AL HACER SUBMIT AL FORMULARIO PARA MODIFICAR EL CUPO INICIAL DEL CONCIERTO
const formulario2 = document.getElementById("formulario-descuentocantidades");
formulario2.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log('entra')
  getInputValues();
});

// //RECOLECCION Y ALMACENAMIENTO DE LOS VALORES DEL FORMULARIO DE MODIFICAR CUPO DE CONCIERTOS
function getInputValues() {
  const valoresFormulario = new FormData(formulario2);
  const objectToSend = Object.fromEntries(valoresFormulario);
  console.log(objectToSend);
  return addConcierto(objectToSend);
}

// DESCUENTA LA CANTIDAD DE TICKETKS DEL CONCIERTO
async function addConcierto(objectToSend) {
  console.log(objectToSend.id);
  const id = objectToSend.id;
  
  if(id.length != 24) {
    swal({
      title: "¡El ID debe contener 24 caracteres y ser de fromato ID!",
      text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return 

    } else {

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token || null;
      console.log(token);
  
      if (userInfo) {
        const data = await axios.put(`/conciertos/descontarcantidad/${id}`, objectToSend);
        if(data.data.ticketsdisponibles <= 0 ) {
          swal({
            title: "TICKETS AGOTADOS",
            text: "No quedan más cupos para este concierto",
            icon: "warning",
          });
        } else {
          swal({
            title: "FELICITACIONES",
            text: "Adquiriste tus tickets correctamente",
            icon: "success",
          });
          // setTimeout(() => {
          //   location.reload();
          // }, 2000);
        }
        
      }
    } catch (error) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        swal({
          title: "¡Debes iniciar sesión!",
          text: "Para adquirir tickets o modificar cupos es necesario iniciar sesión",
          icon: "warning",
        });
      } else {
        swal({
          title: "¡No existe ningún álbum con ese ID!",
          text: "Revisá tu id, no existe ningún álbum en nuestro sistema con ese ID.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
      console.log("entra en el error");
    }
  }

 
}

const id = document.getElementById("boton-eliminar");
console.log(id);
